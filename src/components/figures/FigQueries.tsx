/**
 * Fig. 1 — "where 100 queries go": a 10x10 grid of 100 queries (85
 * light agent, 15 escalated to the deep agent), with a cost-bar
 * comparison below (10,000,000 units if every query went to the deep
 * agent vs. 1,585,000 units with the meta-controller — an 84.15%
 * saving under the paper's simulated cost model).
 *
 * Desktop and mobile markup are both copied verbatim from
 * Main.dc.html / Mobile.dc.html (not scaled from one another — the
 * mobile version is its own redraw with larger labels) and toggled
 * via the .fig-desktop/.fig-mobile CSS pair.
 */
export function FigQueries({ ariaLabel }: { ariaLabel: string }) {
  return (
    <>
      <svg
        viewBox="0 0 340 400"
        role="img"
        aria-label={ariaLabel}
        className="fig-desktop"
        style={{ width: '100%', height: 'auto' }}
      >
        <defs>
          <pattern id="qdots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="3.2" fill="var(--cyan)" fillOpacity=".85" />
          </pattern>
        </defs>
        <rect x="50" y="10" width="240" height="240" fill="url(#qdots)" />
        <g fill="none" stroke="var(--cyan-hi)" strokeWidth="1.5">
          <circle cx="134" cy="22" r="7.2" />
          <circle cx="206" cy="22" r="7.2" />
          <circle cx="158" cy="46" r="7.2" />
          <circle cx="62" cy="70" r="7.2" />
          <circle cx="86" cy="94" r="7.2" />
          <circle cx="110" cy="94" r="7.2" />
          <circle cx="182" cy="118" r="7.2" />
          <circle cx="230" cy="118" r="7.2" />
          <circle cx="278" cy="142" r="7.2" />
          <circle cx="230" cy="166" r="7.2" />
          <circle cx="278" cy="190" r="7.2" />
          <circle cx="134" cy="214" r="7.2" />
          <circle cx="254" cy="214" r="7.2" />
          <circle cx="158" cy="238" r="7.2" />
          <circle cx="278" cy="238" r="7.2" />
        </g>
        <circle cx="56" cy="278" r="3.2" fill="var(--cyan)" />
        <circle cx="190" cy="278" r="3.2" fill="var(--cyan)" />
        <circle cx="190" cy="278" r="7.2" fill="none" stroke="var(--cyan-hi)" strokeWidth="1.5" />
        <rect x="50" y="316" width="240" height="12" fill="var(--text-2)" fillOpacity=".22" stroke="var(--text-3)" />
        <rect x="50" y="368" width="38.04" height="12" fill="var(--cyan)" />
        <g fontFamily="Geist Mono, monospace" fontSize="10.5" letterSpacing="0.5">
          <text x="68" y="282" fill="var(--text-1)">
            light agent · 85
          </text>
          <text x="204" y="282" fill="var(--text-1)">
            deep agent · 15
          </text>
          <text x="50" y="308" fill="var(--text-3)">
            every query to the deep agent
          </text>
          <text x="290" y="346" textAnchor="end" fill="var(--text-1)">
            10,000,000 units
          </text>
          <text x="50" y="360" fill="var(--text-3)">
            with the meta-controller
          </text>
          <text x="98" y="378" fill="var(--text-1)">
            1,585,000 units
          </text>
          <text x="290" y="396" textAnchor="end" fill="var(--cyan-hi)" fontSize="13">
            −84.15%
          </text>
        </g>
      </svg>

      <svg
        viewBox="0 0 342 372"
        role="img"
        aria-label={ariaLabel}
        className="fig-mobile"
        style={{ width: '100%', height: 'auto' }}
      >
        <defs>
          <pattern id="qdotsM" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="3" fill="var(--cyan)" fillOpacity=".85" />
          </pattern>
        </defs>
        <rect x="71" y="14" width="200" height="200" fill="url(#qdotsM)" />
        <g fill="none" stroke="var(--cyan-hi)" strokeWidth="1.5">
          <circle cx="141" cy="24" r="6.4" />
          <circle cx="201" cy="24" r="6.4" />
          <circle cx="161" cy="44" r="6.4" />
          <circle cx="81" cy="64" r="6.4" />
          <circle cx="101" cy="84" r="6.4" />
          <circle cx="121" cy="84" r="6.4" />
          <circle cx="181" cy="104" r="6.4" />
          <circle cx="221" cy="104" r="6.4" />
          <circle cx="261" cy="124" r="6.4" />
          <circle cx="221" cy="144" r="6.4" />
          <circle cx="261" cy="164" r="6.4" />
          <circle cx="141" cy="184" r="6.4" />
          <circle cx="241" cy="184" r="6.4" />
          <circle cx="161" cy="204" r="6.4" />
          <circle cx="261" cy="204" r="6.4" />
        </g>
        <circle cx="24" cy="238" r="3" fill="var(--cyan)" />
        <circle cx="170" cy="238" r="3" fill="var(--cyan)" />
        <circle cx="170" cy="238" r="6.4" fill="none" stroke="var(--cyan-hi)" strokeWidth="1.5" />
        <g fontFamily="Geist Mono, monospace" fontSize="11.5" letterSpacing=".4">
          <text x="36" y="242" fill="var(--text-1)">
            light · 85
          </text>
          <text x="184" y="242" fill="var(--text-1)">
            deep · 15
          </text>
        </g>
        <g fontFamily="Geist Mono, monospace" fontSize="11.5" letterSpacing=".4">
          <text x="20" y="278" fill="var(--text-3)">
            every query to the deep agent
          </text>
          <text x="322" y="296" textAnchor="end" fill="var(--text-1)">
            10,000,000 units
          </text>
        </g>
        <rect x="20" y="284" width="302" height="10" fill="var(--text-2)" fillOpacity=".22" stroke="var(--text-3)" />
        <g fontFamily="Geist Mono, monospace" fontSize="11.5" letterSpacing=".4">
          <text x="20" y="326" fill="var(--text-3)">
            with the meta-controller
          </text>
          <text x="322" y="344" textAnchor="end" fill="var(--text-1)">
            1,585,000 units
          </text>
        </g>
        <rect x="20" y="332" width="47.6" height="10" fill="var(--cyan)" />
        <text x="20" y="364" fontFamily="Geist Mono, monospace" fontSize="15" fill="var(--cyan-hi)">
          −84.15%
        </text>
      </svg>
    </>
  );
}
