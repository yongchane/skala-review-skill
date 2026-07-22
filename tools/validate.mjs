import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const core = path.join(repositoryRoot, 'core');
const codexSkill = path.join(repositoryRoot, 'plugins', 'skala-review', 'skills', 'skala-review');
const claudeSkill = path.join(repositoryRoot, 'platforms', 'claude-code', 'skala-review');
const webPlatform = path.join(repositoryRoot, 'platforms', 'web');

function required(filePath) {
  assert.ok(fs.existsSync(filePath), `필수 파일이 없습니다: ${filePath}`);
}

function hash(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

for (const filePath of [
  path.join(repositoryRoot, 'LICENSE'),
  path.join(repositoryRoot, 'CONTRIBUTING.md'),
  path.join(repositoryRoot, 'CODE_OF_CONDUCT.md'),
  path.join(repositoryRoot, 'SECURITY.md'),
  path.join(repositoryRoot, '.github', 'ISSUE_TEMPLATE', 'bug_report.yml'),
  path.join(repositoryRoot, '.github', 'ISSUE_TEMPLATE', 'feature_request.yml'),
  path.join(repositoryRoot, '.github', 'pull_request_template.md'),
  path.join(codexSkill, 'SKILL.md'),
  path.join(codexSkill, 'agents', 'openai.yaml'),
  path.join(claudeSkill, 'SKILL.md'),
  path.join(webPlatform, 'README.md'),
  path.join(webPlatform, 'SKALA-REVIEW-WEB-INSTRUCTIONS.md'),
  path.join(webPlatform, 'SKALA-REVIEW-WEB-BUNDLE.md'),
  path.join(repositoryRoot, 'plugins', 'skala-review', '.codex-plugin', 'plugin.json'),
  path.join(repositoryRoot, '.agents', 'plugins', 'marketplace.json')
]) required(filePath);

const plugin = JSON.parse(fs.readFileSync(path.join(repositoryRoot, 'plugins', 'skala-review', '.codex-plugin', 'plugin.json')));
assert.equal(plugin.name, 'skala-review');
assert.equal(plugin.skills, './skills/');
assert.match(plugin.version, /^\d+\.\d+\.\d+/);
assert.ok(plugin.interface.defaultPrompt.length <= 3, '기본 시작 문구는 최대 3개여야 합니다.');

const marketplace = JSON.parse(fs.readFileSync(path.join(repositoryRoot, '.agents', 'plugins', 'marketplace.json')));
assert.ok(marketplace.plugins.some((entry) => entry.name === 'skala-review'));

for (const directory of ['references', 'templates', 'scripts']) {
  for (const name of fs.readdirSync(path.join(core, directory))) {
    const source = path.join(core, directory, name);
    for (const target of [codexSkill, claudeSkill]) {
      const output = path.join(target, directory, name);
      required(output);
      assert.equal(hash(source), hash(output), `배포본과 동기화되지 않은 자료입니다: ${output}`);
    }
  }
}

assert.equal(
  hash(path.join(core, 'web', 'web-instructions.md')),
  hash(path.join(webPlatform, 'SKALA-REVIEW-WEB-INSTRUCTIONS.md')),
  '웹 공통 지침 배포본이 원본과 동기화되지 않았습니다.'
);

for (const name of ['skala-curriculum-map.md', 'output-profiles.md', 'note-schema.md']) {
  const output = path.join(webPlatform, 'knowledge', name);
  required(output);
  assert.equal(
    hash(path.join(core, 'references', name)),
    hash(output),
    `웹 지식 파일이 원본과 동기화되지 않았습니다: ${output}`
  );
}

const webInstructions = fs.readFileSync(path.join(webPlatform, 'SKALA-REVIEW-WEB-INSTRUCTIONS.md'), 'utf8');
for (const requiredRule of [
  '질문은 반드시 한 번에 하나씩 묻고',
  '다른 대화나 기기의 파일을 기억한다고 말하지 않는다.',
  'Markdown 보관본도 만들어드릴까요?',
  '이전 노트가 입력되면 전체 설명을 바로 보여주지 않는다.',
  '외부 플랫폼에 로그인하거나 게시했다고 말하지 않는다.'
]) assert.ok(webInstructions.includes(requiredRule), `웹 필수 진행 규칙이 없습니다: ${requiredRule}`);

const webBundle = fs.readFileSync(path.join(webPlatform, 'SKALA-REVIEW-WEB-BUNDLE.md'), 'utf8');
for (const requiredBundleRule of [
  '## 웹 AI 실행 계약',
  '로컬 Skill 설치 가능 여부, 코드 리뷰 절차 또는 저장소 구조를 설명하지 않는다.',
  '바로 복습 흐름을 시작한다.',
  '## 복습 실행 하네스',
  '## SKALA 교육 과정 연결 기준',
  '## 내용 유형 선택 기준',
  '## 플랫폼별 출력 기준',
  '## 보관용 노트 형식',
  '보고서 구조 예시: concept-review.md',
  '보고서 구조 예시: practice-log.md'
]) assert.ok(webBundle.includes(requiredBundleRule), `웹 실행 번들에 필수 내용이 없습니다: ${requiredBundleRule}`);

for (const sourcePath of [
  path.join(core, 'web', 'web-instructions.md'),
  path.join(core, 'references', 'skala-curriculum-map.md'),
  path.join(core, 'references', 'content-profiles.md'),
  path.join(core, 'references', 'output-profiles.md'),
  path.join(core, 'references', 'note-schema.md'),
  ...fs.readdirSync(path.join(core, 'templates'))
    .filter((name) => name.endsWith('.md'))
    .sort()
    .map((name) => path.join(core, 'templates', name))
]) {
  const content = fs.readFileSync(sourcePath, 'utf8').trim();
  const marker = `<!-- source: ${path.relative(repositoryRoot, sourcePath)} sha256: ${crypto.createHash('sha256').update(content).digest('hex')} -->`;
  assert.ok(webBundle.includes(marker), `웹 실행 번들이 원본과 동기화되지 않았습니다: ${sourcePath}`);
}

const webGuide = fs.readFileSync(path.join(webPlatform, 'README.md'), 'utf8');
for (const platform of ['ChatGPT 웹', 'Gemini 웹', 'Claude 웹']) {
  assert.ok(webGuide.includes(platform), `웹 사용 안내에 플랫폼이 없습니다: ${platform}`);
}
for (const requiredScopeGuide of [
  '가장 쉬운 시작 방법',
  'https://github.com/yongchane/skala-review-skill/blob/main/platforms/web/SKALA-REVIEW-WEB-BUNDLE.md',
  'SKALA 복습 시작해줘',
  'SKALA-REVIEW-WEB-BUNDLE.md',
  '링크 내용을 읽지 못했다면',
  '파일 전체를 복사하거나 `.md` 파일로 내려받습니다.',
  '첨부하거나 붙여 넣은 SKALA 웹 실행 번들을 이 대화에 적용해줘.',
  '지침을 요약하거나 설명하지 말고 바로 SKALA 복습을 시작해줘.',
  '오늘 무엇을 배웠나요?',
  '일반 채팅에 지침 전체 전달',
  '현재 채팅에서만 적용',
  '해당 Project 안의 채팅',
  '로컬에서 제거하기 전까지 재사용',
  '자동으로 바뀌지 않습니다'
]) assert.ok(webGuide.includes(requiredScopeGuide), `웹 사용 안내에 적용 범위 설명이 없습니다: ${requiredScopeGuide}`);

const readme = fs.readFileSync(path.join(repositoryRoot, 'README.md'), 'utf8');
for (const requiredGuide of [
  'platforms/web/README.md',
  'platforms/web/SKALA-REVIEW-WEB-INSTRUCTIONS.md',
  'ChatGPT 웹',
  'Gemini 웹',
  'Claude 웹',
  '## AI 실행 라우터',
  '## 웹에서 가장 쉽게 시작하기',
  'https://github.com/yongchane/skala-review-skill/blob/main/platforms/web/SKALA-REVIEW-WEB-BUNDLE.md',
  'SKALA 복습 시작해줘',
  'https://github.com/yongchane/skala-review-skill/blob/main/README.md',
  '저장소를 추측하거나 코드 리뷰 설명을 하지 마.',
  '웹 AI는 로컬 Skill 설치를 시도하거나 코드 리뷰 도구로 추측하지 않는다.',
  'platforms/web/SKALA-REVIEW-WEB-BUNDLE.md',
  'README를 읽을 수 없는 웹 대화에서는',
  'plugins/skala-review/skills/skala-review 해당 스킬 설치해줘',
  'platforms/claude-code/skala-review 폴더를 ~/.claude/skills/skala-review에 설치해줘.',
  '현재 개발 환경에는 Claude Code 실행 파일이 없어 실제 계정 세션 테스트는 수행하지 못했습니다.',
  '파일 전체를 복사해 붙여 넣거나 `.md` 파일로 첨부',
  '첨부하거나 붙여 넣은 SKALA 웹 실행 번들을 이 대화에 적용해줘.',
  '지침을 요약하거나 설명하지 말고 바로 SKALA 복습을 시작해줘.',
  '오늘 무엇을 배웠나요?',
  '일반 채팅에 지침 전체 전달',
  '현재 채팅에서만 적용',
  '해당 Project 안의 채팅',
  '로컬에서 제거하기 전까지 재사용',
  '자동으로 바뀌지는 않습니다'
]) assert.ok(readme.includes(requiredGuide), `README에 웹 사용 안내가 없습니다: ${requiredGuide}`);

const contributing = fs.readFileSync(path.join(repositoryRoot, 'CONTRIBUTING.md'), 'utf8');
for (const requiredContributionRule of [
  'core/web/web-instructions.md',
  '## Pull Request 작성 방법',
  '### 변경 내용',
  '### 변경 이유',
  '### 확인 방법'
]) assert.ok(
  contributing.includes(requiredContributionRule),
  `기여 가이드에 필수 안내가 없습니다: ${requiredContributionRule}`
);

const codexText = fs.readFileSync(path.join(codexSkill, 'SKILL.md'), 'utf8');
const claudeText = fs.readFileSync(path.join(claudeSkill, 'SKILL.md'), 'utf8');
assert.match(codexText, /^---\nname: skala-review\ndescription: .+\n---/);
assert.match(claudeText, /^---\nname: skala-review\ndescription: .+\ndisable-model-invocation: true\n---/);

const workflow = fs.readFileSync(path.join(core, 'references', 'workflow.md'), 'utf8');
for (const requiredRule of [
  '저장 여부는 복습의 선행 조건이 아니다',
  '첫 안내에서 `SKALA-Review/`, 설정, 알림을 묻지 않는다.',
  '자료 입력과 진행 방식 선택',
  'PDF와 제한 자료 안내',
  '`저장 없이 진행`은 저장 선호일 뿐',
  '초안 전환과 수정',
  '로컬 저장을 선택하지 않았더라도 복사 가능한 결과는 반드시 제공한다.',
  '다시 사용할 Markdown 노트 저장',
  '아직 전체 노트를 보여주지 않는다.',
  'AI가 로컬 노트를 기억한다고 표현하지 않는다.',
  '반드시 한 번에 하나씩 묻는다.',
  '채점하거나 사용자를 나무라지 않는다.'
]) assert.ok(workflow.includes(requiredRule), `필수 진행 규칙이 없습니다: ${requiredRule}`);

for (const text of [codexText, claudeText]) {
  assert.ok(text.includes('답변하기 전에 `references/workflow.md`를 읽고'));
  assert.ok(text.includes('첫 안내에서 복습 노트 저장 위치를 선택하게 하지 않는다'));
  assert.ok(text.includes('복습을 요약으로 끝내지 말고 플랫폼 초안 전환 단계로 이어간다'));
  assert.ok(text.includes('비전공자도 이해할 수 있는 쉬운 한국어'));
}

const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'skala-review-'));
execFileSync('node', [path.join(core, 'scripts', 'init-workspace.mjs'), temporaryRoot], { stdio: 'pipe' });
const notesDirectory = path.join(temporaryRoot, 'SKALA-Review', 'notes');
const fixture = path.join(repositoryRoot, 'tests', 'fixtures', 'transformer-review.md');
fs.copyFileSync(fixture, path.join(notesDirectory, '2026-07-21_transformer-review.md'));
execFileSync('node', [path.join(core, 'scripts', 'validate-note.mjs'), fixture], { stdio: 'pipe' });
const listed = JSON.parse(execFileSync('node', [path.join(core, 'scripts', 'list-notes.mjs'), notesDirectory], { encoding: 'utf8' }));
assert.equal(listed.length, 1);
assert.equal(listed[0].title, 'Transformer의 Q, K, V 다시 보기');
assert.deepEqual(listed[0].keywords, ['transformer', 'attention', 'qkv']);
const searched = JSON.parse(execFileSync('node', [path.join(core, 'scripts', 'list-notes.mjs'), notesDirectory, 'attention'], { encoding: 'utf8' }));
assert.equal(searched.length, 1);
const missing = JSON.parse(execFileSync('node', [path.join(core, 'scripts', 'list-notes.mjs'), notesDirectory, 'regression'], { encoding: 'utf8' }));
assert.equal(missing.length, 0);
fs.rmSync(temporaryRoot, { recursive: true, force: true });

console.log('검증 통과: 플러그인, 에이전트·웹 배포본, 노트 스크립트가 일치합니다.');
