import { content, type ProjectItem } from '../content/content';
import { Rich } from './Rich';
import { Chip } from './Chip';
import { FigP1 } from './figures/FigP1';
import { FigP2 } from './figures/FigP2';
import { RoutingPipeline } from './figures/RoutingPipeline';
import './Projects.css';

const FIGURES: Record<ProjectItem['figure'], (props: { ariaLabel: string }) => React.JSX.Element> = {
  p1: FigP1,
  p2: FigP2,
  p3: RoutingPipeline,
};

function ProjectEntry({ item }: { item: ProjectItem }) {
  const Figure = FIGURES[item.figure];

  const text = (
    <div className="project-entry-text" key="text">
      <div className="project-entry-top">
        <span className="mono project-entry-code">{item.code}</span>
        <Chip status={item.status} />
      </div>
      <h3 className="project-entry-title">
        <Rich value={item.title} />
      </h3>
      <div className="project-entry-field">
        <div className="lbl" style={{ fontSize: 10 }}>
          Problem
        </div>
        <p className="p" style={{ fontSize: 16 }}>
          <Rich value={item.problem} />
        </p>
      </div>
      <div className="project-entry-field">
        <div className="lbl" style={{ fontSize: 10 }}>
          Approach
        </div>
        <p className="p" style={{ fontSize: 16 }}>
          <Rich value={item.approach} />
        </p>
      </div>
      <div className="project-entry-tags">
        {item.tags.map((tag, i) => (
          <span key={i} className="tag">
            <Rich value={tag} />
          </span>
        ))}
      </div>
      <div className="project-entry-links">
        {item.links.map((link, i) => (
          <a key={i} className="lnk mono" href={link.href}>
            <Rich value={link.label} />
          </a>
        ))}
      </div>
    </div>
  );

  const figure = (
    <figure className="panel project-entry-figure" key="figure">
      <div className="mono fig-caption">
        <span>{item.figureCaption}</span>
        <span className="project-entry-figure-note">
          <Rich value={item.figureNote} />
        </span>
      </div>
      <Figure ariaLabel={item.figureAriaLabel} />
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
