import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2];

if (!root) {
  console.error('사용법: node init-workspace.mjs <작업공간-루트>');
  process.exit(1);
}

const reviewRoot = path.resolve(root, 'SKALA-Review');
const notesDirectory = path.join(reviewRoot, 'notes');
const configDirectory = path.join(reviewRoot, '.config');
const settingsPath = path.join(configDirectory, 'settings.json');

fs.mkdirSync(notesDirectory, { recursive: true });
fs.mkdirSync(configDirectory, { recursive: true });

if (!fs.existsSync(settingsPath)) {
  const settings = {
    version: 1,
    notesDirectory,
    saveNotes: true,
    defaultPlatform: null,
    reminderEnabled: false
  };
  fs.writeFileSync(settingsPath, `${JSON.stringify(settings, null, 2)}\n`);
}

console.log(JSON.stringify({ reviewRoot, notesDirectory, settingsPath }, null, 2));
