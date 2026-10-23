/**
 * Fig. P.1 — a stylised wood cross-section (feTurbulence grain filter,
 * static — no animation) leading to float32 weight curves and their
 * int8 staircase. Desktop and mobile markup copied verbatim from the
 * artboards; the mobile redraw stacks the cross-section above the two
 * curve panels instead of beside them.
 */
export function FigXylo({ ariaLabel, ariaLabelMobile }: { ariaLabel: string; ariaLabelMobile: string }) {
  return (
    <>
      <svg
        viewBox="0 0 540 300"
        role="img"
        aria-label={ariaLabel}
        className="fig-desktop"
        style={{ width: '100%', height: 'auto', padding: '8px 12px 6px', boxSizing: 'border-box' }}
      >
        <defs>
          <filter id="grain" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.026" numOctaves={3} seed={7} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={12} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <clipPath id="woodclip">
            <rect x="0" y="0" width="230" height="190" />
          </clipPath>
          <marker id="xarr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8" fill="none" stroke="var(--cyan)" strokeWidth="1.2" />
          </marker>
        </defs>
        <g transform="translate(20 40)">
          <g clipPath="url(#woodclip)">
            <rect width="230" height="190" fill="var(--ink-3)" />
            <g filter="url(#grain)" fill="none" stroke="var(--cyan)" transform="translate(0 0)">
              <ellipse cx="115" cy="95" rx="10" ry="8" strokeOpacity=".9" strokeWidth="1.4" />
              <ellipse cx="115" cy="95" rx="24" ry="19" strokeOpacity=".5" />
              <ellipse cx="115" cy="95" rx="38" ry="30" strokeOpacity=".8" strokeWidth="1.4" />
              <ellipse cx="115" cy="95" rx="52" ry="41" strokeOpacity=".45" />
              <ellipse cx="115" cy="95" rx="66" ry="52" strokeOpacity=".75" strokeWidth="1.4" />
              <ellipse cx="115" cy="95" rx="80" ry="63" strokeOpacity=".4" />
              <ellipse cx="115" cy="95" rx="94" ry="74" strokeOpacity=".7" strokeWidth="1.4" />
              <ellipse cx="115" cy="95" rx="108" ry="85" strokeOpacity=".35" />
              <ellipse cx="115" cy="95" rx="122" ry="96" strokeOpacity=".6" strokeWidth="1.4" />
              <ellipse cx="115" cy="95" rx="136" ry="107" strokeOpacity=".3" />
              <g
                stroke="var(--cyan-hi)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="0.1 9"
                strokeOpacity=".9"
              >
                <ellipse cx="115" cy="95" rx="31" ry="24.5" />
                <ellipse cx="115" cy="95" rx="59" ry="46.5" />
                <ellipse cx="115" cy="95" rx="87" ry="68.5" />
                <ellipse cx="115" cy="95" rx="115" ry="90.5" />
              </g>
            </g>
            <g stroke="var(--cyan)" strokeOpacity=".16">
              <path d="M115 95 L230 20M115 95 L230 150M115 95 L0 40M115 95 L0 160M115 95 L60 190M115 95 L180 0" />
            </g>
          </g>
          <rect width="230" height="190" fill="none" stroke="var(--line-2)" />
        </g>
        <path d="M266 135 H296" stroke="var(--cyan)" strokeWidth="1.2" markerEnd="url(#xarr)" />
        <g transform="translate(310 40)">
          <g fill="none" stroke="var(--cyan)" strokeWidth="1.3" strokeOpacity=".9" vectorEffect="non-scaling-stroke">
            <path
              d="M0 16 L5 18 L10 19 L15 21 L20 22 L25 22 L30 22 L35 21 L40 20 L45 19 L50 17 L55 15 L60 14 L65 12 L70 11 L75 10 L80 10 L85 10 L90 11 L95 12 L100 14 L105 16 L110 17 L115 19 L120 20 L125 21 L130 22 L135 22 L140 21 L145 21 L150 19 L155 18 L160 16 L165 14 L170 12"
              transform="scale(1 .75)"
            />
            <path
              d="M0 37 L5 38 L10 39 L15 39 L20 39 L25 38 L30 37 L35 35 L40 33 L45 32 L50 30 L55 29 L60 28 L65 27 L70 27 L75 28 L80 28 L85 30 L90 31 L95 33 L100 35 L105 37 L110 38 L115 39 L120 39 L125 39 L130 38 L135 37 L140 36 L145 34 L150 32 L155 30 L160 29 L165 28 L170 27"
              transform="scale(1 .75)"
            />
            <path
              d="M0 56 L5 56 L10 55 L15 55 L20 53 L25 52 L30 50 L35 48 L40 46 L45 45 L50 44 L55 44 L60 44 L65 45 L70 46 L75 47 L80 49 L85 51 L90 53 L95 54 L100 55 L105 56 L110 56 L115 56 L120 55 L125 54 L130 52 L135 50 L140 48 L145 47 L150 46 L155 45 L160 44 L165 44 L170 45"
              transform="scale(1 .75)"
            />
          </g>
          <rect x="0" y="0" width="170" height="70" fill="none" stroke="var(--line-2)" strokeDasharray="3 4" />
        </g>
        <g transform="translate(310 160)">
          <g fill="none" stroke="var(--cyan-hi)" strokeWidth="1.3" vectorEffect="non-scaling-stroke">
            <path
              d="M0 18.0 H10 H20 V22.5 H30 H40 H50 V18.0 H60 V13.5 H70 H80 V9.0 H90 H100 V13.5 H110 H120 V18.0 H130 V22.5 H140 H150 H160 V18.0 H170 V13.5 H170"
              transform="scale(1 .75)"
            />
            <path
              d="M0 36.0 H10 H20 V40.5 H30 V36.0 H40 H50 V31.5 H60 V27.0 H70 H80 H90 V31.5 H100 H110 V36.0 H120 V40.5 H130 H140 V36.0 H150 H160 V31.5 H170 V27.0 H170"
              transform="scale(1 .75)"
            />
            <path
              d="M0 54.0 H10 H20 H30 V49.5 H40 H50 V45.0 H60 H70 H80 V49.5 H90 H100 V54.0 H110 H120 H130 H140 V49.5 H150 V45.0 H160 H170 H170"
              transform="scale(1 .75)"
            />
          </g>
          <rect x="0" y="0" width="170" height="70" fill="none" stroke="var(--line-2)" strokeDasharray="3 4" />
        </g>
        <g fontFamily="Geist Mono, monospace" fontSize="10.5" letterSpacing="0.6" fill="var(--text-3)">
          <text x="20" y="28">wood cross-section</text>
          <text x="310" y="28">weights · float32</text>
          <text x="310" y="148" fill="var(--cyan-hi)">weights · int8 levels</text>
          <text x="20" y="252">growth rings · pores</text>
          <text x="20" y="268" fill="var(--text-1)">what the model learns to read</text>
          <text x="310" y="252">quantize, then fine-tune</text>
          <text x="310" y="268" fill="var(--text-1)">to recover accuracy on-device</text>
        </g>
      </svg>

      <svg
        viewBox="0 0 342 340"
        role="img"
        aria-label={ariaLabelMobile}
        className="fig-mobile"
        style={{ width: '100%', height: 'auto', padding: 6, boxSizing: 'border-box' }}
      >
        <defs>
          <filter id="grainM" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.026" numOctaves={3} seed={7} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={10} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <clipPath id="woodclipM">
            <rect x="0" y="0" width="302" height="150" />
          </clipPath>
          <marker id="xarrM" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8" fill="none" stroke="var(--cyan)" strokeWidth="1.2" />
          </marker>
        </defs>
        <g transform="translate(20 28)">
          <g clipPath="url(#woodclipM)">
            <rect width="302" height="150" fill="var(--ink-3)" />
            <g transform="scale(1.313 .789)">
              <g filter="url(#grainM)" fill="none" stroke="var(--cyan)">
                <ellipse cx="115" cy="95" rx="10" ry="8" strokeOpacity=".9" />
                <ellipse cx="115" cy="95" rx="24" ry="19" strokeOpacity=".5" />
                <ellipse cx="115" cy="95" rx="38" ry="30" strokeOpacity=".8" />
                <ellipse cx="115" cy="95" rx="52" ry="41" strokeOpacity=".45" />
                <ellipse cx="115" cy="95" rx="66" ry="52" strokeOpacity=".75" />
                <ellipse cx="115" cy="95" rx="80" ry="63" strokeOpacity=".4" />
                <ellipse cx="115" cy="95" rx="94" ry="74" strokeOpacity=".7" />
                <ellipse cx="115" cy="95" rx="108" ry="85" strokeOpacity=".35" />
                <ellipse cx="115" cy="95" rx="122" ry="96" strokeOpacity=".6" />
                <g
                  stroke="var(--cyan-hi)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeDasharray="0.1 9"
                  strokeOpacity=".9"
                >
                  <ellipse cx="115" cy="95" rx="31" ry="24.5" />
                  <ellipse cx="115" cy="95" rx="59" ry="46.5" />
                  <ellipse cx="115" cy="95" rx="87" ry="68.5" />
                  <ellipse cx="115" cy="95" rx="115" ry="90.5" />
                </g>
              </g>
            </g>
            <rect width="302" height="150" fill="none" stroke="var(--line-2)" />
          </g>
        </g>
        <path d="M171 186 V214" stroke="var(--cyan)" strokeWidth="1.2" markerEnd="url(#xarrM)" />
        <g transform="translate(20 232) scale(.85 1)">
          <g fill="none" stroke="var(--cyan)" strokeWidth="1.3">
            <path
              d="M0 16 L5 18 L10 19 L15 21 L20 22 L25 22 L30 22 L35 21 L40 20 L45 19 L50 17 L55 15 L60 14 L65 12 L70 11 L75 10 L80 10 L85 10 L90 11 L95 12 L100 14 L105 16 L110 17 L115 19 L120 20 L125 21 L130 22 L135 22 L140 21 L145 21 L150 19 L155 18 L160 16 L165 14 L170 12"
              transform="scale(1 .9)"
            />
            <path
              d="M0 37 L5 38 L10 39 L15 39 L20 39 L25 38 L30 37 L35 35 L40 33 L45 32 L50 30 L55 29 L60 28 L65 27 L70 27 L75 28 L80 28 L85 30 L90 31 L95 33 L100 35 L105 37 L110 38 L115 39 L120 39 L125 39 L130 38 L135 37 L140 36 L145 34 L150 32 L155 30 L160 29 L165 28 L170 27"
              transform="scale(1 .9)"
            />
            <path
              d="M0 56 L5 56 L10 55 L15 55 L20 53 L25 52 L30 50 L35 48 L40 46 L45 45 L50 44 L55 44 L60 44 L65 45 L70 46 L75 47 L80 49 L85 51 L90 53 L95 54 L100 55 L105 56 L110 56 L115 56 L120 55 L125 54 L130 52 L135 50 L140 48 L145 47 L150 46 L155 45 L160 44 L165 44 L170 45"
              transform="scale(1 .9)"
            />
          </g>
          <rect width="170" height="64" fill="none" stroke="var(--line-2)" strokeDasharray="3 4" />
        </g>
        <g transform="translate(177 232) scale(.85 1)">
          <g fill="none" stroke="var(--cyan-hi)" strokeWidth="1.3">
            <path
              d="M0 18.0 H10 H20 V22.5 H30 H40 H50 V18.0 H60 V13.5 H70 H80 V9.0 H90 H100 V13.5 H110 H120 V18.0 H130 V22.5 H140 H150 H160 V18.0 H170 V13.5 H170"
              transform="scale(1 .9)"
            />
            <path
              d="M0 36.0 H10 H20 V40.5 H30 V36.0 H40 H50 V31.5 H60 V27.0 H70 H80 H90 V31.5 H100 H110 V36.0 H120 V40.5 H130 H140 V36.0 H150 H160 V31.5 H170 V27.0 H170"
              transform="scale(1 .9)"
            />
            <path
              d="M0 54.0 H10 H20 H30 V49.5 H40 H50 V45.0 H60 H70 H80 V49.5 H90 H100 V54.0 H110 H120 H130 H140 V49.5 H150 V45.0 H160 H170 H170"
              transform="scale(1 .9)"
            />
          </g>
          <rect width="170" height="64" fill="none" stroke="var(--line-2)" strokeDasharray="3 4" />
        </g>
        <g fontFamily="Geist Mono, monospace" fontSize="11.5" letterSpacing=".4" fill="var(--text-3)">
          <text x="20" y="20">wood cross-section</text>
          <text x="20" y="224">float32</text>
          <text x="177" y="224" fill="var(--cyan-hi)">int8 levels</text>
          <text x="20" y="316">quantize, then fine-tune</text>
          <text x="20" y="332" fill="var(--text-1)">to recover accuracy on-device</text>
        </g>
      </svg>
    </>
  );
}
