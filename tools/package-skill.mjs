import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const core = path.join(repositoryRoot, 'core');
const codexTarget = path.join(repositoryRoot, 'plugins', 'skala-review', 'skills', 'skala-review');
const claudeTarget = path.join(repositoryRoot, 'platforms', 'claude-code', 'skala-review');
const targets = [codexTarget, claudeTarget];

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

console.log(`${targets.length}개 대상의 공통 자료를 패키징했습니다.`);
