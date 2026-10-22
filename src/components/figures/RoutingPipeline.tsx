import './RoutingPipeline.css';

/** Fig. P.3 — a query passes through a fine-tuned DistilBERT classifier to one of two models. */
export function RoutingPipeline({ ariaLabel }: { ariaLabel: string }) {
  return (
    <div className="routing-pipeline" role="img" aria-label={ariaLabel}>
      <div className="routing-box">Query</div>
      <span className="mono routing-arrow" aria-hidden="true">
        →
      </span>
      <div className="routing-box routing-box-classifier">
        DistilBERT
        <br />
        <span className="mono" style={{ fontSize: 10, color: 'var(--cyan-hi)' }}>
          fine-tuned classifier
        </span>
      </div>
      <span className="mono routing-arrow" aria-hidden="true">
        →
      </span>
      <div className="routing-outputs">
        <div className="routing-output">Smaller, cheaper model</div>
        <div className="routing-output routing-output-dashed">Larger, more capable model</div>
      </div>
    </div>
  );
}
