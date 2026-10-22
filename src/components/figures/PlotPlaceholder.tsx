/** An empty accuracy-vs-model-size axes frame — the evidence slot plot, with no values drawn. */
export function PlotPlaceholder({ ariaLabel, placeholderText }: { ariaLabel: string; placeholderText: string }) {
  return (
    <svg
      viewBox="0 0 320 150"
      role="img"
      aria-label={ariaLabel}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <rect x="36" y="8" width="276" height="112" fill="none" stroke="var(--line-2)" strokeDasharray="3 4" />
      <path d="M36 120 V8 M36 120 H312" stroke="var(--mute)" />
      <g fontFamily="Geist Mono, monospace" fontSize="10.5" fill="var(--text-3)" letterSpacing="0.5">
        <text x="36" y="142">
          model size →
        </text>
        <text x="2" y="14">
          acc.
        </text>
        <text x="116" y="70" fill="var(--amber)">
          {placeholderText}
        </text>
      </g>
    </svg>
  );
}
