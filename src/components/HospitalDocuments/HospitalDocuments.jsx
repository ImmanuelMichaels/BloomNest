// src/components/HospitalDocuments/HospitalDocuments.jsx
//
// GP & Hospital Documents — lets a user upload medical letters, discharge
// summaries, referral letters, scan reports etc. Routed from Menu.jsx's
// 'documents' tile.
//
// Whitelist enforcement happens in THREE layers, because each one alone is
// bypassable:
//   1. This component — file picker `accept` + a client-side check. Easiest
//      to bypass (devtools, or just renaming a file), but stops honest
//      mistakes and gives instant feedback.
//   2. storage.rules — checks the declared contentType + size server-side.
//      Can't be bypassed from devtools, but a renamed .exe can still LIE
//      about its contentType and pass this layer.
//   3. functions/index.js `validateHospitalDocument` — a Storage onFinalize
//      trigger that reads the file's actual first bytes (magic numbers)
//      after upload and deletes anything that doesn't match what it claims
//      to be. This is the only layer that can't be lied to from the client.
//
// Firestore metadata lives at users/{uid}/medicalDocuments/{docId} — a
// subcollection already covered by the existing
// `match /users/{userId}/{document=**}` rule, so no firestore.rules change
// was needed for this part.

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { auth, db, storage } from '../../context/firebase';
import {
  collection, addDoc, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';

// ── Constants ──────────────────────────────────────────────────────────────
const ALLOWED_TYPES = {
  'application/pdf': { label: 'PDF' },
  'image/jpeg':       { label: 'Photo' },
  'image/png':        { label: 'Photo' },
};
const ACCEPT_ATTR = 'application/pdf,image/jpeg,image/png';
const MAX_SIZE    = 10 * 1024 * 1024; // 10MB — scan/letter PDFs run bigger than a profile photo

const DOC_LABELS = [
  'GP letter',
  'Hospital discharge summary',
  'Referral letter',
  'Scan / imaging report',
  'Blood test results',
  'Prescription',
  'Other',
];

// ── Helpers ────────────────────────────────────────────────────────────────
function formatBytes(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(ts) {
  if (!ts?.toDate) return 'Uploading…';
  return ts.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function statusBadge(status) {
  switch (status) {
    case 'verified': return { text: 'Verified', bg: '#D1FAE5', fg: '#059669' };
    case 'rejected': return { text: 'Rejected', bg: '#FEE2E2', fg: '#DC2626' };
    default:         return { text: 'Checking…', bg: '#FEF3C7', fg: '#D97706' };
  }
}

// ── Confirm delete modal ──────────────────────────────────────────────────
function ConfirmDeleteModal({ fileName, onConfirm, onCancel }) {
  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--pad-x)',
      }}
    >
      <div style={{
        background: 'var(--card)', borderRadius: 'var(--r2)', padding: 'var(--sp-5)',
        maxWidth: 380, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      }}>
        <p style={{ fontWeight: 800, fontSize: 'var(--fs-md)', marginBottom: 'var(--sp-2)', color: 'var(--dp)' }}>
          Delete this document?
        </p>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--mt)', marginBottom: 'var(--sp-4)', lineHeight: 1.5 }}>
          "{fileName}" will be permanently deleted. This can't be undone.
        </p>
        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
          <button
            onClick={onCancel}
            style={{ flex: 1, padding: 'var(--sp-3)', borderRadius: 'var(--r)', background: 'var(--warm)', border: '1px solid var(--border)', fontWeight: 600, cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{ flex: 1, padding: 'var(--sp-3)', borderRadius: 'var(--r)', background: 'var(--rd)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
  return createPortal(modal, document.body);
}

// ── Main component ─────────────────────────────────────────────────────────
export default function HospitalDocuments() {
  const [authUser, setAuthUser] = useState(auth.currentUser);
  const [docs, setDocs] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [selectedLabel, setSelectedLabel] = useState(DOC_LABELS[0]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, storagePath, fileName } | null
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setAuthUser);
    return () => unsub();
  }, []);

  // Live-updating list — picks up the Cloud Function's verified/rejected
  // status write without needing a manual refresh.
  useEffect(() => {
    if (!authUser) { setDocs([]); setLoadingList(false); return; }

    const q = query(
      collection(db, 'users', authUser.uid, 'medicalDocuments'),
      orderBy('uploadedAt', 'desc')
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setDocs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoadingList(false);
      },
      (err) => {
        console.error('[HospitalDocuments] Failed to load documents:', err);
        setLoadingList(false);
      }
    );
    return () => unsub();
  }, [authUser]);

  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files[0];
    e.target.value = ''; // allow re-selecting the same file after an error
    if (!file || !authUser) return;

    setUploadError(null);

    if (!ALLOWED_TYPES[file.type]) {
      setUploadError('Only PDF, JPEG, or PNG files are accepted.');
      return;
    }
    if (file.size > MAX_SIZE) {
      setUploadError('File must be under 10 MB.');
      return;
    }

    setUploading(true);
    try {
      const docId = doc(collection(db, 'users', authUser.uid, 'medicalDocuments')).id;
      const storagePath = `hospitalDocuments/${authUser.uid}/${docId}_${file.name}`;

      // Upload first — the storage.rules content-type/size check happens
      // here, and the Cloud Function's magic-byte check fires right after.
      await uploadBytes(ref(storage, storagePath), file, { contentType: file.type });

      // Metadata doc, keyed to match the docId used in the storage path so
      // the Cloud Function can find it by storagePath after verification.
      await addDoc(collection(db, 'users', authUser.uid, 'medicalDocuments'), {
        label: selectedLabel,
        fileName: file.name,
        storagePath,
        size: file.size,
        contentType: file.type,
        status: 'pending', // advisory only — see note in Cloud Function re: authoritative check
        uploadedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('[HospitalDocuments] Upload failed:', err);
      setUploadError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [authUser, selectedLabel]);

  const confirmDelete = async () => {
    if (!deleteTarget || !authUser) return;
    const { id, storagePath } = deleteTarget;
    setDeleteTarget(null);

    try {
      await deleteDoc(doc(db, 'users', authUser.uid, 'medicalDocuments', id));
    } catch (err) {
      console.error('[HospitalDocuments] Failed to delete metadata doc:', err);
    }
    try {
      await deleteObject(ref(storage, storagePath));
    } catch (err) {
      // Not fatal — the file may already be gone (e.g. auto-rejected by
      // the Cloud Function), which throws object-not-found here.
      if (err?.code !== 'storage/object-not-found') {
        console.error('[HospitalDocuments] Failed to delete storage file:', err);
      }
    }
  };

  return (
    <div className="page-pad">
      <div style={{ padding: 'var(--sp-4) var(--pad-x)', borderBottom: '1px solid var(--border)', background: 'var(--cream)' }}>
        <p style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, color: 'var(--dp)', margin: 0 }}>
          GP &amp; Hospital Documents
        </p>
        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--mt)', marginTop: 4 }}>
          Store letters, discharge summaries, and scan reports securely — only you can see these.
        </p>
      </div>

      {/* Upload */}
      <div style={{ padding: 'var(--sp-4) var(--pad-x)' }}>
        <label style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--dp)', display: 'block', marginBottom: 6 }}>
          Document type
        </label>
        <select
          value={selectedLabel}
          onChange={(e) => setSelectedLabel(e.target.value)}
          disabled={uploading}
          style={{
            width: '100%', padding: 'var(--sp-3)', borderRadius: 'var(--r)',
            border: '1.5px solid var(--border)', background: 'var(--warm)',
            fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-3)',
          }}
        >
          {DOC_LABELS.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPT_ATTR}
          onChange={handleFileChange}
          disabled={uploading}
          style={{ display: 'none' }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          style={{
            width: '100%', padding: 'var(--sp-3)', borderRadius: 30,
            background: uploading ? '#ccc' : 'var(--dp)', color: '#fff', border: 'none',
            fontWeight: 700, fontSize: 'var(--fs-sm)', cursor: uploading ? 'not-allowed' : 'pointer',
          }}
        >
          {uploading ? 'Uploading…' : '📎 Upload a document'}
        </button>
        <p style={{ fontSize: 'var(--fs-2xs)', color: 'var(--mt)', textAlign: 'center', marginTop: 8 }}>
          PDF, JPEG, or PNG · up to 10 MB
        </p>

        {uploadError && (
          <p style={{ color: 'var(--rd)', fontSize: 'var(--fs-xs)', textAlign: 'center', marginTop: 8 }}>
            {uploadError}
          </p>
        )}
      </div>

      {/* List */}
      <div style={{ padding: '0 var(--pad-x) var(--sp-5)' }}>
        {loadingList && (
          <p style={{ color: 'var(--mt)', fontSize: 'var(--fs-sm)', textAlign: 'center', padding: 'var(--sp-4)' }}>
            Loading your documents…
          </p>
        )}

        {!loadingList && docs.length === 0 && (
          <p style={{ color: 'var(--mt)', fontSize: 'var(--fs-sm)', textAlign: 'center', padding: 'var(--sp-4)' }}>
            No documents yet. Upload a GP letter or hospital record to keep it handy for appointments.
          </p>
        )}

        {docs.map((d) => {
          const badge = statusBadge(d.status);
          return (
            <div
              key={d.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--gap-md)',
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r)', padding: 'var(--sp-3) var(--card-p)',
                marginBottom: 'var(--sp-2)',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 'var(--r)', background: 'var(--warm)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
              }}>
                {ALLOWED_TYPES[d.contentType]?.label === 'PDF' ? '📄' : '🖼️'}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: 'var(--fs-sm)', color: 'var(--dp)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {d.label}
                </p>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--mt)', margin: '2px 0 0' }}>
                  {formatDate(d.uploadedAt)} · {formatBytes(d.size)}
                </p>
                {d.status === 'rejected' && d.rejectionReason && (
                  <p style={{ fontSize: 'var(--fs-2xs)', color: 'var(--rd)', margin: '2px 0 0' }}>
                    {d.rejectionReason}
                  </p>
                )}
              </div>

              <span style={{
                fontSize: 'var(--fs-2xs)', fontWeight: 700, padding: '3px 9px', borderRadius: 12,
                background: badge.bg, color: badge.fg, flexShrink: 0,
              }}>
                {badge.text}
              </span>

              <button
                onClick={() => setDeleteTarget({ id: d.id, storagePath: d.storagePath, fileName: d.fileName })}
                aria-label={`Delete ${d.label}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--mt)', flexShrink: 0 }}
              >
                🗑️
              </button>
            </div>
          );
        })}
      </div>

      {deleteTarget && (
        <ConfirmDeleteModal
          fileName={deleteTarget.fileName}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}