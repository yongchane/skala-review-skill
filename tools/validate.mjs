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

function required(filePath) {
  assert.ok(fs.existsSync(filePath), `필수 파일이 없습니다: ${filePath}`);
}

function hash(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

for (const filePath of [
  path.join(codexSkill, 'SKILL.md'),
  path.join(codexSkill, 'agents', 'openai.yaml'),
  path.join(claudeSkill, 'SKILL.md'),
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

console.log('검증 통과: 플러그인, 플랫폼별 배포본, 노트 스크립트가 일치합니다.');
