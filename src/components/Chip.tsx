import type { Status } from '../content/content';

const STATUS_CLASS: Record<Status, string> = {
  published: 'c-pub',
  ongoing: 'c-on',
  exploratory: 'c-ex',
};

const STATUS_LABEL: Record<Status, string> = {
  published: 'Published',
  ongoing: 'Ongoing',
  exploratory: 'Exploratory',
};

/**
 * Status chip. Shape and fill carry the meaning, never hue alone:
 * Published = filled square, Ongoing = half-filled circle,
 * Exploratory = hollow circle with a dashed border.
 */
export function Chip({ status, minWidth }: { status: Status; minWidth?: number }) {
  return (
    <span className={`chip ${STATUS_CLASS[status]}`} style={minWidth ? { minWidth } : undefined}>
      {STATUS_LABEL[status]}
    </span>
  );
}
