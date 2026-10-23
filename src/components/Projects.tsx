import { content, type ProjectItem } from '../content/content';
import { Chip } from './Chip';
import { FigXylo } from './figures/FigXylo';
import { FigMolecule } from './figures/FigMolecule';
import { FigRouting } from './figures/FigRouting';
import './Projects.css';

function Figure({ item }: { item: ProjectItem }) {
  switch (item.figure) {
    case 'xylo':
      return <FigXylo ariaLabel={item.figureAriaLabel} ariaLabelMobile={item.figureAriaLabelMobile ?? item.figureAriaLabel} />;
    case 'molecule':
      return <FigMolecule ariaLabel={item.figureAriaLabel} />;
    case 'routing':
      return <FigRouting ariaLabel={item.figureAriaLabel} />;
  }
}

function ProjectEntry({ item }: { item: ProjectItem }) {
  const text = (
    <div className="project-entry-text" key="text">
      <div className="project-entry-top">
        <span className="mono project-entry-code">{item.code}</span>
        <Chip status={item.status} />
      </div>
      <h3 className="project-entry-title">{item.title}</h3>
      {item.meta && <div className="mono project-entry-meta">{item.meta}</div>}
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
      {item.note && <div className="mono project-entry-note">{item.note}</div>}
      {item.links.length > 0 && (
        <div className="project-entry-links">
          {item.links.map((link) => (
            <a
              key={link.href}
              className="lnk mono"
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const figure = (
    <figure className="panel project-entry-figure" key="figure">
      <div className="mono fig-caption">
        <span>{item.figureCaption}</span>
        <span className="project-entry-figure-note">{item.figureNote}</span>
      </div>
      <Figure item={item} />
    </figure>
  );

  // `flip` puts the figure first in source order and pairs it with
  // flex-wrap: wrap-reverse. On a single unwrapped line (desktop) that
  // swaps which side the figure renders on; once the row wraps to a
  // single column (mobile), wrap-reverse flips the *line* order back,
  // so text still reads above the figure there — same as every other
  // (non-flipped) entry. Order matters here; wrap-reverse alone does
  // nothing on an unwrapped line.
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
