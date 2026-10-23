import { content } from '../content/content';
import { Rich } from './Rich';
import { CONTACT_ICONS } from './icons/ContactIcons';
import './Contact.css';

export function Contact() {
  const { contact } = content;

  return (
    <section id="contact" data-bg="3" className="contact-section">
      <div className="wrap contact-inner">
        <div className="lbl" style={{ marginBottom: 24 }}>
          {contact.eyebrow}
        </div>
        <h2 className="contact-heading">{contact.heading}</h2>
        <p className="p contact-lead">{contact.lead}</p>

        <div className="contact-rows">
          {contact.rows.map((row) => {
            const isExternal = row.href.startsWith('http');
            const Icon = CONTACT_ICONS[row.tileIcon];
            return (
              <a
                key={row.label}
                className="crow contact-row"
                href={row.href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="tile" aria-hidden="true">
                  <Icon />
                </span>
                <span className="mono contact-row-label">{row.label}</span>
                <span className="contact-row-value">
                  <Rich value={row.value} />
                  {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
                </span>
                <span className="go mono" aria-hidden="true">
                  {row.icon}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
