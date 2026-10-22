// pdfjs-dist ships types under "types/src/pdf.d.ts", not against the
// deep "build/pdf.mjs" entry point we dynamically import (so it never
// touches the initial bundle). CvViewer.tsx casts the result through
// its own minimal local interface, so this just needs to exist.
declare module 'pdfjs-dist/build/pdf.mjs';
