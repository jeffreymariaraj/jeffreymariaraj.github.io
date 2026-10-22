/** Fig. P.1 — two accuracy-vs-bit-width curves agree at high precision and diverge at low bit-widths. */
export function FigP1({ ariaLabel }: { ariaLabel: string }) {
  return (
    <svg
      viewBox="0 0 540 260"
      role="img"
      aria-label={ariaLabel}
      style={{ width: '100%', height: 'auto', display: 'block', padding: '8px 12px 6px', boxSizing: 'border-box' }}
    >
      <defs>
        <pattern id="hatchA" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V8" stroke="var(--cyan)" strokeOpacity=".35" strokeWidth="1" />
        </pattern>
      </defs>
      <path d="M50 30 V220 H510" fill="none" stroke="var(--mute)" />
      <g stroke="var(--line-2)" strokeDasharray="2 4">
        <path d="M165 30V220M280 30V220M395 30V220M510 30V220" />
      </g>
      <path d="M280 62 C340 72 420 104 510 150 L510 214 C420 190 340 120 280 88 Z" fill="url(#hatchA)" />
      <path d="M50 50 C130 50 210 54 280 62 C340 72 420 104 510 150" fill="none" stroke="var(--cyan)" strokeWidth="1.8" />
      <path
        d="M50 52 C130 54 210 66 280 88 C340 120 420 190 510 214"
        fill="none"
        stroke="var(--text-2)"
        strokeWidth="1.6"
        strokeDasharray="6 4"
      />
      <g fontFamily="Geist Mono, monospace" fontSize="10.5" letterSpacing="0.6" fill="var(--text-3)">
        <text x="46" y="240" textAnchor="middle">
          8
        </text>
        <text x="165" y="240" textAnchor="middle">
          6
        </text>
        <text x="280" y="240" textAnchor="middle">
          4
        </text>
        <text x="395" y="240" textAnchor="middle">
          3
        </text>
        <text x="510" y="240" textAnchor="middle">
          2
        </text>
        <text x="50" y="20">
          accuracy
        </text>
        <text x="330" y="256">
          bit-width →
        </text>
        <text x="400" y="118" fill="var(--cyan)">
          claim A
        </text>
        <text x="420" y="198" fill="var(--text-1)">
          claim B
        </text>
        <text x="395" y="160" fill="var(--cyan-hi)" textAnchor="middle">
          gap = ?
        </text>
      </g>
    </svg>
  );
}
