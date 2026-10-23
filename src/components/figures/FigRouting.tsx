/**
 * Fig. P.3 — two-stage routing pipeline: Query -> DistilBERT
 * classifier -> light or deep agent (dashed escalation path between
 * them) -> Response. Desktop is horizontal; the mobile redraw (copied
 * verbatim, not scaled) is vertical per the artboard.
 */
export function FigRouting({ ariaLabel }: { ariaLabel: string }) {
  return (
    <>
      <svg
        viewBox="0 0 600 300"
        role="img"
        aria-label={ariaLabel}
        className="fig-desktop"
        style={{ width: '100%', height: 'auto', padding: '8px 12px 6px', boxSizing: 'border-box' }}
      >
        <defs>
          <marker id="parr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8" fill="none" stroke="var(--cyan)" strokeWidth="1.2" />
          </marker>
          <marker id="parg" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8" fill="none" stroke="var(--text-3)" strokeWidth="1.2" />
          </marker>
        </defs>
        <g fill="none" strokeWidth="1.3">
          <path d="M82 150 H112" stroke="var(--text-3)" markerEnd="url(#parg)" />
          <path d="M232 150 H262 V76 H292" stroke="var(--cyan)" markerEnd="url(#parr)" />
          <path d="M232 150 H262 V224 H292" stroke="var(--cyan)" markerEnd="url(#parr)" />
          <path d="M432 76 H462 V138 H482" stroke="var(--text-3)" markerEnd="url(#parg)" />
          <path d="M432 224 H462 V162 H482" stroke="var(--text-3)" markerEnd="url(#parg)" />
          <path d="M362 106 V194" stroke="var(--cyan-hi)" strokeDasharray="4 4" markerEnd="url(#parr)" />
        </g>
        <g fontFamily="Geist, system-ui, sans-serif" fontSize="13" fill="var(--text-1)">
          <rect x="16" y="128" width="66" height="44" fill="var(--ink-3)" stroke="var(--line-2)" />
          <text x="49" y="155" textAnchor="middle">Query</text>
          <rect x="112" y="116" width="120" height="68" fill="rgba(92,200,220,.08)" stroke="var(--cyan)" />
          <text x="172" y="145" textAnchor="middle" fill="var(--text)">DistilBERT</text>
          <text
            x="172"
            y="166"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="9"
            fill="var(--cyan-hi)"
            letterSpacing=".3"
          >
            classifier · ~15 ms
          </text>
          <rect x="292" y="46" width="140" height="60" fill="var(--ink-3)" stroke="var(--line-2)" />
          <text x="362" y="72" textAnchor="middle">Light agent</text>
          <text
            x="362"
            y="92"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            fill="var(--text-3)"
            letterSpacing=".5"
          >
            cheap · fast
          </text>
          <rect x="292" y="194" width="140" height="60" fill="var(--ink-3)" stroke="var(--mute)" strokeDasharray="5 3" />
          <text x="362" y="220" textAnchor="middle">Deep agent</text>
          <text
            x="362"
            y="240"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            fill="var(--text-3)"
            letterSpacing=".5"
          >
            capable · costly
          </text>
          <rect x="482" y="126" width="102" height="48" fill="var(--ink-3)" stroke="var(--line-2)" />
          <text x="533" y="155" textAnchor="middle">Response</text>
        </g>
        <g fontFamily="Geist Mono, monospace" fontSize="10" letterSpacing=".5" fill="var(--text-3)">
          <text x="268" y="116" textAnchor="start" fill="var(--text-1)">simple · ~85%</text>
          <text x="268" y="186" textAnchor="start" fill="var(--text-1)">complex · ~15%</text>
          <text x="372" fill="var(--cyan-hi)">
            <tspan x="372" y="148">escalate if</tspan>
            <tspan x="372" y="161">out of depth</tspan>
          </text>
          <text x="16" y="284">per-query cost in the paper's model: deep 10 units · light 0.1 unit</text>
        </g>
      </svg>

      <svg
        viewBox="0 0 342 352"
        role="img"
        aria-label={ariaLabel}
        className="fig-mobile"
        style={{ width: '100%', height: 'auto', padding: 6, boxSizing: 'border-box' }}
      >
        <defs>
          <marker id="parrM" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8" fill="none" stroke="var(--cyan)" strokeWidth="1.2" />
          </marker>
          <marker id="pargM" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8" fill="none" stroke="var(--text-3)" strokeWidth="1.2" />
          </marker>
        </defs>
        <g fill="none" strokeWidth="1.3">
          <path d="M171 44 V64" stroke="var(--text-3)" markerEnd="url(#pargM)" />
          <path d="M171 122 V142" stroke="var(--cyan)" />
          <path d="M88 142 H254" stroke="var(--cyan)" />
          <path d="M88 142 V158" stroke="var(--cyan)" markerEnd="url(#parrM)" />
          <path d="M254 142 V158" stroke="var(--cyan)" markerEnd="url(#parrM)" />
          <path d="M156 190 H184" stroke="var(--cyan-hi)" strokeDasharray="4 4" markerEnd="url(#parrM)" />
          <path d="M88 218 V250 H171 V268" stroke="var(--text-3)" markerEnd="url(#pargM)" />
          <path d="M254 218 V250 H171" stroke="var(--text-3)" />
        </g>
        <g fontFamily="Geist, system-ui, sans-serif" fontSize="14" fill="var(--text-1)" textAnchor="middle">
          <rect x="121" y="8" width="100" height="36" fill="var(--ink-3)" stroke="var(--line-2)" />
          <text x="171" y="31">Query</text>
          <rect x="66" y="66" width="210" height="56" fill="rgba(92,200,220,.08)" stroke="var(--cyan)" />
          <text x="171" y="90" fill="var(--text)">DistilBERT</text>
          <text x="171" y="110" fontFamily="Geist Mono, monospace" fontSize="11" fill="var(--cyan-hi)" letterSpacing=".4">
            classifier · ~15 ms
          </text>
          <rect x="20" y="160" width="136" height="58" fill="var(--ink-3)" stroke="var(--line-2)" />
          <text x="88" y="184">Light agent</text>
          <text x="88" y="204" fontFamily="Geist Mono, monospace" fontSize="11" fill="var(--text-3)" letterSpacing=".4">
            cheap · fast
          </text>
          <rect x="186" y="160" width="136" height="58" fill="var(--ink-3)" stroke="var(--mute)" strokeDasharray="5 3" />
          <text x="254" y="184">Deep agent</text>
          <text x="254" y="204" fontFamily="Geist Mono, monospace" fontSize="11" fill="var(--text-3)" letterSpacing=".4">
            capable · costly
          </text>
          <rect x="121" y="268" width="100" height="40" fill="var(--ink-3)" stroke="var(--line-2)" />
          <text x="171" y="293">Response</text>
        </g>
        <g fontFamily="Geist Mono, monospace" fontSize="11" letterSpacing=".4">
          <text x="20" y="136" fill="var(--text-1)">simple · ~85%</text>
          <text x="322" y="136" textAnchor="end" fill="var(--text-1)">complex · ~15%</text>
          <text x="171" y="236" textAnchor="middle" fill="var(--cyan-hi)">escalate if out of depth</text>
          <text x="20" y="334" fill="var(--text-3)">cost per query: deep 10 · light 0.1</text>
        </g>
      </svg>
    </>
  );
}
