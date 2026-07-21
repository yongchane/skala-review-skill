import fs from 'node:fs';

const notePath = process.argv[2];

if (!notePath) {
  console.error('Usage: node validate-note.mjs <note-path>');
  process.exit(1);
}

const text = fs.readFileSync(notePath, 'utf8');
const required = [
  ['frontmatter', text.startsWith('---\n')],
  ['title', /^title:\s*.+$/m.test(text)],
  ['date', /^date:\s*\d{4}-\d{2}-\d{2}$/m.test(text)],
  ['profile', /^profile:\s*(concept-review|lecture-recap|practice-log|comparison-note|troubleshooting-note)$/m.test(text)],
  ['heading', /^#\s+.+$/m.test(text)]
];

const failed = required.filter(([, passed]) => !passed).map(([name]) => name);

if (failed.length > 0) {
  console.error(`Invalid note: missing or invalid ${failed.join(', ')}`);
  process.exit(1);
}

console.log(`Valid review note: ${notePath}`);

