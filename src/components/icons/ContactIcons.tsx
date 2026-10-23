/* eslint-disable react-refresh/only-export-components -- this is a
   small static icon registry (components + the lookup map that
   indexes them), not a component module; losing Fast Refresh here
   costs nothing. */

/**
 * The five contact-row tile glyphs. Paths copied verbatim from the
 * artboard (standard brand marks for LinkedIn/X/GitHub, plain
 * geometric envelope/document glyphs for mail/CV). Purely decorative
 * — aria-hidden at the call site in Contact.tsx, since the row's own
 * text already carries the name.
 */

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.75 9.75h3.8v1.6h.06c.53-1 1.82-2 3.75-2 4 0 4.74 2.64 4.74 6.07V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.69V21h-4z"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path
        fill="currentColor"
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="M3.5 6.5 12 13l8.5-6.5" />
      </g>
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4M9 12h6M9 15.5h6" />
      </g>
    </svg>
  );
}

export const CONTACT_ICONS = {
  linkedin: LinkedInIcon,
  x: XIcon,
  github: GitHubIcon,
  mail: MailIcon,
  document: DocumentIcon,
};

export type ContactIconName = keyof typeof CONTACT_ICONS;
