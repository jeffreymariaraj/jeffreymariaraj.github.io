/**
 * Fig. P.2 — two aromatic ring fragments joined by a short linker,
 * with the 150-500 Da molecular-weight window marked below. Desktop
 * and mobile markup copied verbatim from the artboards.
 */
export function FigMolecule({ ariaLabel }: { ariaLabel: string }) {
  return (
    <>
      <svg
        viewBox="0 0 540 300"
        role="img"
        aria-label={ariaLabel}
        className="fig-desktop"
        style={{ width: '100%', height: 'auto', padding: '8px 12px 6px', boxSizing: 'border-box' }}
      >
        <g
          fill="none"
          stroke="var(--text-1)"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          transform="translate(20 0)"
        >
          <path d="M146 130 L128 161.2 L92 161.2 L74 130 L92 98.8 L128 98.8 Z" />
          <path d="M136.7 132.4L125.4 151.9 M94.6 151.9L83.3 132.4 M98.8 105.7L121.2 105.7" strokeWidth="1.2" />
          <path d="M298 144 L280 175.2 L244 175.2 L226 144 L244 112.8 L280 112.8 Z" />
          <path d="M288.7 146.4L277.4 165.9 M246.6 165.9L235.3 146.4 M250.8 119.7L273.2 119.7" strokeWidth="1.2" />
          <path d="M146 130 L168 142 L190 132 L212 143 L226 144" stroke="var(--cyan)" strokeWidth="2" />
          <circle cx="244" cy="175.2" r="9" fill="var(--ink-3)" stroke="none" />
        </g>
        <g fontFamily="Geist Mono, monospace" fontSize="11" fill="var(--cyan-hi)" textAnchor="middle" transform="translate(20 0)">
          <text x="244" y="179">N</text>
        </g>
        <g fill="none" stroke="var(--mute)" strokeWidth="1" transform="translate(20 0)">
          <path d="M74 84 V76 H146 V84" />
          <path d="M146 84 V76" stroke="none" />
          <path d="M158 120 V112 H214 V120" stroke="var(--cyan)" strokeOpacity=".6" />
          <path d="M226 84 V76 H298 V84" />
        </g>
        <g fontFamily="Geist Mono, monospace" fontSize="10.5" letterSpacing="0.6" fill="var(--text-3)">
          <text x="94" y="66" textAnchor="middle">fragment</text>
          <text x="204" y="104" textAnchor="middle" fill="var(--cyan)">linker</text>
          <text x="282" y="66" textAnchor="middle">fragment</text>
        </g>
        <g>
          <path d="M40 232 H500" stroke="var(--mute)" />
          <rect x="155" y="224" width="268" height="16" fill="var(--cyan)" fillOpacity=".2" stroke="var(--cyan)" strokeOpacity=".7" />
          <g stroke="var(--mute)">
            <path d="M40 228V236M155 228V236M423 228V236M500 228V236" />
          </g>
          <g fontFamily="Geist Mono, monospace" fontSize="10.5" letterSpacing="0.6" fill="var(--text-3)">
            <text x="40" y="256">0</text>
            <text x="155" y="256" textAnchor="middle" fill="var(--text-1)">150</text>
            <text x="423" y="256" textAnchor="middle" fill="var(--text-1)">500</text>
            <text x="500" y="256" textAnchor="end">Da</text>
            <text x="289" y="216" textAnchor="middle" fill="var(--cyan-hi)">kept: molecular-weight window</text>
            <text x="40" y="284">then reported: MW · LogP · TPSA · H-bond donors / acceptors</text>
          </g>
        </g>
      </svg>

      <svg
        viewBox="0 0 342 272"
        role="img"
        aria-label={ariaLabel}
        className="fig-mobile"
        style={{ width: '100%', height: 'auto', padding: 6, boxSizing: 'border-box' }}
      >
        <g
          fill="none"
          stroke="var(--text-1)"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          transform="translate(-39 -30)"
        >
          <path d="M146 130 L128 161.2 L92 161.2 L74 130 L92 98.8 L128 98.8 Z" />
          <path d="M136.7 132.4L125.4 151.9 M94.6 151.9L83.3 132.4 M98.8 105.7L121.2 105.7" strokeWidth="1.2" />
          <path d="M298 144 L280 175.2 L244 175.2 L226 144 L244 112.8 L280 112.8 Z" />
          <path d="M288.7 146.4L277.4 165.9 M246.6 165.9L235.3 146.4 M250.8 119.7L273.2 119.7" strokeWidth="1.2" />
          <path d="M146 130 L168 142 L190 132 L212 143 L226 144" stroke="var(--cyan)" strokeWidth="2" />
          <circle cx="244" cy="175.2" r="9" fill="var(--ink-3)" stroke="none" />
          <path d="M74 84 V76 H146 V84" stroke="var(--mute)" strokeWidth="1" />
          <path d="M158 120 V112 H214 V120" stroke="var(--cyan)" strokeOpacity=".6" strokeWidth="1" />
          <path d="M226 84 V76 H298 V84" stroke="var(--mute)" strokeWidth="1" />
        </g>
        <g fontFamily="Geist Mono, monospace" fontSize="12" fill="var(--cyan-hi)" textAnchor="middle" transform="translate(-39 -30)">
          <text x="244" y="179.5">N</text>
        </g>
        <g fontFamily="Geist Mono, monospace" fontSize="11.5" letterSpacing=".4" fill="var(--text-3)">
          <text x="32" y="22" textAnchor="middle">fragment</text>
          <text x="165" y="76" textAnchor="middle" fill="var(--cyan)">linker</text>
          <text x="258" y="22" textAnchor="middle">fragment</text>
        </g>
        <path d="M20 190 H322" stroke="var(--mute)" />
        <rect x="95.5" y="182" width="176" height="16" fill="var(--cyan)" fillOpacity=".2" stroke="var(--cyan)" strokeOpacity=".7" />
        <path d="M20 186V194M95.5 186V194M271.7 186V194M322 186V194" stroke="var(--mute)" />
        <g fontFamily="Geist Mono, monospace" fontSize="11.5" letterSpacing=".4" fill="var(--text-3)">
          <text x="20" y="214">0</text>
          <text x="95.5" y="214" textAnchor="middle" fill="var(--text-1)">150</text>
          <text x="271.7" y="214" textAnchor="middle" fill="var(--text-1)">500</text>
          <text x="322" y="214" textAnchor="end">Da</text>
          <text x="171" y="174" textAnchor="middle" fill="var(--cyan-hi)">kept: MW window</text>
          <text x="20" y="244">then reported: MW · LogP · TPSA ·</text>
          <text x="20" y="262">H-bond donors / acceptors</text>
        </g>
      </svg>
    </>
  );
}
