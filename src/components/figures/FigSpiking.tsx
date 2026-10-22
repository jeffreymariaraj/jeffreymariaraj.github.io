/** Fig. R.2 — a spike raster above a leaky integrate-and-fire membrane trace crossing a threshold. */
export function FigSpiking({ ariaLabel }: { ariaLabel: string }) {
  return (
    <svg
      viewBox="0 0 420 210"
      role="img"
      aria-label={ariaLabel}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <g transform="translate(0,6)" stroke="var(--cyan)" strokeWidth="1.4" strokeLinecap="round" fill="none">
        <path d="M14 0 v8 M32 0 v8 M58 0 v8 M92 0 v8 M107 0 v8 M123 0 v8 M163 0 v8 M194 0 v8 M211 0 v8 M236 0 v8 M268 0 v8 M283 0 v8 M313 0 v8 M333 0 v8 M348 0 v8 M364 0 v8 M391 0 v8 M418 0 v8" />
        <path d="M11 12 v8 M33 12 v8 M70 12 v8 M103 12 v8 M124 12 v8 M170 12 v8 M208 12 v8 M231 12 v8 M281 12 v8 M308 12 v8 M348 12 v8 M388 12 v8" />
        <path d="M5 24 v8 M56 24 v8 M85 24 v8 M125 24 v8 M153 24 v8 M187 24 v8 M231 24 v8 M283 24 v8 M318 24 v8 M378 24 v8 M411 24 v8" />
        <path d="M9 36 v8 M47 36 v8 M116 36 v8 M184 36 v8 M228 36 v8 M283 36 v8 M321 36 v8 M388 36 v8" />
        <path d="M5 48 v8 M82 48 v8 M133 48 v8 M202 48 v8 M274 48 v8 M339 48 v8 M397 48 v8" />
      </g>
      <g transform="translate(0,78) scale(1,0.55)">
        <path
          d="M0 50 H420"
          stroke="var(--amber)"
          strokeWidth="1"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 150 C11 150 21 55 24 30 L24 150 C34 150 43 55 46 30 L46 150 C56 150 65 55 68 30 L68 150 C81 150 93 55 96 30 L96 150 C137 150 177 55 188 30 L188 150 C201 150 213 55 216 30 L216 150 C226 150 235 55 238 30 L238 150 C247 150 256 55 258 30 L258 150 C272 150 284 55 288 30 L288 150 C328 150 367 55 378 30 L378 150 C391 150 403 55 406 30 L406 150 C412 150 416 120 420 100"
          fill="none"
          stroke="var(--text-2)"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
        />
      </g>
      <g fontFamily="Geist Mono, monospace" fontSize="10.5" letterSpacing="0.6">
        <text x="0" y="200" fill="var(--text-3)">
          spike raster · membrane V(t)
        </text>
        <text x="300" y="104" fill="var(--amber)">
          threshold
        </text>
      </g>
    </svg>
  );
}
