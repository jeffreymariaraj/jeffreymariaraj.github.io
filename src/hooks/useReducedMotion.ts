import { useMediaQuery } from './useMediaQuery';

/**
 * Tracks `prefers-reduced-motion: reduce` live, so animated features
 * (background loop, hero fade-ups, status pulse) can turn off the
 * instant a user changes their OS setting, no reload required.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
