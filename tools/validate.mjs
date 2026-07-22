import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const core = path.join(repositoryRoot, 'core');
const codexStandaloneSkill = path.join(repositoryRoot, 'platforms', 'codex', 'skala-review');
const codexPluginSkill = path.join(repositoryRoot, 'plugins', 'skala-review', 'skills', 'skala-review');
const claudeSkill = path.join(repositoryRoot, 'platforms', 'claude-code', 'skala-review');
const claudeUpdateSkill = path.join(repositoryRoot, 'platforms', 'claude-code', 'skala-review-update');
const claudeProjectUpdateSkill = path.join(repositoryRoot, '.claude', 'skills', 'skala-review-update');
const webPrompts = path.join(repositoryRoot, 'web-prompts');
const versionFile = path.join(repositoryRoot, 'VERSION');
const claudeInstallScript = path.join(repositoryRoot, 'tools', 'install-claude-code.sh');
const claudeUpdateScript = path.join(repositoryRoot, 'tools', 'update-claude-code.sh');
const releaseWorkflow = path.join(repositoryRoot, '.github', 'workflows', 'release.yml');

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
  versionFile,
  path.join(repositoryRoot, '.github', 'ISSUE_TEMPLATE', 'bug_report.yml'),
  path.join(repositoryRoot, '.github', 'ISSUE_TEMPLATE', 'feature_request.yml'),
  path.join(repositoryRoot, '.github', 'pull_request_template.md'),
  releaseWorkflow,
  claudeInstallScript,
  claudeUpdateScript,
  path.join(codexStandaloneSkill, 'SKILL.md'),
  path.join(codexStandaloneSkill, 'agents', 'openai.yaml'),
  path.join(codexPluginSkill, 'SKILL.md'),
  path.join(codexPluginSkill, 'agents', 'openai.yaml'),
  path.join(claudeSkill, 'SKILL.md'),
  path.join(claudeUpdateSkill, 'SKILL.md'),
  path.join(claudeProjectUpdateSkill, 'SKILL.md'),
  path.join(webPrompts, 'README.md'),
  path.join(webPrompts, 'skala-review-prompt.md'),
  path.join(webPrompts, 'skala-quick-draft-prompt.md'),
  path.join(repositoryRoot, 'plugins', 'skala-review', '.codex-plugin', 'plugin.json'),
  path.join(repositoryRoot, '.agents', 'plugins', 'marketplace.json')
]) required(filePath);

assert.ok(!fs.existsSync(path.join(repositoryRoot, 'platforms', 'web')), '이전 웹 라우터 배포본이 남아 있습니다.');
assert.ok(!fs.existsSync(path.join(core, 'web')), '이전 웹 실행 번들 원본이 남아 있습니다.');
assert.ok(!fs.existsSync(path.join(repositoryRoot, 'platforms', 'codex', 'SKILL.md')), '잘못 설치될 수 있는 이전 Codex 원본 경로가 남아 있습니다.');
assert.equal(path.basename(codexStandaloneSkill), 'skala-review', 'Codex 독립 Skill 폴더명은 메타데이터 이름과 같아야 합니다.');

const plugin = JSON.parse(fs.readFileSync(path.join(repositoryRoot, 'plugins', 'skala-review', '.codex-plugin', 'plugin.json')));
const version = fs.readFileSync(versionFile, 'utf8').trim();
assert.match(version, /^\d+\.\d+\.\d+$/, 'VERSION은 SemVer 형식이어야 합니다.');
assert.equal(plugin.name, 'skala-review');
assert.equal(plugin.skills, './skills/');
assert.equal(plugin.version, version, 'Plugin 버전과 VERSION이 일치해야 합니다.');
assert.ok(plugin.interface.defaultPrompt.length <= 3, '기본 시작 문구는 최대 3개여야 합니다.');

for (const script of [claudeInstallScript, claudeUpdateScript]) {
  execFileSync('bash', ['-n', script], { stdio: 'pipe' });
  assert.ok((fs.statSync(script).mode & 0o111) !== 0, `실행 권한이 없습니다: ${script}`);
}

const releaseText = fs.readFileSync(releaseWorkflow, 'utf8');
includesAll(releaseText, [
  'tags:',
  'v*',
  'node tools/package-skill.mjs',
  'node tools/validate.mjs',
  'gh release create'
], 'GitHub Release 워크플로');

const marketplace = JSON.parse(fs.readFileSync(path.join(repositoryRoot, '.agents', 'plugins', 'marketplace.json')));
assert.ok(marketplace.plugins.some((entry) => entry.name === 'skala-review'));

for (const directory of ['references', 'templates', 'scripts']) {
  for (const name of fs.readdirSync(path.join(core, directory))) {
    const source = path.join(core, directory, name);
    for (const target of [codexStandaloneSkill, codexPluginSkill, claudeSkill]) {
      const output = path.join(target, directory, name);
      required(output);
      assert.equal(hash(source), hash(output), `배포본과 동기화되지 않은 자료입니다: ${output}`);
    }
  }
}

const codexText = fs.readFileSync(path.join(codexStandaloneSkill, 'SKILL.md'), 'utf8');
const pluginCodexText = fs.readFileSync(path.join(codexPluginSkill, 'SKILL.md'), 'utf8');
const claudeText = fs.readFileSync(path.join(claudeSkill, 'SKILL.md'), 'utf8');
assert.match(codexText, /^---\nname: skala-review\ndescription: .+\n---/);
assert.equal(codexText, pluginCodexText, 'Codex 독립 Skill과 Plugin Skill의 SKILL.md가 다릅니다.');
assert.equal(
  hash(path.join(codexStandaloneSkill, 'agents', 'openai.yaml')),
  hash(path.join(codexPluginSkill, 'agents', 'openai.yaml')),
  'Codex 독립 Skill과 Plugin Skill의 에이전트 메타데이터가 다릅니다.'
);
assert.match(claudeText, /^---\nname: skala-review\ndescription: .+\ndisable-model-invocation: true\n---/);

const claudeUpdateText = fs.readFileSync(path.join(claudeUpdateSkill, 'SKILL.md'), 'utf8');
assert.match(claudeUpdateText, /^---\nname: skala-review-update\ndescription: .+\n---/);
assert.equal(
  hash(path.join(claudeUpdateSkill, 'SKILL.md')),
  hash(path.join(claudeProjectUpdateSkill, 'SKILL.md')),
  'Claude Code 전역·프로젝트 업데이트 Skill이 다릅니다.'
);
includesAll(claudeUpdateText, [
  'SKALA 복습 스킬 업데이트해줘',
  '/skala-review-update',
  'update-claude-code.sh',
  'install-claude-code.sh',
  'yongchane/skala-review-skill',
  '반드시 재실행을 안내한다.'
], 'Claude Code 업데이트 Skill');

for (const text of [codexText, pluginCodexText, claudeText]) {
  includesAll(text, [
    '답변하기 전에 `references/workflow.md`를 읽고',
    '새 대화에서 처음 실행할 때만 `SKALA 복습 도우미 안내`',
    '`templates/first-run-notice.md`',
    '질문 복습, 복습 글 초안·플랫폼별 작성 가이드, 빠른 요약',
    '제목·목차·표현 방식·자료 위치를 추천',
    '수업 내용·출처·실행 결과를 임의로 만들지 않는다',
    '비전공자도 이해할 수 있는 쉬운 한국어'
  ], '에이전트 Skill');
}

const workflow = fs.readFileSync(path.join(core, 'references', 'workflow.md'), 'utf8');
includesAll(workflow, [
  '저장 여부는 복습의 선행 조건이 아니다',
  '새 대화에서 처음 실행할 때만 `templates/first-run-notice.md`를 읽고',
  '문장, 소제목, 이모지, 링크, 번호, 문단과 Markdown 인용문 구조를 생략·요약·재작성·병합하지 말고',
  '안내문 뒤에 별도의 축약본이나 대체 질문을 덧붙이지 않는다.',
  '복습 글 기본 출력',
  '플랫폼별 복습 글 작성 가이드 기본 출력',
  '빠른 공부 내용 요약',
  'Velog·Notion·Tistory 중 선택한 플랫폼에 맞는 복습 글 작성 가이드',
  '로컬 저장을 선택하지 않았더라도 복사 가능한 결과는 반드시 제공한다.',
  '아직 전체 노트를 보여주지 않는다.',
  '반드시 한 번에 하나씩 묻는다.'
], '공통 복습 흐름');

const firstRunNotice = fs.readFileSync(path.join(core, 'templates', 'first-run-notice.md'), 'utf8');
includesAll(firstRunNotice, [
  '📌 **SKALA 복습 도우미 안내**',
  '**📝 시작하기**',
  '**🧠 학습 안내**',
  '**🔒 자료 사용 안내**',
  '**🌱 오픈소스 기여**',
  '핵심을 빠르게 파악하고 복습 방향을 잡도록 돕는 보조 도구',
  'AI의 설명을 읽는 것만으로 학습이 끝나지는 않으므로',
  '이 도우미는 오픈소스입니다.',
  'https://github.com/yongchane/skala-review-skill',
  '1. **질문으로 복습하기**',
  '2. **복습 글 작성 도우미**',
  '3. **지난 학습 다시 복습하기**',
  '4. **빠르게 공부 내용 요약하기**',
  '오늘 무엇을 배웠나요?'
], '첫 실행 고정 안내문');
assert.ok(firstRunNotice.startsWith('> 📌 **SKALA 복습 도우미 안내**'), '첫 실행 안내문은 Markdown 인용문 박스로 시작해야 합니다.');

const outputProfiles = fs.readFileSync(path.join(core, 'references', 'output-profiles.md'), 'utf8');
includesAll(outputProfiles, [
  '약 700~1,200자',
  '플랫폼별 복습 글 작성 가이드',
  '입력 내용에 어울리는 글 유형과 선택 이유',
  '질문·오개념·예시·코드·이미지를 배치할 위치',
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
    '> 📌 **SKALA',
    '> **📝 시작하기**',
    '> **🧠 학습 안내**',
    '> **🔒 자료 사용 안내**',
    '> **🌱 오픈소스 기여**',
    '보조 도구입니다.',
    '이 도우미는 오픈소스입니다.',
    'https://github.com/yongchane/skala-review-skill',
    '배포가 제한된 강의 자료 전체보다는',
    '복습 글',
    '플랫폼별 복습 글 작성 가이드',
    '질문·오개념·예시·코드·이미지를 배치할 위치',
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
  '3. 플랫폼별 복습 글 작성 가이드'
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
  '복습 글 작성 도우미',
  '지난 학습 다시 복습하기',
  '빠르게 공부 내용 요약하기',
  '약 700~1,200자',
  '플랫폼별 복습 글 작성 가이드',
  'AI 설명은 복습을 돕는 보조 수단이며',
  'GitHub Issue와 Pull Request로 개선에 참여',
  '`platforms/codex/skala-review`',
  '--path platforms/codex/skala-review',
  'bash tools/install-claude-code.sh',
  'tools/update-claude-code.sh',
  '기존 Claude Code 사용자의 최초 마이그레이션',
  'SKALA 복습 스킬 업데이트해줘',
  '/skala-review-update',
  '업데이트와 Release',
  '제작자가 GitHub에 변경사항을 푸시하는 것만으로 사용자 로컬 설치본이 자동 변경되지는 않습니다.',
  '직접 설치 가능한 Codex Skill 완성본',
  '웹 프롬프트는 `web-prompts/`에서 직접 관리합니다.'
], 'README');
assert.ok(!readme.includes('## AI 실행 라우터'), 'README에 이전 AI 실행 라우터가 남아 있습니다.');

for (const [name, text] of [
  ['README', readme],
  ['공통 복습 흐름', workflow],
  ['첫 실행 고정 안내문', firstRunNotice],
  ['출력 형식', outputProfiles],
  ['Codex Skill', codexText],
  ['Claude Code Skill', claudeText],
  ['질문 복습 프롬프트', reviewPrompt],
  ['빠른 정리 프롬프트', quickPrompt]
]) {
  assert.ok(!text.includes('실습 보고서'), `${name}에 제거 대상 문구가 남아 있습니다: 실습 보고서`);
  assert.ok(!text.includes('복습 글·보고서'), `${name}에 제거 대상 문구가 남아 있습니다: 복습 글·보고서`);
}

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
const simulatedInstallRoot = path.join(temporaryRoot, 'skills', 'skala-review');
fs.mkdirSync(path.dirname(simulatedInstallRoot), { recursive: true });
fs.cpSync(codexStandaloneSkill, simulatedInstallRoot, { recursive: true });
for (const relativePath of [
  'SKILL.md',
  'agents/openai.yaml',
  'references/workflow.md',
  'scripts/init-workspace.mjs',
  'templates/first-run-notice.md'
]) {
  required(path.join(simulatedInstallRoot, relativePath));
}
assert.equal(
  hash(path.join(core, 'templates', 'first-run-notice.md')),
  hash(path.join(simulatedInstallRoot, 'templates', 'first-run-notice.md')),
  '직접 설치를 모사한 Skill의 첫 실행 안내문이 원본과 다릅니다.'
);

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
