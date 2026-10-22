import type { CSSProperties } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { NetworkBackground } from './NetworkBackground';

// position: sticky + height: 0 pins this layer behind all content for
// the whole page scroll (it "sticks" the instant it would otherwise
// scroll away, and — having no height — never un-sticks). Ported
// verbatim from the wrapper around <dc-import name="Background"> in
// Main.dc.html / Mobile.dc.html.
const wrapperStyle = {
  position: 'sticky',
  top: 0,
  height: 0,
  zIndex: 0,
  pointerEvents: 'none',
  '--bg-h': 'min(100vh, 1000px)',
  '--bg-base': 'transparent',
} as CSSProperties;

/**
 * Mounts the network background as a fixed-feeling layer behind page
 * content. Density follows the DESIGN.md budget: 1 on desktop (64
 * nodes / 12 pulses), 0.5 at the mobile breakpoint (32 nodes / 6
 * pulses, pointer repulsion already off on coarse pointers).
 */
export function BackgroundLayer() {
  const isMobile = useMediaQuery('(max-width: 720px)');
  return (
    <div aria-hidden="true" style={wrapperStyle}>
      <NetworkBackground density={isMobile ? 0.5 : 1} />
    </div>
  );
}
