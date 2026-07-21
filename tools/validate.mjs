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
  assert.ok(fs.existsSync(filePath), `Missing required file: ${filePath}`);
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

const marketplace = JSON.parse(fs.readFileSync(path.join(repositoryRoot, '.agents', 'plugins', 'marketplace.json')));
assert.ok(marketplace.plugins.some((entry) => entry.name === 'skala-review'));

for (const directory of ['references', 'templates', 'scripts']) {
  for (const name of fs.readdirSync(path.join(core, directory))) {
    const source = path.join(core, directory, name);
    for (const target of [codexSkill, claudeSkill]) {
      const output = path.join(target, directory, name);
      required(output);
      assert.equal(hash(source), hash(output), `Out-of-sync resource: ${output}`);
    }
  }
}

const codexText = fs.readFileSync(path.join(codexSkill, 'SKILL.md'), 'utf8');
const claudeText = fs.readFileSync(path.join(claudeSkill, 'SKILL.md'), 'utf8');
assert.match(codexText, /^---\nname: skala-review\ndescription: .+\n---/);
assert.match(claudeText, /^---\nname: skala-review\ndescription: .+\ndisable-model-invocation: true\n---/);

const workflow = fs.readFileSync(path.join(core, 'references', 'workflow.md'), 'utf8');
for (const requiredRule of [
  'Storage is never a gate',
  'Do **not** ask about `SKALA-Review/`, settings, or reminders in the opening message.',
  'Material intake and mode selection',
  'Treat statements such as “저장 없이 진행” as a storage preference only.',
  'Draft handoff and revision loop',
  'This output is required even when the learner chose not to save a local note.'
]) assert.ok(workflow.includes(requiredRule), `Missing workflow rule: ${requiredRule}`);

for (const text of [codexText, claudeText]) {
  assert.ok(text.includes('Read `references/workflow.md` before replying'));
  assert.ok(text.includes('Never ask the learner to choose a note storage location in the opening message'));
  assert.ok(text.includes('After a review, continue to the platform-draft handoff'));
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
fs.rmSync(temporaryRoot, { recursive: true, force: true });

console.log('Validation passed: plugin, platform packages, and note scripts are consistent.');
