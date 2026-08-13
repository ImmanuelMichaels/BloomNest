// src/components/ModalPortal.jsx
//
// Renders children into document.body via a portal instead of in place.
//
// Why this exists: position: fixed is supposed to position relative to the
// viewport, but any ANCESTOR with a CSS `transform` (even transform:
// translateY(0) left behind by an animation with animation-fill-mode:
// forwards) creates its own containing block and traps fixed-position
// descendants inside it. Our .card-in / .reveal-in classes do exactly this,
// which is why modals rendered inline (e.g. inside ScanSection, which has
// class="scans-section card-in card-in-2") were getting visually boxed
// inside their section instead of covering the full screen — clipped by
// sibling content and hidden behind the bottom nav.
//
// Portaling to document.body sidesteps the whole problem: the modal becomes
// a direct child of <body>, with no transformed ancestor in between.

import { createPortal } from 'react-dom';

export default function ModalPortal({ children }) {
  return createPortal(children, document.body);
}