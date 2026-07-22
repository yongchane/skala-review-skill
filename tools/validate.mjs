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
const webPrompts = path.join(repositoryRoot, 'web-prompts');

function required(filePath) {
  assert.ok(fs.existsSync(filePath), `필수 파일이 없습니다: ${filePath}`);
}

function hash(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function includesAll(text, requiredTexts, label) {
  for (const requiredText of requiredTexts) {
    assert.ok(text.includes(requiredText), `${label}에 필수 내용이 없습니다: ${requiredText}`);
  }
}

for (const filePath of [
  path.join(repositoryRoot, 'LICENSE'),
  path.join(repositoryRoot, 'README.md'),
  path.join(repositoryRoot, 'CONTRIBUTING.md'),
  path.join(repositoryRoot, 'CODE_OF_CONDUCT.md'),
  path.join(repositoryRoot, 'SECURITY.md'),
  path.join(repositoryRoot, '.github', 'ISSUE_TEMPLATE', 'bug_report.yml'),
  path.join(repositoryRoot, '.github', 'ISSUE_TEMPLATE', 'feature_request.yml'),
  path.join(repositoryRoot, '.github', 'pull_request_template.md'),
  path.join(codexSkill, 'SKILL.md'),
  path.join(codexSkill, 'agents', 'openai.yaml'),
  path.join(claudeSkill, 'SKILL.md'),
  path.join(webPrompts, 'README.md'),
  path.join(webPrompts, 'skala-review-prompt.md'),
  path.join(webPrompts, 'skala-quick-draft-prompt.md'),
  path.join(repositoryRoot, 'plugins', 'skala-review', '.codex-plugin', 'plugin.json'),
  path.join(repositoryRoot, '.agents', 'plugins', 'marketplace.json')
]) required(filePath);

assert.ok(!fs.existsSync(path.join(repositoryRoot, 'platforms', 'web')), '이전 웹 라우터 배포본이 남아 있습니다.');
assert.ok(!fs.existsSync(path.join(core, 'web')), '이전 웹 실행 번들 원본이 남아 있습니다.');

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

const codexText = fs.readFileSync(path.join(codexSkill, 'SKILL.md'), 'utf8');
const claudeText = fs.readFileSync(path.join(claudeSkill, 'SKILL.md'), 'utf8');
assert.match(codexText, /^---\nname: skala-review\ndescription: .+\n---/);
assert.match(claudeText, /^---\nname: skala-review\ndescription: .+\ndisable-model-invocation: true\n---/);

for (const text of [codexText, claudeText]) {
  includesAll(text, [
    '답변하기 전에 `references/workflow.md`를 읽고',
    '새 대화에서 처음 실행할 때만 `SKALA 복습 도우미 안내`',
    '질문 복습, 복습 글·보고서 작성, 빠른 요약',
    '추천 구조, 작성 방법, 짧은 초안',
    '보고서의 수치·출처·분석 결과를 임의로 만들지 않고',
    '비전공자도 이해할 수 있는 쉬운 한국어'
  ], '에이전트 Skill');
}

const workflow = fs.readFileSync(path.join(core, 'references', 'workflow.md'), 'utf8');
includesAll(workflow, [
  '저장 여부는 복습의 선행 조건이 아니다',
  '새 대화에서 처음 실행할 때만 아래 안내를 한 번 보여준다.',
  '📌 **SKALA 복습 도우미 안내**',
  '1. **질문으로 복습하기**',
  '2. **복습 글·보고서 작성 도우미**',
  '3. **지난 학습 다시 복습하기**',
  '4. **빠르게 공부 내용 요약하기**',
  '복습 글 기본 출력',
  '실습 보고서 기본 출력',
  '빠른 공부 내용 요약',
  '`[실행 결과 입력]`, `[근거 확인 필요]`',
  '로컬 저장을 선택하지 않았더라도 복사 가능한 결과는 반드시 제공한다.',
  '아직 전체 노트를 보여주지 않는다.',
  '반드시 한 번에 하나씩 묻는다.'
], '공통 복습 흐름');

const outputProfiles = fs.readFileSync(path.join(core, 'references', 'output-profiles.md'), 'utf8');
includesAll(outputProfiles, [
  '약 700~1,200자',
  '실습 보고서 작성 도움',
  '과제 요구사항과 평가 항목 요약',
  '`[실행 결과 입력]`',
  '요청할 때만 분량을 확장'
], '출력 형식');

const reviewPrompt = fs.readFileSync(path.join(webPrompts, 'skala-review-prompt.md'), 'utf8');
const quickPrompt = fs.readFileSync(path.join(webPrompts, 'skala-quick-draft-prompt.md'), 'utf8');
for (const [name, text] of [['질문 복습 프롬프트', reviewPrompt], ['빠른 정리 프롬프트', quickPrompt]]) {
  assert.match(text, /^---\nname: .+\npurpose: .+\nrecommended-for: .+\nversion: \d+\.\d+\.\d+\nlicense: MIT\n---/);
  includesAll(text, [
    '## 개요',
    '## 사용 방법',
    '## 복사할 프롬프트',
    '이 대화에서 처음 실행할 때만',
    '배포가 제한된 강의 자료 전체보다는',
    '복습 글',
    '실습 보고서',
    '`[실행 결과 입력]`',
    '외부 플랫폼'
  ], name);
}
includesAll(reviewPrompt, [
  '질문은 반드시 한 번에 하나씩',
  '3. 지난 학습 다시 복습하기',
  '사용자가 보관한 Markdown을 첨부하거나 붙여 넣게 한다.'
], '질문 복습 프롬프트');
includesAll(quickPrompt, [
  '질문식 복습 없이',
  '1. 빠른 핵심 요약',
  '3. 실습 보고서 작성 도움'
], '빠른 정리 프롬프트');

const webGuide = fs.readFileSync(path.join(webPrompts, 'README.md'), 'utf8');
includesAll(webGuide, [
  'GitHub 링크만 AI에 전달하지 말고',
  '질문 복습 프롬프트',
  '빠른 정리·작성 프롬프트',
  '수정하고 기여하기',
  'MIT 라이선스'
], '웹 프롬프트 안내');

const readme = fs.readFileSync(path.join(repositoryRoot, 'README.md'), 'utf8');
includesAll(readme, [
  'Codex·Claude Code 사용자',
  'ChatGPT·Gemini·Claude 웹 사용자',
  'web-prompts/README.md',
  '링크만 전달해 실행시키지 않고',
  '질문으로 복습하기',
  '복습 글·보고서 작성 도우미',
  '지난 학습 다시 복습하기',
  '빠르게 공부 내용 요약하기',
  '약 700~1,200자',
  '웹 프롬프트는 `web-prompts/`에서 직접 관리합니다.'
], 'README');
assert.ok(!readme.includes('## AI 실행 라우터'), 'README에 이전 AI 실행 라우터가 남아 있습니다.');

const contributing = fs.readFileSync(path.join(repositoryRoot, 'CONTRIBUTING.md'), 'utf8');
includesAll(contributing, [
  '## 웹 프롬프트 기여 방법',
  'web-prompts/skala-review-prompt.md',
  'web-prompts/skala-quick-draft-prompt.md',
  '실제 강의 원문 대신 직접 만든 짧은 가상 입력',
  '## Pull Request 작성 방법'
], '기여 가이드');

const pullRequestTemplate = fs.readFileSync(path.join(repositoryRoot, '.github', 'pull_request_template.md'), 'utf8');
includesAll(pullRequestTemplate, [
  '## 웹 프롬프트 변경',
  '확인한 웹 AI',
  '사용한 가상 입력과 확인 결과',
  '제공되지 않은 수치·출처·분석 결과'
], 'Pull Request 양식');

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

console.log('검증 통과: 에이전트 Skill, 웹 프롬프트, 문서와 노트 스크립트가 일치합니다.');
