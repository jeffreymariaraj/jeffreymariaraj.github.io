import { content } from '../content/content';
import './Method.css';

export function Method() {
  const { method } = content;

  return (
    <section id="method" data-bg="2" className="method-section">
      <div className="wrap">
        <div className="method-head">
          <div className="method-head-main">
            <div className="lbl">{method.eyebrow}</div>
            <h2 className="h2">{method.heading}</h2>
          </div>
          <p className="p method-head-intro">{method.intro}</p>
        </div>

        <ol className="method-steps">
          {method.steps.map((step) => (
            <li key={step.code} className="method-step">
              <div className="mono method-step-code" style={{ color: 'var(--cyan)' }}>
                {step.code}
              </div>
              <div className="method-step-title">{step.title}</div>
              <p className="p">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="method-repo">
          <p className="p method-repo-intro">{method.repoIntro}</p>
          <pre className="mono method-repo-tree">
            {method.repoTree.map((entry, i) => {
              const isRoot = i === 0;
              return (
                <span key={i}>
                  {!isRoot && '  '}
                  <span className={isRoot ? 'method-repo-tree-dir' : undefined}>{entry.name}</span>
                  {entry.comment && (
                    <>
                      {'      '}
                      <span className="method-repo-tree-comment"># {entry.comment}</span>
                    </>
                  )}
                  {i < method.repoTree.length - 1 && '\n'}
                </span>
              );
            })}
          </pre>
        </div>
        <div className="mono method-repo-note">{method.repoNote}</div>
      </div>
    </section>
  );
}
