import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const core = path.join(repositoryRoot, 'core');
const codexStandaloneTarget = path.join(repositoryRoot, 'platforms', 'codex', 'skala-review');
const codexPluginTarget = path.join(repositoryRoot, 'plugins', 'skala-review', 'skills', 'skala-review');
const claudeTarget = path.join(repositoryRoot, 'platforms', 'claude-code', 'skala-review');
const claudeUpdateSource = path.join(repositoryRoot, 'platforms', 'claude-code', 'skala-review-update');
const claudeProjectUpdateTarget = path.join(repositoryRoot, '.claude', 'skills', 'skala-review-update');
const targets = [codexStandaloneTarget, codexPluginTarget, claudeTarget];

for (const target of targets) {
  for (const directory of ['references', 'templates', 'scripts']) {
    const source = path.join(core, directory);
    const destination = path.join(target, directory);
    fs.rmSync(destination, { recursive: true, force: true });
    fs.cpSync(source, destination, { recursive: true });
  }
}

fs.copyFileSync(path.join(codexStandaloneTarget, 'SKILL.md'), path.join(codexPluginTarget, 'SKILL.md'));
fs.rmSync(path.join(codexPluginTarget, 'agents'), { recursive: true, force: true });
fs.cpSync(
  path.join(codexStandaloneTarget, 'agents'),
  path.join(codexPluginTarget, 'agents'),
  { recursive: true, force: true }
);

fs.rmSync(claudeProjectUpdateTarget, { recursive: true, force: true });
fs.mkdirSync(path.dirname(claudeProjectUpdateTarget), { recursive: true });
fs.cpSync(claudeUpdateSource, claudeProjectUpdateTarget, { recursive: true });

console.log(`${targets.length}개 에이전트 배포본과 Claude Code 업데이트 Skill을 패키징했습니다.`);
