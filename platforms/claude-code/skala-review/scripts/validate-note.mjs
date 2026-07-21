import fs from 'node:fs';

const notePath = process.argv[2];

if (!notePath) {
  console.error('사용법: node validate-note.mjs <노트-경로>');
  process.exit(1);
}

const text = fs.readFileSync(notePath, 'utf8');
const required = [
  ['frontmatter 영역', text.startsWith('---\n')],
  ['제목', /^title:\s*.+$/m.test(text)],
  ['날짜', /^date:\s*\d{4}-\d{2}-\d{2}$/m.test(text)],
  ['노트 유형', /^profile:\s*(concept-review|lecture-recap|practice-log|comparison-note|troubleshooting-note)$/m.test(text)],
  ['키워드', /^keywords:\s*\[(?=[^\]\n]*[^\s\]])[^\]\n]+\]$/m.test(text)],
  ['복습 상태', /^status:\s*reviewed$/m.test(text)],
  ['본문 제목', /^#\s+.+$/m.test(text)]
];

const failed = required.filter(([, passed]) => !passed).map(([name]) => name);

if (failed.length > 0) {
  console.error(`노트 형식 오류: 누락되었거나 잘못된 항목 ${failed.join(', ')}`);
  process.exit(1);
}

console.log(`유효한 복습 노트: ${notePath}`);
