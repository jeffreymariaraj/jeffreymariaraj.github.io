import { content, type ProjectItem } from '../content/content';
import { Chip } from './Chip';
import './Projects.css';

/**
 * Step 1 (content & structure) stub: wires the real P.1-P.3 content
 * (XyloTron, molecule generator, query routing) so the build stays
 * green. The real inline-SVG figures (FigXylo/FigMolecule/FigRouting)
 * and final layout arrive in Step 3.
 */
function ProjectEntry({ item }: { item: ProjectItem }) {
  const text = (
    <div className="project-entry-text" key="text">
      <div className="project-entry-top">
        <span className="mono project-entry-code">{item.code}</span>
        <Chip status={item.status} />
      </div>
      <h3 className="project-entry-title">{item.title}</h3>
      {item.meta && (
        <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>
          {item.meta}
        </div>
      )}
      <div className="project-entry-field">
        <div className="lbl" style={{ fontSize: 10 }}>
          Problem
        </div>
        <p className="p" style={{ fontSize: 16 }}>
          {item.problem}
        </p>
      </div>
      <div className="project-entry-field">
        <div className="lbl" style={{ fontSize: 10 }}>
          Approach
        </div>
        <p className="p" style={{ fontSize: 16 }}>
          {item.approach}
        </p>
      </div>
      <div className="project-entry-tags">
        {item.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      {item.note && (
        <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>
          {item.note}
        </div>
      )}
      <div className="project-entry-links">
        {item.links.map((link) => (
          <a key={link.href} className="lnk mono" href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );

  const figure = (
    <figure className="panel project-entry-figure" key="figure">
      <div className="mono fig-caption">
        <span>{item.figureCaption}</span>
        <span className="project-entry-figure-note">{item.figureNote}</span>
      </div>
      <div
        role="img"
        aria-label={item.figureAriaLabel}
        style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>
          Fig. {item.code} — Step 3
        </span>
      </div>
    </figure>
  );

  return (
    <article className={`project-entry${item.flip ? ' project-entry-flip' : ''}`}>
      {item.flip ? [figure, text] : [text, figure]}
    </article>
  );
}

export function Projects() {
  const { projects } = content;

  return (
    <section id="projects" data-bg="2" className="projects-section">
      <div className="wrap">
        <div className="projects-head">
          <div className="lbl">{projects.eyebrow}</div>
          <h2 className="h2">{projects.heading}</h2>
        </div>

        {projects.items.map((item) => (
          <ProjectEntry key={item.code} item={item} />
        ))}
      </div>
    </section>
  );
}
