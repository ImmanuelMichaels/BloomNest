// functions/index.js
//
// Femin9 (Arvenue UK Ltd) — Cloud Functions
//
// cleanupDeletedUser: Auth onDelete trigger. Fires automatically the
// instant a user record is deleted — whether that's Profile.jsx calling
// deleteUser(user) client-side, an admin deleting the account from the
// Firebase Console, or a future support-tooling script. No client code
// needs to call this; it's a safety net that always runs.
//
// Closes the GDPR "right to erasure" gap: deleteUser() alone only removes
// the Auth record. Without this, the Firestore doc (journey type, EDD,
// cycle data, IVF/menopause fields, consent record), the AI chat log, and
// the Storage profile photo were left behind indefinitely.
//
// deleteChatHistory: callable Function backing the "you can delete chat
// history at any time" promise in Consent.jsx's aiProcessing consent copy.
// Not yet wired to a UI button anywhere — add one in Profile.jsx's Privacy
// Centre section when ready; this just makes the promise technically true.

const functions = require("firebase-functions/v1");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onObjectFinalized } = require("firebase-functions/v2/storage");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

// europe-west2 (London) — matches the Firestore/Storage region already
// configured for UK GDPR compliance. Keep this in sync with your
// Firestore location if that ever changes.
const REGION = "europe-west2";

// ── Shared helper ──────────────────────────────────────────────────────
// conversations/{messageId} docs are flat, top-level, and identified by a
// `userId` field (see chatService.js) — not nested under users/{uid}, so
// db.recursiveDelete() can't reach them. Query-and-batch-delete instead.
// Loops because a single batch write is capped at 500 operations; re-query
// after each batch rather than holding the whole result set in memory.
async function deleteCollectionByField(collectionRef, field, value, batchSize = 400) {
  let deletedCount = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const snapshot = await collectionRef.where(field, "==", value).limit(batchSize).get();
    if (snapshot.empty) break;

    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    deletedCount += snapshot.size;

    if (snapshot.size < batchSize) break;
  }
  return deletedCount;
}

// ── cleanupDeletedUser ───────────────────────────────────────────────────
exports.cleanupDeletedUser = functions
  .region(REGION)
  .auth.user()
  .onDelete(async (user) => {
    const uid = user.uid;
    const errors = [];

    // 1. The user's own document AND everything nested under it
    //    (users/{uid}/consent/record, and any future subcollection) —
    //    recursiveDelete handles the whole tree in one call.
    try {
      await db.recursiveDelete(db.collection("users").doc(uid));
    } catch (err) {
      console.error(`[cleanupDeletedUser] users/${uid} delete failed:`, err);
      errors.push({ resource: `users/${uid}`, message: err.message });
    }

    // 2. notifications/{uid} and journeys/{uid} are separate top-level
    //    collections keyed by uid (see firestore.rules) — they don't live
    //    under users/{uid}, so they need their own cleanup calls.
    try {
      await db.recursiveDelete(db.collection("notifications").doc(uid));
    } catch (err) {
      console.error(`[cleanupDeletedUser] notifications/${uid} delete failed:`, err);
      errors.push({ resource: `notifications/${uid}`, message: err.message });
    }

    try {
      await db.recursiveDelete(db.collection("journeys").doc(uid));
    } catch (err) {
      console.error(`[cleanupDeletedUser] journeys/${uid} delete failed:`, err);
      errors.push({ resource: `journeys/${uid}`, message: err.message });
    }

    // 3. conversations — flat collection, userId field, NOT reachable by
    //    recursiveDelete since these docs aren't nested under users/{uid}.
    //    This is the AI chat log, including anything that matched the
    //    crisis-detection patterns in AIAssistant.jsx — the most sensitive
    //    data in the app, so this step matters more than most.
    try {
      const count = await deleteCollectionByField(
        db.collection("conversations"),
        "userId",
        uid
      );
      console.log(`[cleanupDeletedUser] Deleted ${count} conversations doc(s) for uid ${uid}`);
    } catch (err) {
      console.error(`[cleanupDeletedUser] conversations cleanup failed for ${uid}:`, err);
      errors.push({ resource: `conversations (userId=${uid})`, message: err.message });
    }

    // 4. Storage — profile photo lives at profileImages/{uid} (single
    //    object, see Profile.jsx / storage.rules). deleteFiles() with a
    //    prefix + force is forgiving if nothing exists there, unlike
    //    file.delete() which throws on a 404 — most users won't have
    //    uploaded a photo at all.
    try {
      await bucket.deleteFiles({ prefix: `profileImages/${uid}`, force: true });
    } catch (err) {
      console.error(`[cleanupDeletedUser] profileImages/${uid} delete failed:`, err);
      errors.push({ resource: `profileImages/${uid}`, message: err.message });
    }

    // 5. Audit trail. This collection is deliberately NOT listed in
    //    firestore.rules, so the default-deny catch-all blocks all client
    //    access — it's admin/Cloud-Console-only, for verifying a deletion
    //    actually completed without exposing anything to end users.
    try {
      await db.collection("accountDeletionLog").doc(uid).set({
        uid,
        deletedAt: admin.firestore.FieldValue.serverTimestamp(),
        success: errors.length === 0,
        errors,
      });
    } catch (err) {
      // If even the log write fails, this is the last line of defense —
      // it lands in Cloud Logging regardless.
      console.error(`[cleanupDeletedUser] Failed to write deletion log for ${uid}:`, err);
    }

    if (errors.length > 0) {
      // Deliberately not re-thrown: there's no client waiting on an Auth
      // trigger, and Firebase would just retry and hit the same errors
      // again if retries are enabled. The accountDeletionLog doc above is
      // the record to check if a cleanup didn't fully succeed.
      console.error(
        `[cleanupDeletedUser] Completed with ${errors.length} error(s) for uid ${uid} — see accountDeletionLog/${uid}`
      );
    } else {
      console.log(`[cleanupDeletedUser] Fully cleaned up all data for uid ${uid}`);
    }
  });

// ── deleteChatHistory ────────────────────────────────────────────────────
// Callable from the client (auth required, so this can't be invoked on
// someone else's behalf — request.auth.uid is set by Firebase from the
// caller's ID token, not from anything the client passes in).
exports.deleteChatHistory = onCall({ region: REGION }, async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "You must be signed in to do this.");
  }

  const uid = request.auth.uid;

  try {
    const count = await deleteCollectionByField(db.collection("conversations"), "userId", uid);
    return { success: true, deletedCount: count };
  } catch (err) {
    console.error(`[deleteChatHistory] Failed for uid ${uid}:`, err);
    throw new HttpsError("internal", "Could not delete chat history. Please try again.");
  }
});

// ── validateHospitalDocument ─────────────────────────────────────────────
// Fires after every upload to hospitalDocuments/{uid}/{fileName}. This is
// the ONLY layer in the whitelist (component → storage.rules → this) that
// inspects the file's actual bytes rather than trusting a claimed
// contentType. Rejects mismatches by deleting the file and marking the
// matching Firestore metadata doc.
//
// This checks file TYPE, not file SAFETY — it confirms a PDF is really a
// PDF, not that a PDF is malware-free. If you want actual malware
// scanning, Google Cloud Storage now offers built-in scanning you can
// enable on the bucket directly (separate from this Function) — worth
// doing before this goes to real users uploading real medical documents.
const MAGIC_BYTES = {
  "application/pdf": [0x25, 0x50, 0x44, 0x46], // %PDF
  "image/jpeg": [0xff, 0xd8, 0xff],
  "image/png": [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
};

exports.validateHospitalDocument = onObjectFinalized({ region: REGION }, async (event) => {
  const object = event.data;
  const filePath = object.name;
  if (!filePath || !filePath.startsWith("hospitalDocuments/")) return;

  const uid = filePath.split("/")[1];
  if (!uid) return;

  const claimedType = object.contentType;
  const expectedMagic = MAGIC_BYTES[claimedType];
  const file = bucket.file(filePath);

  let rejected = false;
  let reason = "";

  if (!expectedMagic) {
    rejected = true;
    reason = `Unrecognized file type: ${claimedType}`;
  } else {
    try {
      const [buffer] = await file.download({ start: 0, end: 15 });
      const actualBytes = Array.from(buffer.slice(0, expectedMagic.length));
      const matches = expectedMagic.every((b, i) => actualBytes[i] === b);
      if (!matches) {
        rejected = true;
        reason = "File content doesn't match its declared type — upload rejected.";
      }
    } catch (err) {
      console.error(`[validateHospitalDocument] Header read failed for ${filePath}:`, err);
      rejected = true;
      reason = "Could not verify file contents — upload rejected.";
    }
  }

  if (rejected) {
    console.warn(`[validateHospitalDocument] Rejecting ${filePath}: ${reason}`);
    try {
      await file.delete();
    } catch (err) {
      console.error(`[validateHospitalDocument] Failed to delete rejected file ${filePath}:`, err);
    }
  }

  // Find the matching metadata doc by storagePath and update its status.
  // docId in the storagePath and the Firestore doc's own ID are the same
  // value by construction (see HospitalDocuments.jsx), but querying by
  // storagePath avoids relying on that staying true if the upload flow
  // ever changes.
  try {
    const snap = await db
      .collection("users")
      .doc(uid)
      .collection("medicalDocuments")
      .where("storagePath", "==", filePath)
      .limit(1)
      .get();

    if (!snap.empty) {
      const update = {
        status: rejected ? "rejected" : "verified",
        verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      if (rejected) update.rejectionReason = reason;
      await snap.docs[0].ref.set(update, { merge: true });
    }
  } catch (err) {
    console.error(`[validateHospitalDocument] Failed to update metadata for ${filePath}:`, err);
  }
});
