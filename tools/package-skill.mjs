import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const core = path.join(repositoryRoot, 'core');
const codexTarget = path.join(repositoryRoot, 'plugins', 'skala-review', 'skills', 'skala-review');
const claudeTarget = path.join(repositoryRoot, 'platforms', 'claude-code', 'skala-review');
const targets = [codexTarget, claudeTarget];
const webCore = path.join(core, 'web');
const webTarget = path.join(repositoryRoot, 'platforms', 'web');
const webKnowledgeTarget = path.join(webTarget, 'knowledge');
const webBundleTarget = path.join(webTarget, 'SKALA-REVIEW-WEB-BUNDLE.md');

const webBundleSources = [
  ['복습 실행 하네스', path.join(core, 'web', 'web-instructions.md')],
  ['SKALA 교육 과정 연결 기준', path.join(core, 'references', 'skala-curriculum-map.md')],
  ['내용 유형 선택 기준', path.join(core, 'references', 'content-profiles.md')],
  ['플랫폼별 출력 기준', path.join(core, 'references', 'output-profiles.md')],
  ['보관용 노트 형식', path.join(core, 'references', 'note-schema.md')],
  ...fs.readdirSync(path.join(core, 'templates'))
    .filter((name) => name.endsWith('.md'))
    .sort()
    .map((name) => [`보고서 구조 예시: ${name}`, path.join(core, 'templates', name)])
];

function digest(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function demoteHeadings(markdown) {
  return markdown.replace(/^(#{1,5}) /gm, '##$1 ');
}

for (const target of targets) {
  for (const directory of ['references', 'templates', 'scripts']) {
    const source = path.join(core, directory);
    const destination = path.join(target, directory);
    fs.rmSync(destination, { recursive: true, force: true });
    fs.cpSync(source, destination, { recursive: true });
  }
}

fs.copyFileSync(path.join(repositoryRoot, 'platforms', 'codex', 'SKILL.md'), path.join(codexTarget, 'SKILL.md'));
fs.cpSync(
  path.join(repositoryRoot, 'platforms', 'codex', 'agents'),
  path.join(codexTarget, 'agents'),
  { recursive: true, force: true }
);

fs.copyFileSync(
  path.join(webCore, 'web-instructions.md'),
  path.join(webTarget, 'SKALA-REVIEW-WEB-INSTRUCTIONS.md')
);

fs.rmSync(webKnowledgeTarget, { recursive: true, force: true });
fs.mkdirSync(webKnowledgeTarget, { recursive: true });
for (const name of ['skala-curriculum-map.md', 'output-profiles.md', 'note-schema.md']) {
  fs.copyFileSync(path.join(core, 'references', name), path.join(webKnowledgeTarget, name));
}

const webBundle = [
  '# SKALA 웹 복습 실행 번들',
  '',
  '> 이 파일은 ChatGPT·Gemini·Claude 웹에서 별도 설치 없이 현재 대화에 적용하는 자기완결형 복습 하네스입니다.',
  '',
  '## 웹 AI 실행 계약',
  '',
  '- 사용자가 이 저장소 링크와 함께 `진행해`, `실행해`, `복습 시작`처럼 요청했다면 이 번들 적용에 동의한 것으로 본다.',
  '- 로컬 Skill 설치 가능 여부, 코드 리뷰 절차 또는 저장소 구조를 설명하지 않는다.',
  '- 이 파일의 지침을 현재 대화의 작업 규칙으로 적용하고 바로 복습 흐름을 시작한다.',
  '- 사용자가 학습 내용도 함께 보냈다면 첫 질문을 반복하지 말고 해당 내용을 확인한 뒤 진행 방식부터 묻는다.',
  '- 저장소 파일을 읽지 못한 부분은 추측하지 않는다. 이 번들 자체로 복습과 플랫폼별 초안 작성을 끝낸다.',
  '',
  ...webBundleSources.flatMap(([title, sourcePath]) => {
    const content = fs.readFileSync(sourcePath, 'utf8').trim();
    const relativeSource = path.relative(repositoryRoot, sourcePath);
    return [
      `## ${title}`,
      '',
      `<!-- source: ${relativeSource} sha256: ${digest(content)} -->`,
      '',
      demoteHeadings(content),
      ''
    ];
  })
].join('\n');

fs.writeFileSync(webBundleTarget, `${webBundle.trim()}\n`);

console.log(`${targets.length}개 에이전트 배포본과 자기완결형 웹 번들을 패키징했습니다.`);
