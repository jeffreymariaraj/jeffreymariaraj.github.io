import { content, type ResearchItem } from '../content/content';
import { Chip } from './Chip';
import { FigQuantization } from './figures/FigQuantization';
import { FigSpiking } from './figures/FigSpiking';
import { FigDistillation } from './figures/FigDistillation';
import './ResearchFocus.css';

const FIGURES: Record<ResearchItem['figure'], (props: { ariaLabel: string }) => React.JSX.Element> = {
  quantization: FigQuantization,
  spiking: FigSpiking,
  distillation: FigDistillation,
};

export function ResearchFocus() {
  const { research } = content;

  return (
    <section id="research" data-bg="1" className="research-section">
      <div className="wrap">
        <div className="research-head">
          <div className="research-head-main">
            <div className="lbl">{research.eyebrow}</div>
            <h2 className="h2">{research.heading}</h2>
          </div>
          <p className="p research-head-intro">{research.intro}</p>
        </div>

        <div className="research-list">
          {research.items.map((item) => {
            const Figure = FIGURES[item.figure];
            return (
              <article key={item.code} className="entry research-entry">
                <div className="mono research-entry-code">{item.code}</div>
                <div className="research-entry-body">
                  <div className="research-entry-chip-row">
                    <Chip status={item.status} />
                  </div>
                  <h3 className="h3">{item.title}</h3>
                  <p className="p">{item.body}</p>
                  <div className="research-entry-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <figure className="research-entry-figure">
                  <Figure ariaLabel={item.figureAriaLabel} />
                  <figcaption className="mono research-entry-figcaption">{item.figureCaption}</figcaption>
                </figure>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
