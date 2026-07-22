import fs from 'node:fs';
import path from 'node:path';

const notesDirectory = process.argv[2];
const query = process.argv.slice(3).join(' ').trim().toLowerCase();

if (!notesDirectory) {
  console.error('사용법: node list-notes.mjs <노트-폴더> [날짜, 제목 또는 키워드]');
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
    const profile = text.match(/^profile:\s*([^\n]+)$/m)?.[1]?.trim() ?? null;
    const rawKeywords = text.match(/^keywords:\s*\[([^\]]*)\]/m)?.[1] ?? '';
    const keywords = rawKeywords
      .split(',')
      .map((keyword) => keyword.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
    const searchableText = `${name}\n${title}\n${date}\n${keywords.join(' ')}\n${text}`.toLowerCase();
    return { name, title, date, profile, keywords, filePath, searchableText };
  })
  .filter((note) => !query || note.searchableText.includes(query))
  .map(({ searchableText, ...note }) => note)
  .sort((a, b) => b.date.localeCompare(a.date));

console.log(JSON.stringify(notes, null, 2));
