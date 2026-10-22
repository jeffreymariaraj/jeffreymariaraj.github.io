import { Fragment } from 'react';
import { isPh, type Rich as RichType } from '../content/content';

/**
 * Renders a `Rich` array (verified text interleaved with placeholders)
 * so a placeholder can sit mid-sentence without a component rewrite.
 * Placeholders get the `.ph` style (amber, dashed underline).
 */
export function Rich({ value }: { value: RichType }) {
  return (
    <>
      {value.map((seg, i) =>
        isPh(seg) ? (
          <span className="ph" key={i}>
            {seg.ph}
          </span>
        ) : (
          <Fragment key={i}>{seg}</Fragment>
        )
      )}
    </>
  );
}
