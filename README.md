# SKALA Review Skill

SKALA 학습 내용을 복습하고, 개인 Markdown 노트와 Velog·Notion·Tistory용 복사 가능한 초안을 만드는 Skill입니다.

## What it does

- 키워드를 받아 질문·답변 방식으로 복습합니다.
- 사용자가 제공한 공부 내용이나 자료를 메모 성격에 맞춰 구조화합니다.
- 복습 결과를 다시 플랫폼별 초안으로 이어갈 수 있습니다.
- 이전에 저장한 Markdown 노트를 불러와 재복습할 수 있습니다.

## What it does not do

- Velog, Notion, Tistory 등에 자동 로그인하거나 게시하지 않습니다.
- 강의 PDF·교수님 메모·개인 노트를 이 저장소에 포함하지 않습니다.
- 사용자 동의 없이 파일을 저장하거나 예약 알림을 만들지 않습니다.

## Codex

### Install for local testing

Codex Plugin Marketplace에 이 저장소를 추가합니다.

```bash
codex plugin marketplace add <owner>/<repository>
codex plugin add skala-review@skala-review
```

Codex Desktop 또는 CLI에서 Plugin 목록을 열어 `skala-review`를 설치한 뒤 **새 대화**에서 사용합니다.

`<owner>/<repository>`에는 저장소 루트를 입력합니다. `.agents/plugins`는 marketplace 설정 파일이 있는 하위 폴더일 뿐이므로, 그 경로를 직접 등록하거나 `--sparse .agents/plugins`만 지정하면 플러그인 본체를 찾지 못할 수 있습니다.

```text
SKALA 복습 시작
```

개발 중 로컬 저장소로 시험하려면 다음 명령을 사용합니다.

```bash
codex plugin marketplace add /absolute/path/to/skala-review-skill
codex plugin add skala-review@skala-review
```

### Update after a local change

```bash
node tools/package-skill.mjs
```

그 다음 플러그인 버전을 올리고 아래 명령으로 marketplace를 갱신합니다.

```bash
codex plugin marketplace upgrade skala-review
```

새 대화에서 확인합니다. 설치 상태를 완전히 초기화해야 한다면 아래처럼 제거 후 다시 추가합니다.

```bash
codex plugin remove skala-review@skala-review
codex plugin add skala-review@skala-review
```

## Claude Code

### Personal installation

```bash
mkdir -p ~/.claude/skills
cp -R platforms/claude-code/skala-review ~/.claude/skills/skala-review
```

### Project-only installation

```bash
mkdir -p .claude/skills
cp -R platforms/claude-code/skala-review .claude/skills/skala-review
```

Claude Code에서 다음 명령으로 시작합니다.

```text
/skala-review
```

## Note storage

최초 실행 시 사용자가 저장을 선택하면, 현재 작업 공간에 다음 폴더를 만듭니다.

```text
SKALA-Review/
├── notes/
└── .config/settings.json
```

저장 위치는 바꿀 수 있으며, 이전 노트를 재복습하려면 같은 작업 공간을 다시 열면 됩니다.

## Development

공통 자료는 `core/`에서만 수정합니다. 수정 후 아래 명령으로 Codex Plugin과 Claude Code Skill 배포본을 동기화합니다.

```bash
node tools/package-skill.mjs
```

## Privacy

이 프로젝트는 공개된 고수준 커리큘럼 안내와 일반화된 복습 워크플로만 포함합니다. 비공개 수업 자료와 개인 학습 기록은 Git에 커밋하지 마세요.
