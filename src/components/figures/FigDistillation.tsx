/** Fig. R.3 — a large teacher network emits a soft output distribution a small student learns to match. */
export function FigDistillation({ ariaLabel }: { ariaLabel: string }) {
  return (
    <svg
      viewBox="0 0 420 210"
      role="img"
      aria-label={ariaLabel}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <rect x="6" y="14" width="104" height="168" fill="none" stroke="var(--line-2)" strokeDasharray="3 4" />
      <g fill="var(--mute)">
        <circle cx="26" cy="36" r="3.2" />
        <circle cx="26" cy="62" r="3.2" />
        <circle cx="26" cy="88" r="3.2" />
        <circle cx="26" cy="114" r="3.2" />
        <circle cx="26" cy="140" r="3.2" />
        <circle cx="26" cy="166" r="3.2" />
        <circle cx="58" cy="36" r="3.2" />
        <circle cx="58" cy="62" r="3.2" />
        <circle cx="58" cy="88" r="3.2" />
        <circle cx="58" cy="114" r="3.2" />
        <circle cx="58" cy="140" r="3.2" />
        <circle cx="58" cy="166" r="3.2" />
        <circle cx="90" cy="36" r="3.2" />
        <circle cx="90" cy="62" r="3.2" />
        <circle cx="90" cy="88" r="3.2" />
        <circle cx="90" cy="114" r="3.2" />
        <circle cx="90" cy="140" r="3.2" />
        <circle cx="90" cy="166" r="3.2" />
      </g>
      <g fill="var(--text-3)">
        <rect x="140" y="108" width="9" height="24" />
        <rect x="153" y="62" width="9" height="70" />
        <rect x="166" y="94" width="9" height="38" />
        <rect x="179" y="120" width="9" height="12" />
        <rect x="192" y="125" width="9" height="7" />
      </g>
      <path d="M140 132 H201" stroke="var(--mute)" />
      <path d="M214 100 H266" stroke="var(--cyan)" strokeDasharray="4 4" fill="none" />
      <path d="M262 95 L270 100 L262 105" fill="none" stroke="var(--cyan)" />
      <g fill="var(--cyan)">
        <rect x="280" y="104" width="9" height="28" />
        <rect x="293" y="68" width="9" height="64" />
        <rect x="306" y="96" width="9" height="36" />
        <rect x="319" y="118" width="9" height="14" />
        <rect x="332" y="125" width="9" height="7" />
      </g>
      <path d="M280 132 H341" stroke="var(--mute)" />
      <rect x="356" y="62" width="58" height="84" fill="none" stroke="var(--cyan)" strokeDasharray="3 4" />
      <g fill="var(--cyan)">
        <circle cx="372" cy="86" r="3.2" />
        <circle cx="372" cy="104" r="3.2" />
        <circle cx="372" cy="122" r="3.2" />
        <circle cx="398" cy="86" r="3.2" />
        <circle cx="398" cy="104" r="3.2" />
        <circle cx="398" cy="122" r="3.2" />
      </g>
      <g fontFamily="Geist Mono, monospace" fontSize="10.5" letterSpacing="0.6">
        <text x="6" y="8" fill="var(--text-3)">
          teacher
        </text>
        <text x="356" y="56" fill="var(--cyan)">
          student
        </text>
        <text x="146" y="152" fill="var(--text-3)">
          soft targets
        </text>
        <text x="214" y="92" fill="var(--cyan)">
          match
        </text>
      </g>
    </svg>
  );
}
