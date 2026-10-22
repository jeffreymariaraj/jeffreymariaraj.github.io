/** Fig. R.1 — a continuous response curve and its b-bit staircase approximation. */
export function FigQuantization({ ariaLabel }: { ariaLabel: string }) {
  return (
    <svg
      viewBox="0 0 420 210"
      role="img"
      aria-label={ariaLabel}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <g stroke="var(--line-2)" strokeWidth="1" strokeDasharray="2 4">
        <path d="M0 22H420M0 48H420M0 74H420M0 100H420M0 126H420M0 152H420M0 178H420" />
      </g>
      <path
        d="M0 128 L6 137 L12 146 L18 153 L24 159 L30 164 L36 166 L42 167 L48 166 L54 163 L60 160 L66 155 L72 149 L78 143 L84 137 L90 131 L96 125 L102 120 L108 116 L114 112 L120 108 L126 105 L132 101 L138 98 L144 94 L150 89 L156 84 L162 78 L168 71 L174 64 L180 58 L186 51 L192 45 L198 39 L204 35 L210 32 L216 31 L222 32 L228 35 L234 39 L240 45 L246 53 L252 61 L258 71 L264 80 L270 89 L276 98 L282 107 L288 114 L294 120 L300 125 L306 129 L312 132 L318 135 L324 137 L330 138 L336 140 L342 141 L348 143 L354 145 L360 147 L366 150 L372 152 L378 153 L384 155 L390 155 L396 154 L402 152 L408 148 L414 143 L420 136"
        fill="none"
        stroke="var(--text-3)"
        strokeWidth="1.2"
      />
      <path
        d="M0 126 L8 126 L8 152 L34 152 L34 178 L52 178 L52 152 L82 152 L82 126 L114 126 L114 100 L154 100 L154 74 L178 74 L178 48 L206 48 L206 22 L230 22 L230 48 L252 48 L252 74 L270 74 L270 100 L288 100 L288 126 L334 126 L334 152 L418 152 L418 126 L420 126"
        fill="none"
        stroke="var(--cyan)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <g fontFamily="Geist Mono, monospace" fontSize="10.5" letterSpacing="0.6">
        <text x="0" y="200" fill="var(--text-3)">
          — continuous response
        </text>
        <text x="160" y="200" fill="var(--cyan)">
          — b-bit grid (schematic)
        </text>
      </g>
    </svg>
  );
}
