/**
 * Single source of truth for all site copy.
 *
 * Every verified fact comes from CLAUDE.md. Everything else is an
 * explicit placeholder created with `ph()`, which components render
 * with the `.ph` (amber, dashed underline) style via <Rich>. As of
 * revision 3, only two placeholders remain site-wide: the CV's
 * "Last updated" date and the contact email — everything else below
 * is real.
 *
 * Run `npm run check:placeholders` to list every `ph()` still present.
 */

export interface Ph {
  ph: string;
}

export function ph(text: string): Ph {
  return { ph: text };
}

export function isPh(seg: unknown): seg is Ph {
  return typeof seg === 'object' && seg !== null && 'ph' in seg;
}

/** A sentence that may interleave verified text and placeholders. */
export type Rich = (string | Ph)[];

/**
 * Exploratory is kept in the type (and in Chip/design-system CSS) per
 * DESIGN.md even though no current content uses it on the page.
 */
export type Status = 'published' | 'ongoing' | 'completed' | 'exploratory';

export interface NavItem {
  id: string;
  n: string;
  label: string;
}

export interface Link {
  label: string;
  href: string;
  external?: boolean;
}

export interface ResearchItem {
  code: string;
  status: Status;
  title: string;
  body: string;
  tags: string[];
  figure: 'quantization' | 'spiking' | 'distillation';
  figureAriaLabel: string;
  figureCaption: string;
}

export interface TableRow {
  model: string;
  /** Short suffix after the model name, e.g. "· selected" (rendered in cyan). */
  note?: string;
  /** The chosen backbone's row is bold/white, not just another row. */
  highlight?: boolean;
  accuracy: string;
  time: string;
  size: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface LedgerEntry {
  status: Status;
  title: string;
  description: string;
  meta: string;
  href: string;
}

export interface ProjectItem {
  code: string;
  status: Status;
  title: string;
  /** Mono line under the title (collaborators, internship, or paper cross-reference). */
  meta?: string;
  problem: string;
  approach: string;
  tags: string[];
  /** Short mono status note, e.g. "No results reported yet." */
  note?: string;
  links: Link[];
  figure: 'xylo' | 'molecule' | 'routing';
  figureAriaLabel: string;
  /**
   * Only set when the mobile redraw describes a genuinely different
   * layout (P.1's cross-section sits above the curves on mobile, beside
   * them on desktop). Where the mobile SVG is just a redrawn version of
   * the same arrangement, the desktop aria-label is reused for both.
   */
  figureAriaLabelMobile?: string;
  figureCaption: string;
  figureNote: string;
  flip?: boolean;
}

export interface ContactRow {
  label: string;
  value: Rich;
  href: string;
  icon: '↗' | '→' | '↓';
  tileIcon: 'linkedin' | 'x' | 'github' | 'mail' | 'document';
}

export const content = {
  meta: {
    title: 'Jeff Mariaraj — research portfolio',
    description:
      'Jeff Mariaraj — student researcher at RVCE Bengaluru working on quantization, spiking networks and distillation for efficient, resource-constrained machine learning.',
  },

  nav: {
    logoName: 'Jeff Mariaraj',
    items: [
      { id: 'cv', n: '01', label: 'CV' },
      { id: 'research', n: '02', label: 'Research' },
      { id: 'publications', n: '03', label: 'Publications' },
      { id: 'projects', n: '04', label: 'Projects' },
      { id: 'contact', n: '05', label: 'Contact' },
    ] as NavItem[],
  },

  hero: {
    status: {
      role: 'Student researcher',
      domain: 'Efficient & resource-constrained ML',
    },
    nameFirst: 'Jeff',
    nameSurname: 'Mariaraj',
    portrait: {
      alt: 'Portrait of Jeff Mariaraj',
      captionLabel: 'Fig. 00 · portrait',
      position: '12.92°N 77.50°E',
      placeholderLabel: ['[Your photo]', 'face shot · 4:5 · cool grade'],
    },
    identity: [
      {
        label: 'Studying',
        value: 'B.E. Computer Science & Engineering, RV College of Engineering, Bengaluru · 2027',
      },
      { label: 'Next', value: 'Incoming SDE at Deutsche Bank' },
      { label: 'Research', value: 'Quantization, spiking networks, distillation' },
    ],
    statement: 'I study what is lost, and what survives, when neural networks are made small.',
    ctas: [
      { label: 'View CV', href: '#cv', variant: 'primary', icon: '↓' },
      { label: 'Research', href: '#research', variant: 'ghost' },
      { label: 'Publications', href: '#publications', variant: 'ghost' },
      {
        label: 'GitHub',
        href: 'https://github.com/jeffreymariaraj',
        variant: 'ghost',
        icon: '↗',
        external: true,
      },
    ] as { label: string; href: string; variant: 'primary' | 'ghost'; icon?: string; external?: boolean }[],
    annotation: {
      focusLabel: 'Focus',
      focus: 'Quantization · SNNs · Distillation',
      statusLabel: 'Status',
      status: 'Ongoing: vision-model quantization study',
      positionLabel: 'Position',
      position: '12.92°N 77.50°E',
    },
    figureNote: ['Fig. 00 · signal propagation (live)', 'N = 64 nodes · k-nearest links · canvas 2D'],
  },

  research: {
    eyebrow: '02 — Research direction',
    heading: 'How little precision can a network afford',
    headingAccent: '?',
    intro:
      "One question, approached from three directions: which parts of a model's precision, activity and capacity are load-bearing, and what breaks first when they are removed.",
    items: [
      {
        code: 'R.1',
        status: 'ongoing',
        title: 'Quantization & efficient inference',
        body: 'Low-bit weights and activations for vision models: post-training versus quantization-aware training, and where accuracy loss concentrates across CNNs, MobileNets and transformers.',
        tags: ['PTQ', 'QAT', 'low-bit inference', 'ViT / Swin / MobileNet'],
        figure: 'quantization',
        figureAriaLabel:
          'Schematic: a continuous response curve and its staircase approximation on a b-bit grid',
        figureCaption: 'Fig. R.1 · illustration, not a result',
      },
      {
        code: 'R.2',
        status: 'exploratory',
        title: 'Spiking networks & neuromorphic computing',
        body: 'Event-driven computation in place of dense activations. I am interested in how spiking networks are trained, and in whether the energy they promise survives an honest accounting against accuracy.',
        tags: ['SNN', 'LIF neurons', 'event-driven'],
        figure: 'spiking',
        figureAriaLabel:
          'Schematic: spike raster above a leaky integrate-and-fire membrane potential trace crossing a threshold',
        figureCaption: 'Fig. R.2 · illustration, not a result',
      },
      {
        code: 'R.3',
        status: 'exploratory',
        title: 'Distillation & model compression',
        body: 'Transferring behaviour from large models into small ones, and treating distillation, pruning and quantization as parts of one compression budget under resource constraints.',
        tags: ['knowledge distillation', 'compression', 'constrained ML'],
        figure: 'distillation',
        figureAriaLabel:
          'Schematic: a large teacher network emits a soft output distribution that a small student network learns to match',
        figureCaption: 'Fig. R.3 · illustration, not a result',
      },
    ] as ResearchItem[],
  },

  publications: {
    eyebrow: '03 — Publications & ongoing work',
    heading: 'Published and ongoing work, kept visibly apart.',
    statusKey: [
      { status: 'published' as Status, note: 'peer-reviewed, citable' },
      { status: 'ongoing' as Status, note: 'active, not yet reported' },
      { status: 'completed' as Status, note: 'finished, outcome documented' },
    ],
    featured: {
      status: 'published' as Status,
      venue: 'IEEE · CSITSS 2025',
      title:
        'Smart Meta-controller: Energy Efficient Dynamic Routing for Large Language Model Inference Systems',
      authors: 'R. Jeffrey Mariaraj, Ronan Lobo, Maurya P. Gowda',
      venueFull:
        '2025 9th International Conference on Computational System and Information Technology for Sustainable Solutions (CSITSS)',
      doi: 'DOI 10.1109/CSITSS67709.2025.11295492',
      abstract:
        "Most queries do not need the largest model. We built a two-stage router: a fine-tuned DistilBERT classifier makes a fast first call on whether a prompt is simple or complex, and an escalation protocol lets the lightweight agent hand a prompt up to the deep agent when it detects it is out of its depth. In the paper's evaluation, routing cut estimated cost by 84% under a simulated cost model and energy per query by 62%, with task completion held at 99.1%.",
      links: [
        {
          label: 'Paper (DOI) ↗',
          href: 'https://doi.org/10.1109/CSITSS67709.2025.11295492',
          external: true,
        },
        { label: 'Code ↗', href: 'https://github.com/mauryapg13/smart-meta-controller', external: true },
      ] as Link[],
      table: {
        caption: 'Table 1 · choice of classifier backbone (paper, Table II)',
        headers: ['Model', 'Accuracy', 'Inference time', 'Size'],
        rows: [
          { model: 'BERT-base', accuracy: '89.8%', time: 'baseline', size: 'baseline' },
          {
            model: 'DistilBERT',
            note: '· selected',
            highlight: true,
            accuracy: '88.6%',
            time: '−47.0%',
            size: '−40.0%',
          },
          { model: 'DynaBERT', accuracy: '89.1%', time: '−32.0%', size: '−25.0%' },
          { model: 'RoBERTa-base', accuracy: '89.4%', time: '0.0%', size: '0.0%' },
        ] as TableRow[],
        note: 'All four fine-tuned under identical settings on the query-classification task. Time and size are relative to BERT-base.',
      },
      figureCaption: 'Fig. 1 · where 100 queries go',
      figureNote: 'reported split',
      figureAriaLabel:
        "A ten by ten grid of 100 queries: 85 routed to the light agent shown as dots, 15 escalated to the deep agent shown as ringed dots. Below, a cost bar comparison: 10,000,000 units if every query goes to the deep agent against 1,585,000 units with the meta-controller, an 84.15 percent saving under the paper's simulated cost model.",
      stats: [
        { value: '97%', label: 'classifier accuracy, curated test set, ~15 ms' },
        { value: '−62%', label: 'energy per query' },
        { value: '−68%', label: 'computational load' },
      ] as Stat[],
      statsNote:
        'As reported in the paper. Cost bars use its simulated cost model (deep = 10 units, light = 0.1 unit, 85% of queries to the light agent).',
    },
    ledgerLabel: 'Research ledger',
    ledger: [
      {
        status: 'ongoing',
        title: 'XyloTron Vision Model Quantization',
        description:
          'An offline, edge-deployable species classifier for wood identification. We are quantizing the XyloTron vision model and fine-tuning it for XyloPhone, a camera-based device that runs without a network connection, so identification works where connectivity does not. Carried out by two students in collaboration with Prabu Ravindran and Dr. Wiedenhoeft of the Department of Botany, University of Wisconsin–Madison.',
        meta: 'Two-person student team · Prototype stage · no results reported yet',
        href: '#projects',
      },
    ] as LedgerEntry[],
  },

  projects: {
    eyebrow: '04 — Selected projects',
    heading: 'Each project is a small research artefact.',
    items: [
      {
        code: 'P.1',
        status: 'ongoing',
        title: 'XyloTron quantization for offline wood identification',
        meta: 'With Prabu Ravindran and Dr. Wiedenhoeft · Department of Botany, University of Wisconsin–Madison',
        problem:
          'XyloTron identifies wood species from macroscopic images. Field identification often happens without a network or a workstation, so the model has to be small and fast enough to run entirely on the device.',
        approach:
          'We are quantizing the XyloTron vision model and fine-tuning it to recover accuracy, targeting XyloPhone, an offline camera device. A companion mobile application that runs the same model is in development. Two students carry out the work.',
        tags: ['Quantization', 'Fine-tuning', 'Edge inference', 'Wood identification', 'Mobile'],
        note: 'No results reported yet.',
        links: [] as Link[],
        figure: 'xylo',
        figureAriaLabel:
          'Schematic: a stylised wood cross-section with growth rings and pores on the left. An arrow leads to two panels on the right: smooth floating-point weight curves above, and the same curves snapped to coarse integer levels below.',
        figureAriaLabelMobile:
          'Schematic: a stylised wood cross-section with growth rings and pores at the top. An arrow leads down to two panels: smooth floating-point weight curves on the left, and the same curves snapped to coarse integer levels on the right.',
        figureCaption: 'Fig. P.1 · from wood section to int8',
        figureNote: 'schematic · not data',
      },
      {
        code: 'P.2',
        status: 'completed',
        title: 'Drug-like molecule generator',
        meta: 'Internship · Agilisium Consulting, Agilisium Labs (R&D division)',
        problem:
          'Exploring chemical space means combining known building blocks, and doing it by hand is slow. Candidate libraries need validity and basic drug-likeness checks built in.',
        approach:
          'A Streamlit application that assembles molecules combinatorially from a curated set of heteroaromatic fragments and linkers, validates each structure with RDKit, keeps those within a 150–500 Da molecular-weight window, and reports MW, LogP, TPSA and hydrogen-bond donors and acceptors. Results appear as a table and 2D structure grid, with CSV export.',
        tags: ['Python', 'Streamlit', 'RDKit', 'pandas', 'Cheminformatics'],
        note: 'Rule-based MVP · no benchmark results reported.',
        links: [
          {
            label: 'Code ↗',
            href: 'https://github.com/jeffreymariaraj/drug-like-molecule-generator',
            external: true,
          },
        ] as Link[],
        figure: 'molecule',
        figureAriaLabel:
          'Schematic: two aromatic ring fragments joined by a short linker chain, with a molecular-weight window of 150 to 500 daltons marked below',
        figureCaption: 'Fig. P.2 · fragment + linker + fragment',
        figureNote: 'schematic · not data',
        flip: true,
      },
      {
        code: 'P.3',
        status: 'published',
        title: 'LLM query routing with a DistilBERT classifier',
        meta: 'IEEE CSITSS 2025 · with Ronan Lobo and Maurya P. Gowda · same work as the publication above',
        problem:
          'Most queries do not need the largest model, yet serving all of them with it costs energy and latency. Can a small classifier decide, quickly and cheaply, where each query should go?',
        approach:
          'A fine-tuned DistilBERT classifier, chosen over BERT, DynaBERT and RoBERTa for its speed and size, routes each query to a lightweight or a deep agent. An escalation protocol lets the lightweight agent pass a prompt up when it is out of its depth. The paper reports 97% classifier accuracy at about 15 ms, with 68% lower computational load and 62% less energy per query.',
        tags: ['DistilBERT', 'LLM routing', 'Energy efficiency', 'Python'],
        links: [
          { label: 'Paper (DOI) ↗', href: 'https://doi.org/10.1109/CSITSS67709.2025.11295492', external: true },
          { label: 'Code ↗', href: 'https://github.com/mauryapg13/smart-meta-controller', external: true },
        ] as Link[],
        figure: 'routing',
        figureAriaLabel:
          'Pipeline diagram: a query enters a DistilBERT classifier. Simple queries, about 85 percent, go to a light agent; complex queries, about 15 percent, go to a deep agent. A dashed escalation path leads from the light agent to the deep agent. Both agents return a response.',
        figureCaption: 'Fig. P.3 · two-stage routing',
        figureNote: 'schematic · not data',
      },
    ] as ProjectItem[],
  },

  cv: {
    eyebrow: '01 — Curriculum vitae',
    heading: 'Read it here, or take it with you.',
    intro: [
      'Education, research experience, publications and technical skills. Last updated ',
      ph('[date]'),
      '.',
    ] as Rich,
    downloadLabel: 'Download PDF',
    openNewTabLabel: 'Open in new tab',
    pdfHref: '/cv/CV.pdf',
    pdfFilename: 'CV.pdf',
  },

  contact: {
    eyebrow: '05 — Contact',
    heading: 'If this overlaps with what you work on, I would like to compare notes.',
    lead: 'I am looking for research collaboration in efficient and resource-constrained machine learning, and happy to share code, logs and open questions.',
    rows: [
      {
        label: 'LinkedIn',
        value: ['linkedin.com/in/jeffrey-mariaraj'] as Rich,
        href: 'https://www.linkedin.com/in/jeffrey-mariaraj',
        icon: '↗',
        tileIcon: 'linkedin',
      },
      {
        label: 'X',
        value: ['x.com/ffsj3ff'] as Rich,
        href: 'https://x.com/ffsj3ff',
        icon: '↗',
        tileIcon: 'x',
      },
      {
        label: 'GitHub',
        value: ['github.com/jeffreymariaraj'] as Rich,
        href: 'https://github.com/jeffreymariaraj',
        icon: '↗',
        tileIcon: 'github',
      },
      {
        label: 'Email',
        value: [ph('[email address]')] as Rich,
        href: '#contact',
        icon: '→',
        tileIcon: 'mail',
      },
      {
        label: 'CV',
        value: ['Download as PDF'] as Rich,
        href: '#cv',
        icon: '↓',
        tileIcon: 'document',
      },
    ] as ContactRow[],
  },

  footer: {
    copyright: '© 2026 Jeff Mariaraj · RVCE Bengaluru',
    stack: 'Static site · React + CSS + Canvas 2D · GitHub Pages',
    backToTop: 'Back to top ↑',
    // Not a `ph()` placeholder itself — this is the legend explaining
    // the convention, so `phSample` renders with the `.ph` look
    // directly rather than being listed by check:placeholders.
    phSample: 'Amber dashed text',
    phNoteRest: ' = placeholder to be replaced with verified content',
  },
};

export type Content = typeof content;
