/**
 * Single source of truth for all site copy.
 *
 * Every verified fact comes from CLAUDE.md. Everything else is an
 * explicit placeholder created with `ph()`, which components render
 * with the `.ph` (amber, dashed underline) style via <Rich>.
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

export type Status = 'published' | 'ongoing' | 'exploratory';

export interface NavItem {
  id: string;
  n: string;
  label: string;
}

export interface Link {
  label: Rich;
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

export interface LedgerEntry {
  status: Status;
  title: Rich;
  description: Rich;
  meta: Rich;
  href: string;
}

export interface ProjectItem {
  code: string;
  status: Status;
  title: Rich;
  problem: Rich;
  approach: Rich;
  tags: Rich[];
  links: Link[];
  figure: 'p1' | 'p2' | 'p3';
  figureAriaLabel: string;
  figureCaption: string;
  figureNote: Rich;
  flip?: boolean;
}

export interface MethodStep {
  code: string;
  title: string;
  body: string;
}

export interface ContactRow {
  label: string;
  value: Rich;
  href: string;
  icon: '↗' | '→' | '↓';
}

export const content = {
  meta: {
    title: 'Jeff — research portfolio',
    description:
      'Jeff — student researcher at RVCE Bengaluru working on quantization, spiking networks and distillation for efficient, resource-constrained machine learning.',
  },

  nav: {
    logoName: ['Jeff ', ph('[Surname]')] as Rich,
    items: [
      { id: 'research', n: '01', label: 'Research' },
      { id: 'publications', n: '02', label: 'Publications' },
      { id: 'projects', n: '03', label: 'Projects' },
      { id: 'cv', n: '05', label: 'CV' },
      { id: 'contact', n: '06', label: 'Contact' },
    ] as NavItem[],
  },

  hero: {
    status: {
      role: 'Student researcher',
      org: 'RVCE Bengaluru',
      cohort: 'Class of 2027',
    },
    headlineLines: ['How little', 'precision can', 'a network', 'afford'],
    headlineAccent: '?',
    lead: 'I study what is lost, and what survives, when neural networks are made small: low-bit quantization, spiking computation and distillation, under the compute limits that real deployment imposes.',
    ctas: [
      { label: 'Research', href: '#research', variant: 'primary', icon: '→' },
      { label: 'Publications', href: '#publications', variant: 'ghost' },
      { label: 'GitHub', href: '#contact', variant: 'ghost', icon: '↗' },
    ] as { label: string; href: string; variant: 'primary' | 'ghost'; icon?: string }[],
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
    eyebrow: '01 — Research direction',
    heading: 'One question, approached from three directions.',
    intro: "Each thread asks which parts of a model's precision, activity and capacity are actually load-bearing, and what breaks first when they are removed.",
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
    eyebrow: '02 — Publications & ongoing work',
    heading: 'Published, ongoing and exploratory work, kept visibly apart.',
    statusKey: [
      { status: 'published' as Status, note: 'peer-reviewed, citable' },
      { status: 'ongoing' as Status, note: 'active, not yet reported' },
      { status: 'exploratory' as Status, note: 'early, may not continue' },
    ],
    featured: {
      status: 'published' as Status,
      venue: ['IEEE conference · ', ph('[Conference name, Year]')] as Rich,
      title: [ph('[Verified paper title]')] as Rich,
      authors: [
        'Authors: ',
        ph('[confirm order]'),
        ' Maurya Pradeep Gowda, Ronan Lobo, Jeff ',
        ph('[Surname]'),
      ] as Rich,
      abstract: [
        'Topic on record: routing incoming queries between large language models using a fine-tuned DistilBERT classifier. ',
        ph(
          '[Two to three sentence abstract summary: problem, method, headline result with its numbers, once verified.]'
        ),
      ] as Rich,
      links: [
        { label: ['Paper ', ph('[DOI / IEEE Xplore]'), ' ↗'] as Rich, href: '#publications' },
        { label: ['Code ', ph('[GitHub repo]'), ' ↗'] as Rich, href: '#projects' },
        { label: ['BibTeX'] as Rich, href: '#publications' },
      ] as Link[],
      evidenceLabel: 'Evidence slot · placeholder',
      evidenceSwipeHint: 'swipe →',
      table: {
        headers: ['Method', 'Acc.', 'Params', 'Latency'],
        rows: [
          [[ph('[Baseline]')] as Rich, '—', '—', '—'],
          [[ph('[Router]')] as Rich, '—', '—', '—'],
        ],
      },
      plotAriaLabel: 'Empty accuracy versus model size plot, placeholder',
      plotPlaceholderText: '[plot goes here]',
      plotCaption: 'Fig. 1 · accuracy vs. model size · no values shown',
    },
    ledgerLabel: 'Research ledger',
    ledger: [
      {
        status: 'ongoing',
        title: ['Contradictions in vision-model quantization'] as Rich,
        description: [
          'Mining conflicting published claims on PTQ and QAT; the research question is to emerge from one that survives scrutiny.',
        ] as Rich,
        meta: ['Student team · Colab-class compute', ' · Target: ', ph('[journal / venue]')] as Rich,
        href: '#projects',
      },
      {
        status: 'exploratory',
        title: [ph('[Spiking-network experiment title]')] as Rich,
        description: [
          ph('[One line: the question and the setup. Remove this entry if it is not yet real work.]'),
        ] as Rich,
        meta: ['Started ', ph('[month year]'), ' · Code ', ph('[repo]')] as Rich,
        href: '#projects',
      },
      {
        status: 'exploratory',
        title: [ph('[Distillation experiment title]')] as Rich,
        description: [
          ph('[One line: teacher, student, constraint. Remove if not yet real work.]'),
        ] as Rich,
        meta: ['Started ', ph('[month year]'), ' · Code ', ph('[repo]')] as Rich,
        href: '#projects',
      },
    ] as LedgerEntry[],
  },

  projects: {
    eyebrow: '03 — Selected projects',
    heading: 'Each project is a small research artefact.',
    items: [
      {
        code: 'P.1',
        status: 'ongoing',
        title: ['Contradiction mining in vision-model quantization'] as Rich,
        problem: [
          'Published results on quantizing vision models do not always agree. Which disagreements are real, and which come from differences in protocol?',
        ] as Rich,
        approach: [
          'Collect conflicting claims across papers, keep only contradictions that survive scrutiny, and let the research question emerge from one. Public checkpoints, PyTorch and timm, Colab-class GPUs.',
        ] as Rich,
        tags: [['PyTorch'], ['timm'], ['torchvision'], ['PTQ / QAT']] as Rich[],
        links: [
          { label: ['Code ', ph('[repo]'), ' ↗'] as Rich, href: '#projects' },
          { label: ['Notes ', ph('[doc]'), ' ↗'] as Rich, href: '#projects' },
        ],
        figure: 'p1',
        figureAriaLabel:
          'Schematic: two accuracy-versus-bit-width curves agree at high precision and diverge at low bit-widths, leaving an unexplained gap',
        figureCaption: 'Fig. P.1 · conflicting claims',
        figureNote: ['schematic · not data'] as Rich,
      },
      {
        code: 'P.2',
        status: 'exploratory',
        title: [ph('[SNN project title]')] as Rich,
        problem: [ph('[One sentence: the question you are investigating in spiking networks.]')] as Rich,
        approach: [ph('[Two sentences: model, training method, what is measured.]')] as Rich,
        tags: [[ph('[framework]')], [ph('[dataset]')]] as Rich[],
        links: [
          { label: ['Code ', ph('[repo]'), ' ↗'] as Rich, href: '#projects' },
          { label: ['Write-up ', ph('[doc]'), ' ↗'] as Rich, href: '#projects' },
        ],
        figure: 'p2',
        figureAriaLabel:
          'Schematic: a dense activation grid, fully active, beside an event-driven grid where only a few cells fire',
        figureCaption: 'Fig. P.2 · dense vs. event-driven',
        figureNote: ['schematic · not data'] as Rich,
        flip: true,
      },
      {
        code: 'P.3',
        status: 'published',
        title: ['LLM query routing with a DistilBERT classifier'] as Rich,
        problem: [
          'Not every query needs the largest model. Can a small classifier decide, quickly and cheaply, where each query should go?',
        ] as Rich,
        approach: [
          'A fine-tuned DistilBERT classifier routes incoming queries between language models. Evaluated against ',
          ph('[baselines]'),
          ' on ',
          ph('[dataset / metric]'),
          '.',
        ] as Rich,
        tags: [['DistilBERT'], ['text classification'], ['LLM routing']] as Rich[],
        links: [
          { label: ['Paper ↗'] as Rich, href: '#publications' },
          { label: ['Code ', ph('[repo]'), ' ↗'] as Rich, href: '#projects' },
        ],
        figure: 'p3',
        figureAriaLabel: 'Diagram: a query passes through a fine-tuned DistilBERT classifier to one of two models',
        figureCaption: 'Fig. P.3 · routing pipeline',
        figureNote: ['proposed diagram · confirm against paper'] as Rich,
      },
    ] as ProjectItem[],
  },

  method: {
    eyebrow: '04 — Method',
    heading: 'Evidence before claims.',
    intro:
      'Accuracy alone is a thin result. I try to report what changed, by how much, across how many runs, and where the method fails.',
    steps: [
      { code: 'M.1', title: 'Hypothesis', body: 'A falsifiable statement of what should change, and by how much.' },
      {
        code: 'M.2',
        title: 'Controlled setup',
        body: 'One variable at a time. Fixed seeds, public checkpoints, stated compute limits.',
      },
      { code: 'M.3', title: 'Quantitative evaluation', body: 'Accuracy against size and latency, with variance across runs.' },
      { code: 'M.4', title: 'Failure analysis', body: 'Which inputs, layers or settings break, and why, not only how often.' },
      {
        code: 'M.5',
        title: 'Reproducible release',
        body: 'Code, configs and logs sufficient to regenerate each table.',
      },
    ] as MethodStep[],
    repoIntro:
      'What a finished experiment should leave behind, as a repository layout I intend to hold my own work to:',
    repoTree: [
      { name: 'results/', comment: null },
      { name: 'config.yaml', comment: 'every hyperparameter' },
      { name: 'seeds.txt', comment: 'runs reported, not best-of' },
      { name: 'table_1.csv', comment: 'raw numbers behind each figure' },
      { name: 'failures.md', comment: 'cases the method gets wrong' },
    ],
    repoNote: 'Proposed structure · not yet a published repo',
  },

  cv: {
    eyebrow: '05 — Curriculum vitae',
    statement: 'B.E. Computer Science & Engineering, RV College of Engineering, Bengaluru. Expected 2027.',
    button: {
      label: 'Download CV',
      sub: [ph('[PDF · updated date]')] as Rich,
      href: '#cv',
    },
  },

  contact: {
    eyebrow: '06 — Contact',
    heading: 'If this overlaps with what you work on, I would like to compare notes.',
    lead: 'I am looking for research collaboration in efficient and resource-constrained machine learning, and happy to share code, logs and open questions.',
    rows: [
      { label: 'GitHub', value: ['github.com/jeffreymariaraj'] as Rich, href: 'https://github.com/jeffreymariaraj', icon: '↗' },
      { label: 'LinkedIn', value: ['linkedin.com/in/', ph('[username]')] as Rich, href: '#contact', icon: '↗' },
      { label: 'Email', value: [ph('[email address]')] as Rich, href: '#contact', icon: '→' },
      { label: 'CV', value: ['Download as PDF'] as Rich, href: '#cv', icon: '↓' },
    ] as (Omit<ContactRow, 'value'> & { value: Rich })[],
  },

  footer: {
    copyright: ['© 2026 Jeff ', ph('[Surname]'), ' · RVCE Bengaluru'] as Rich,
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
