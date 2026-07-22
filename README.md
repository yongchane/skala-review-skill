# SKALA Review Skill

수업 내용을 완벽하게 정리하지 못해도 괜찮습니다. 생각나는 키워드나 직접 작성한 메모만 보내면 AI가 질문으로 복습을 돕고, 그 내용을 Velog·Notion·Tistory에 정리할 수 있도록 짧은 초안이나 플랫폼별 작성 가이드로 바꿔 줍니다.

이 프로젝트는 사용 환경에 따라 두 가지 방식으로 제공합니다.

- **Codex·Claude Code 사용자**: 설치해서 반복 사용할 수 있는 Skill
- **ChatGPT·Gemini·Claude 웹 사용자**: 새 대화에 복사해서 사용하는 독립 프롬프트

Velog·Notion·Tistory에 자동 로그인하거나 게시하지 않습니다. 결과를 검토하고 수정한 뒤 사용자가 직접 게시합니다.

## 주요 기능

1. **질문으로 복습하기**
   핵심 개념을 3~5개의 질문으로 한 번에 하나씩 점검합니다.

2. **복습 글 작성 도우미**
   복습 메모와 AI 대화를 바탕으로 Velog·Notion·Tistory용 짧은 초안을 만들거나, 플랫폼에 맞는 제목·목차·말투·자료 배치 방법을 추천합니다.

3. **지난 학습 다시 복습하기**
   Codex·Claude Code에서는 저장한 Markdown 노트를 날짜·제목·키워드로 찾아 다시 회상합니다. 웹에서는 사용자가 보관한 파일을 다시 첨부하거나 붙여 넣습니다.

4. **빠르게 공부 내용 요약하기**
   질문 과정 없이 핵심 개념, 쉬운 설명, 활용 사례를 짧게 정리합니다.

## 어떤 환경에서 사용하나요?

| 사용 환경 | 권장 방식 | 시작 방법 |
|---|---|---|
| Codex | Plugin 설치 | `$skala-review SKALA 복습 시작` |
| Claude Code | Skill 폴더 설치 | `/skala-review` |
| ChatGPT·Gemini·Claude 웹 | 프롬프트 복사 | `web-prompts/`에서 목적에 맞는 프롬프트 선택 |

웹 AI는 GitHub 링크의 내용을 항상 직접 읽을 수 있는 것이 아닙니다. 따라서 저장소 링크만 전달해 실행시키지 않고, [웹 AI용 프롬프트](web-prompts/README.md)의 코드 블록을 복사해 사용하는 방식을 권장합니다.

## 웹 AI에서 사용하기

설치나 터미널이 필요하지 않습니다.

1. [웹 AI용 프롬프트 안내](web-prompts/README.md)를 엽니다.
2. 목적에 맞는 프롬프트를 선택합니다.
   - [질문 복습 프롬프트](web-prompts/skala-review-prompt.md): 질문으로 복습한 뒤 플랫폼용 글 초안이나 작성 가이드로 이어가기
   - [빠른 정리·작성 프롬프트](web-prompts/skala-quick-draft-prompt.md): 질문 없이 빠르게 요약하거나 플랫폼용 글 구조 만들기
3. 선택한 파일의 `복사할 프롬프트` 코드 블록 전체를 복사합니다.
4. ChatGPT·Gemini·Claude 웹의 새 대화에 붙여 넣습니다.
5. AI 안내에 따라 오늘 배운 키워드나 메모를 보냅니다.

일반 웹 대화에 붙여 넣은 지침은 보통 현재 대화에만 적용됩니다. 계속 사용하려면 서비스가 지원하는 Project, 맞춤 GPT, Gem 등에 프롬프트를 등록할 수 있습니다. 이미 등록한 프롬프트는 GitHub 내용이 바뀌어도 자동으로 업데이트되지 않습니다.

## Codex 설치

### 방법 1. Plugin으로 설치하기

Codex Plugin Marketplace에 저장소를 추가하고 Plugin을 설치합니다.

```bash
codex plugin marketplace add yongchane/skala-review-skill
codex plugin add skala-review@skala-review
```

Codex Desktop 또는 CLI를 다시 열거나 새 대화를 만든 뒤 시작합니다.

```text
$skala-review SKALA 복습 시작
```

업데이트가 올라오면 다음 명령을 사용합니다.

```bash
codex plugin marketplace upgrade skala-review
```

개발 중인 로컬 저장소를 시험하려면 저장소의 절대 경로를 Marketplace에 추가합니다.

```bash
codex plugin marketplace add /absolute/path/to/skala-review-skill
codex plugin add skala-review@skala-review
```

### 방법 2. GitHub에서 Skill을 직접 설치하기

Codex에 다음처럼 요청할 수 있습니다.

```text
https://github.com/yongchane/skala-review-skill.git 해당 SKALA 복습 Skill을 설치해줘.
```

이 저장소의 Codex 독립 Skill 경로는 `platforms/codex/skala-review`입니다. 설치 에이전트는 다른 원본 또는 Plugin 내부 경로가 아니라 이 경로를 사용해야 합니다.

직접 명령을 실행하려면 다음과 같이 설치합니다.

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo yongchane/skala-review-skill \
  --path platforms/codex/skala-review
```

설치 결과는 `~/.codex/skills/skala-review/`에 생성됩니다. 새 대화를 열면 Skill을 사용할 수 있습니다.

## Claude Code 설치

개인 환경 전체에서 사용하려면 저장소를 내려받고 설치 스크립트를 실행합니다.

```bash
git clone https://github.com/yongchane/skala-review-skill.git
cd skala-review-skill
bash tools/install-claude-code.sh
```

설치 스크립트는 검증된 최신 GitHub Release를 `~/.local/share/skala-review-skill`에 보관하고, 복습용 `skala-review`와 업데이트용 `skala-review-update`를 `~/.claude/skills/`에 연결합니다. 기존 복사 설치본이 있으면 삭제하지 않고 날짜가 붙은 백업 폴더로 이동합니다.

설치가 끝나면 Claude Code를 완전히 종료하고 새 세션에서 시작합니다.

```text
/skala-review
```

### 기존 Claude Code 사용자의 최초 마이그레이션

이전 안내에 따라 Skill 폴더를 복사해 설치한 사용자는 Git 저장소에서 `git pull`만 실행해도 실제 설치 폴더가 바뀌지 않습니다. 다만 최신 저장소에는 프로젝트용 업데이트 Skill이 포함되어 있으므로, 다음처럼 저장소를 갱신하고 해당 위치에서 Claude Code를 다시 실행합니다.

```bash
cd /path/to/skala-review-skill
git pull --ff-only origin main
claude
```

Claude Code에서 다음처럼 요청하면 기존 복사 설치본을 관리형 설치로 전환합니다.

```text
SKALA 복습 스킬 업데이트해줘
```

또는 다음 명령을 사용할 수 있습니다.

```text
/skala-review-update
```

업데이트 Skill을 사용할 수 없는 경우에만 다음 명령을 직접 실행합니다.

```bash
bash tools/install-claude-code.sh
```

최초 전환 이후에는 어느 프로젝트에서든 `SKALA 복습 스킬 업데이트해줘` 또는 `/skala-review-update`를 사용할 수 있습니다. 업데이트가 끝나면 Claude Code를 완전히 종료하고 다시 실행합니다. 업데이트 스크립트는 최신 Release를 적용한 뒤 프로젝트 검증을 실행하며, 검증에 실패하면 이전 커밋으로 복구합니다.

AI 업데이트 명령을 사용할 수 없는 환경에서는 다음 명령을 직접 실행할 수 있습니다.

```bash
bash ~/.local/share/skala-review-skill/tools/update-claude-code.sh
```

### Claude Code 권한 요청 안내

업데이트를 시작하면 먼저 변경 대상과 보호되는 개인 자료를 설명하는 안내문이 표시됩니다. 그다음 Claude Code가 아래 명령 하나의 실행 권한을 요청합니다.

```bash
bash ~/.local/share/skala-review-skill/tools/update-claude-code.sh
```

명령 내용을 확인하고 **이번만 허용**을 선택하면 됩니다. 정상 업데이트에서는 README나 템플릿을 하나씩 읽거나 여러 명령의 권한을 반복해서 요청하지 않습니다. 업데이트 명령이 실패한 경우에만 설치 위치와 오류 원인을 추가로 확인합니다.

반복적인 확인을 원하지 않는 사용자는 Claude Code의 `/permissions`에서 다음의 정확한 명령 하나만 허용할 수 있습니다.

```text
Bash(bash ~/.local/share/skala-review-skill/tools/update-claude-code.sh)
```

`Bash` 또는 `Bash(*)`처럼 모든 Bash 명령을 허용하지 마세요. 위 규칙은 SKALA 복습 스킬 업데이트 명령에만 적용해야 합니다. 자세한 권한 동작은 [Claude Code 권한 문서](https://code.claude.com/docs/en/permissions)를 참고하세요.

| 작업 | 예상되는 권한 요청 |
|---|---|
| 질문으로 복습하기 | 없음 |
| 빠른 요약 | 없음 |
| 대화에 복습 글 초안 출력 | 없음 |
| Markdown 파일로 저장 | 저장 위치에 따라 파일 쓰기 승인 가능 |
| Skill 설치·업데이트 | Bash 실행 승인 필요 |
| GitHub Release 다운로드 | 업데이트 스크립트 실행 승인에 포함 |

일반 복습 중에도 Bash 실행 승인이 계속 나타난다면 정상 동작이 아닙니다. 실행을 취소한 뒤 GitHub Issue에 사용한 요청 문구와 표시된 명령을 알려주세요.

특정 프로젝트에서만 사용하려면 프로젝트 루트의 `.claude/skills/`에 직접 복사할 수 있습니다. 이 방식은 자동 연결되지 않으므로 새 Release마다 다시 동기화해야 합니다.

```bash
mkdir -p .claude/skills
cp -R /path/to/skala-review-skill/platforms/claude-code/skala-review .claude/skills/skala-review
```

## 업데이트와 Release

GitHub의 `main` 브랜치는 다음 버전을 준비하는 개발 상태일 수 있습니다. 일반 사용자의 설치·업데이트 스크립트는 `v0.6.1`과 같은 GitHub Release 태그 중 가장 최신 버전을 사용합니다.

| 환경 | 업데이트 방법 |
|---|---|
| Codex Plugin | `codex plugin marketplace upgrade skala-review` 실행 후 새 대화 시작 |
| Codex 직접 설치 | 최신 Release 또는 `platforms/codex/skala-review`를 다시 설치한 뒤 새 대화 시작 |
| Claude Code 관리형 설치 | `SKALA 복습 스킬 업데이트해줘` 또는 `/skala-review-update` 실행 후 재시작 |
| Claude Code 프로젝트 복사 설치 | 저장소 업데이트 후 프로젝트의 `.claude/skills/skala-review`를 다시 동기화 |
| 웹 AI 프롬프트 | GitHub에서 최신 프롬프트 코드 블록을 다시 복사 |

제작자가 GitHub에 변경사항을 푸시하는 것만으로 사용자 로컬 설치본이 자동 변경되지는 않습니다. 검증된 새 Release가 게시된 뒤 사용자가 환경에 맞는 업데이트 명령을 실행해야 합니다.

새 버전은 다음 순서로 배포합니다.

1. `VERSION`과 Plugin 버전을 같은 SemVer 값으로 변경합니다.
2. `node tools/package-skill.mjs`와 `node tools/validate.mjs`를 실행합니다.
3. 변경사항을 `main`에 반영합니다.
4. `VERSION`과 같은 `vX.Y.Z` 태그를 푸시합니다.
5. GitHub Actions가 Claude Code·Codex·Codex Plugin 배포 파일과 Release를 생성합니다.

## 처음 실행하면 어떻게 진행되나요?

새 대화에서 처음 실행하면 AI가 다음 내용을 한 번만 안내합니다.

- 완성된 필기가 없어도 키워드와 미완성 메모로 시작할 수 있음
- AI 설명은 복습을 돕는 보조 수단이며, 직접 답하고 자신의 말로 설명하는 과정이 필요함
- 제한된 강의 자료 전체보다 직접 작성한 요약과 필요한 일부 내용 사용 권장
- 질문 복습, 복습 글 초안·플랫폼별 작성 가이드, 지난 학습 재복습, 빠른 요약 기능
- 최종 글의 수정과 게시 여부는 사용자가 결정
- 오픈소스이므로 GitHub Issue와 Pull Request로 개선에 참여할 수 있음

그다음 오늘 배운 내용과 원하는 기능을 묻습니다. 이미 학습 내용이나 요청을 함께 보냈다면 같은 질문을 반복하지 않고 바로 진행합니다.

## 기본 결과물

### 복습 글

- 추천 제목
- 글에 들어가면 좋은 내용 3~5개
- 항목별 2~4문장의 짧은 초안
- 추가하면 좋은 예시·이미지·코드
- 사용자가 확인하거나 수정할 부분

기본 초안은 약 700~1,200자로 제공하며, 사용자가 요청할 때만 자세한 글로 확장합니다.

### 플랫폼별 복습 글 작성 가이드

- 선택한 플랫폼과 예상 독자
- 현재 복습 내용에 알맞은 글 유형과 추천 이유
- 추천 제목과 소제목 3~5개
- 각 항목에 넣을 내용과 작성 순서
- 질문·오개념·예시·코드·이미지를 배치할 위치
- Velog·Notion·Tistory에 맞는 말투와 표현 방식
- 글을 쓰기 전에 사용자가 확인할 내용

작성 가이드는 완성된 글을 대신 만드는 결과가 아닙니다. 사용자가 바로 시작할 수 있도록 짧은 도입 문장 예시를 함께 제시할 수 있으며, 요청하면 별도의 복습 글 초안으로 이어갑니다.

## PDF와 수업 자료를 사용할 때

- 제한된 강의 PDF나 슬라이드 전체보다 직접 작성한 요약과 키워드를 우선합니다.
- 자료가 필요하면 공유 가능한 페이지나 일부 내용만 사용합니다.
- PDF 전체를 그날의 실제 수업 범위로 단정하지 않습니다.
- 개인정보, 계정 정보, API 키를 입력하지 않습니다.
- Skill과 웹 프롬프트는 긴 원문을 복습 노트에 그대로 옮기지 않습니다.

## Markdown 저장과 재복습

Codex·Claude Code에서 사용자가 저장에 동의하면 현재 작업 공간에 다음 구조를 만듭니다.

```text
SKALA-Review/
├── notes/
└── .config/settings.json
```

저장은 복습이나 초안 작성의 선행 조건이 아닙니다. 저장하지 않아도 복사 가능한 결과를 받을 수 있습니다.

웹 AI는 다른 대화나 기기의 파일을 자동으로 기억하지 않습니다. 웹에서 만든 Markdown 보관본은 사용자가 직접 저장하고, 다음 복습 때 파일을 다시 첨부하거나 내용을 붙여 넣습니다.

## 오픈소스 기여

이 프로젝트는 [MIT 라이선스](LICENSE)로 제공됩니다. 비전공자를 위한 쉬운 설명, 복습 흐름, 웹 프롬프트, 플랫폼별 글 작성 형식, 설치와 검증 개선에 누구나 기여할 수 있습니다.

기본 절차는 다음과 같습니다.

1. 저장소를 Fork합니다.
2. 별도 브랜치에서 수정합니다.
3. `node tools/package-skill.mjs`를 실행합니다.
4. `node tools/validate.mjs`로 검증합니다.
5. 변경 이유와 확인 방법을 적어 Pull Request를 엽니다.

웹 프롬프트만 개선하려면 `web-prompts/` 안의 파일을 직접 수정할 수 있습니다. 자세한 방법과 PR 작성 예시는 [기여 가이드](CONTRIBUTING.md)를 확인해 주세요.

다음 자료는 공개 저장소에 포함하지 않습니다.

- 배포가 제한된 강의 PDF·슬라이드·교재 원문
- 교수자·교육생의 개인정보와 비공개 발언
- 개인 복습 기록과 실제 대화 원문
- API 키, 토큰, 계정 정보, 개인 로컬 경로
- 사용 허가를 확인할 수 없는 이미지와 문서

## 개발과 검증

에이전트 공통 워크플로와 템플릿은 `core/`에서 관리합니다. Codex 지침과 메타데이터는 `platforms/codex/skala-review/`에서 관리하고, Plugin 배포본과 공통 자료 사본은 패키징 명령으로 동기화합니다. 웹 프롬프트는 `web-prompts/`에서 직접 관리합니다.

```bash
node tools/package-skill.mjs
node tools/validate.mjs
```

프로젝트 구조는 다음과 같습니다.

```text
skala-review-skill/
├── .claude/skills/skala-review-update/ # 기존 clone에서 사용하는 업데이트 진입점
├── core/                              # 에이전트 공통 워크플로·템플릿·스크립트
├── plugins/skala-review/              # Codex Plugin 배포본
├── platforms/
│   ├── codex/skala-review/            # 직접 설치 가능한 Codex Skill 완성본
│   └── claude-code/
│       ├── skala-review/               # Claude Code 복습 Skill
│       └── skala-review-update/        # Claude Code 업데이트 Skill
├── web-prompts/                       # 웹 AI에서 복사해 쓰는 공개 프롬프트
├── tests/
└── tools/                             # 패키징·검증 도구
```

참여할 때는 [행동강령](CODE_OF_CONDUCT.md)을 따르고, 보안·개인정보 문제는 [보안 안내](SECURITY.md)에 따라 제보해 주세요.
