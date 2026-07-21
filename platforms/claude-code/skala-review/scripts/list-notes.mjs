import fs from 'node:fs';
import path from 'node:path';

const notesDirectory = process.argv[2];

if (!notesDirectory) {
  console.error('Usage: node list-notes.mjs <notes-directory>');
  process.exit(1);
}

if (!fs.existsSync(notesDirectory)) {
  console.log('[]');
  process.exit(0);
}

const notes = fs.readdirSync(notesDirectory)
  .filter((name) => name.endsWith('.md'))
  .map((name) => {
    const filePath = path.join(notesDirectory, name);
    const text = fs.readFileSync(filePath, 'utf8');
    const title = text.match(/^#\s+(.+)$/m)?.[1] ?? path.basename(name, '.md');
    const date = text.match(/^date:\s*([^\n]+)$/m)?.[1] ?? name.slice(0, 10);
    return { name, title, date, filePath };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

console.log(JSON.stringify(notes, null, 2));

