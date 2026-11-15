'use client';

import { useEffect } from 'react';

export default function PreviewReady() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('studio_preview');
    if (id && window.parent !== window) {
      window.parent.postMessage({ type: 'simlux-preview-ready', id }, window.location.origin);
    }
  }, []);
  return null;
}
