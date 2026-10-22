#!/usr/bin/env node
/**
 * Lists every remaining placeholder in src/content/content.ts so the
 * site owner knows what is still unverified before launch.
 *
 * This script never fails the build (CLAUDE.md requirement) — it only
 * reports. Run with `npm run check:placeholders`.
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentPath = path.join(__dirname, '..', 'src', 'content', 'content.ts');

if (!existsSync(contentPath)) {
  console.log('src/content/content.ts not found yet — nothing to check.');
  process.exit(0);
}

const src = readFileSync(contentPath, 'utf8');
const lines = src.split('\n');

// Track a breadcrumb path of object/array keys by brace depth so each
// placeholder can be reported with rough context, e.g. "hero.status".
const pathStack = [];
const keyAtDepth = new Map();
let depth = 0;

/** @type {{ line: number, path: string, text: string }[]} */
const found = [];

const phCallRe = /\bph\(\s*(['"`])((?:(?!\1).)*)\1/g;
const keyBeforeBraceRe = /([A-Za-z_$][\w$]*)\s*:\s*[[{]\s*$/;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Record a key just before it opens a new object/array literal.
  const keyMatch = line.match(keyBeforeBraceRe);
  if (keyMatch) {
    keyAtDepth.set(depth + 1, keyMatch[1]);
  }

  // Find every ph('...') / ph("...") call on this line.
  let m;
  phCallRe.lastIndex = 0;
  while ((m = phCallRe.exec(line))) {
    const contextPath = pathStack.join('.') || '(root)';
    found.push({ line: i + 1, path: contextPath, text: m[2] });
  }

  // Update depth + path stack for every brace/bracket on the line, in order.
  for (const ch of line) {
    if (ch === '{' || ch === '[') {
      depth++;
      const key = keyAtDepth.get(depth);
      pathStack.push(key ?? '[]');
    } else if (ch === '}' || ch === ']') {
      pathStack.pop();
      keyAtDepth.delete(depth);
      depth = Math.max(0, depth - 1);
    }
  }
}

if (found.length === 0) {
  console.log('No placeholders found. The site is ready for launch content-wise.');
  process.exit(0);
}

console.log(`${found.length} placeholder${found.length === 1 ? '' : 's'} remaining in content.ts:\n`);
for (const f of found) {
  console.log(`  content.ts:${f.line}  [${f.path}]  ${f.text}`);
}
console.log('\nEdit these in src/content/content.ts, then re-run this script until it reports none.');
process.exit(0);
