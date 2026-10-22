/** Fig. P.2 — a dense activation grid, fully active, beside an event-driven grid where only a few cells fire. */
export function FigP2({ ariaLabel }: { ariaLabel: string }) {
  return (
    <svg
      viewBox="0 0 540 260"
      role="img"
      aria-label={ariaLabel}
      style={{ width: '100%', height: 'auto', display: 'block', padding: '8px 12px 6px', boxSizing: 'border-box' }}
    >
      <defs>
        <pattern id="cellsD" width="28" height="28" patternUnits="userSpaceOnUse">
          <rect x="3" y="3" width="22" height="22" fill="var(--cyan)" fillOpacity=".34" />
        </pattern>
        <pattern id="cellsS" width="28" height="28" patternUnits="userSpaceOnUse">
          <rect x="3.5" y="3.5" width="21" height="21" fill="none" stroke="var(--line-2)" />
        </pattern>
      </defs>
      <rect x="20" y="40" width="224" height="168" fill="url(#cellsD)" />
      <rect x="296" y="40" width="224" height="168" fill="url(#cellsS)" />
      <g fill="var(--cyan)">
        <rect x="303" y="47" width="22" height="22" />
        <rect x="415" y="75" width="22" height="22" />
        <rect x="359" y="103" width="22" height="22" />
        <rect x="471" y="103" width="22" height="22" />
        <rect x="331" y="131" width="22" height="22" />
        <rect x="443" y="159" width="22" height="22" />
        <rect x="303" y="159" width="22" height="22" />
      </g>
      <path d="M258 124 H282" stroke="var(--mute)" />
      <g fontFamily="Geist Mono, monospace" fontSize="10.5" letterSpacing="0.6" fill="var(--text-3)">
        <text x="20" y="28">
          dense: every unit, every step
        </text>
        <text x="296" y="28" fill="var(--cyan)">
          event-driven: spikes only
        </text>
        <text x="20" y="236">
          activations computed
        </text>
        <text x="296" y="236">
          activations computed
        </text>
        <text x="20" y="252" fill="var(--text-1)">
          many
        </text>
        <text x="296" y="252" fill="var(--text-1)">
          few, if the model stays accurate
        </text>
      </g>
    </svg>
  );
}
