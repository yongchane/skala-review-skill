# SKALA Review Skill

수업 내용을 완벽하게 정리하지 못해도 괜찮습니다. 생각나는 키워드, 끄적인 메모, 정리하다 만 내용만 보내면 AI가 한 번에 한 질문씩 복습을 도와주고, 그 과정을 Markdown 학습 노트와 Velog·Notion·Tistory용 초안으로 정리해 주는 Skill입니다.

이 Skill은 자동 게시 도구가 아닙니다. 복습과 글 작성까지만 도와주며, 최종 게시 여부와 내용은 사용자가 직접 결정합니다.

## 이런 분에게 유용합니다

- 비전공자라서 어떤 내용부터 복습해야 할지 막막한 교육생
- 수업 중 짧은 메모만 남겨서 다시 정리하기 어려운 교육생
- 복습 시간은 부족하지만 핵심 개념은 질문으로 확인하고 싶은 교육생
- Velog·Notion·Tistory에 학습 내용을 어떤 구조로 써야 할지 모르는 교육생
- 지난 복습 내용을 Markdown으로 모아 두고 다시 문제를 풀어보고 싶은 교육생

## 무엇을 해주나요?

1. 생각나는 키워드, 직접 작성한 메모, 미완성 정리, 스크린샷 또는 공유 가능한 자료 일부를 받습니다.
2. 오늘 실제로 배운 범위를 짧게 확인합니다.
3. SKALA 전체 과정에서 이 내용이 어디에 해당하고, 앞뒤 학습 및 프로젝트와 어떻게 연결되는지 쉽게 설명합니다.
4. 한 번에 한 문제씩 3~5개의 질문으로 복습합니다.
5. 틀리거나 `모르겠어요`라고 답해도 쉬운 예시로 설명한 뒤 더 간단한 질문으로 다시 확인합니다.
6. 복습한 내용을 Velog·Notion·Tistory·일반 Markdown 형식으로 정리합니다.
7. 원하면 Markdown 노트로 저장하고, 나중에 날짜·제목·키워드로 찾아 회상 문제를 다시 풉니다.

## 처음 사용할 때

설치 후 새 대화에서 다음처럼 입력하면 됩니다.

```text
$skala-review SKALA 복습 시작
```

`$skala-review`를 붙이면 Codex가 이 Skill을 명시적으로 선택하므로 가장 확실합니다. Plugin 화면에 보이는 `SKALA Review` 시작 문구를 눌러도 됩니다.

`$skala-review`를 입력하기 어려운 환경이라면 다음처럼 목적을 함께 적어주세요.

```text
오늘 SKALA에서 배운 내용을 질문으로 복습해줘.
```

Skill이 다음과 같은 입력을 안내합니다. 잘 정리된 글을 준비할 필요는 없습니다.

```text
오늘 무엇을 배웠나요?
완벽하게 정리하지 않아도 괜찮아요.
생각나는 키워드, 직접 작성한 메모, 정리하다 만 내용,
또는 공부한 자료의 필요한 부분을 보내주세요.
```

예를 들어 아래처럼 짧게 보내도 됩니다.

```text
오늘 Transformer를 배웠어.
Q, K, V와 멀티헤드 어텐션을 적어두긴 했는데 정확히 모르겠어.
```

또는 메모를 그대로 붙여 넣어도 됩니다.

```text
전이학습 = 미리 배운 모델 활용?
representation learning 끝난 게 pretrained model인가?
attention은 중요한 단어에 집중하는 것 같음
```

자료를 보낸 뒤에는 다음 중 원하는 진행 방식을 선택합니다.

1. **질문으로 복습하기**: 핵심 개념을 3~5문제로 확인합니다.
2. **바로 글 초안 만들기**: 시간이 없을 때 자료를 플랫폼용 초안으로 정리합니다.
3. **복습 후 글 초안 만들기**: 질문으로 공부한 뒤 내 답과 헷갈린 점까지 포함한 글을 만듭니다. 처음이라면 이 방식을 권장합니다.

무엇을 선택해야 할지 모르겠다면 `3번으로 해줘`라고 입력하면 됩니다.

## PDF와 수업 자료를 사용할 때

강의 자료 전체를 무작정 올릴 필요는 없습니다. 저작권, 배포 제한, 개인정보가 포함되어 있는지 먼저 확인해 주세요.

- 가능하면 직접 작성한 요약이나 기억나는 키워드를 먼저 사용하세요.
- 자료가 필요하다면 복습할 페이지나 일부 내용만 보내는 것을 권장합니다.
- 공유 권한이 있는 자료만 사용하세요.
- Skill은 원본 PDF를 복습 노트에 저장하거나 긴 내용을 그대로 옮기지 않습니다.
- PDF 전체를 오늘 수업 범위로 단정하지 않고, 후보 키워드를 보여준 뒤 실제로 배운 부분을 다시 확인합니다.

## 복습 노트 저장과 다시 보기

저장은 필수가 아닙니다. 복습과 플랫폼용 초안은 저장 위치를 정하지 않아도 받을 수 있습니다.

복습이 끝난 뒤 저장에 동의하면 현재 작업 공간에 다음 구조가 만들어집니다.

```text
SKALA-Review/
├── notes/
│   └── 2026-07-21_attention.md
└── .config/
    └── settings.json
```

저장 노트에는 다음 내용이 들어갑니다.

- 핵심 키워드와 오늘의 정리
- 처음 헷갈린 부분과 수정된 이해
- AI의 복습 질문과 내가 답한 내용
- SKALA 과정 및 프로젝트와의 연결
- 다음에 다시 확인할 질문

나중에 같은 작업 공간을 열고 다음처럼 요청할 수 있습니다.

```text
어제 저장한 attention 복습 노트 다시 점검해줘.
회귀분석 관련해서 저장한 내용 찾아서 문제 내줘.
7월 21일에 공부한 내용 다시 복습할래.
```

Skill은 저장된 정답을 바로 보여주지 않고 먼저 회상 질문을 냅니다. 답변 후 이전에 이해한 내용과 비교해 달라진 부분을 설명합니다.

노트는 AI의 내부 기억이 아니라 사용자가 선택한 로컬 폴더에 보관됩니다. 다른 작업 공간에서 다시 보려면 기존 `SKALA-Review/notes/` 경로를 알려주세요.

## 플랫폼별 결과물

- **Velog**: 제목과 Markdown 본문을 복사해 붙일 수 있게 제공합니다.
- **Notion**: 핵심 요약, 개념 설명, 복습 문답, 다음 질문이 잘 보이는 학습 노트로 제공합니다.
- **Tistory**: 읽기 쉬운 블로그형 Markdown으로 제공하며, HTML은 사용자가 요청할 때만 만듭니다.
- **일반 Markdown**: 특정 플랫폼에 종속되지 않는 `.md` 형식으로 제공합니다.

Skill은 플랫폼에 로그인하거나 글을 자동으로 게시하지 않습니다. 사용자가 결과를 검토하고 직접 복사·수정·게시합니다.

## Codex 설치

터미널에서 이 저장소를 Plugin Marketplace로 등록하고 플러그인을 설치합니다.

```bash
codex plugin marketplace add yongchane/skala-review-skill
codex plugin add skala-review@skala-review
```

Codex Desktop 또는 CLI를 다시 열거나 새 대화를 만든 뒤 사용합니다.

```text
$skala-review SKALA 복습 시작
```

업데이트가 올라온 뒤에는 다음 명령을 사용합니다.

```bash
codex plugin marketplace upgrade skala-review
```

설치 상태를 완전히 초기화해 다시 시험하려면 다음처럼 제거 후 설치합니다.

```bash
codex plugin remove skala-review@skala-review
codex plugin add skala-review@skala-review
```

> 저장소 루트를 Marketplace에 등록해야 합니다. `.agents/plugins` 하위 경로만 등록하면 플러그인 본체를 찾지 못할 수 있습니다.

## Claude Code 설치

개인 환경 전체에서 사용하려면 다음처럼 설치합니다.

```bash
git clone https://github.com/yongchane/skala-review-skill.git
mkdir -p ~/.claude/skills
cp -R skala-review-skill/platforms/claude-code/skala-review ~/.claude/skills/skala-review
```

특정 프로젝트에서만 사용하려면 프로젝트 루트에서 다음처럼 복사합니다.

```bash
mkdir -p .claude/skills
cp -R /path/to/skala-review-skill/platforms/claude-code/skala-review .claude/skills/skala-review
```

Claude Code에서 다음 명령으로 시작합니다.

```text
/skala-review
```

## 개인정보와 자료 보호

- 사용자 동의 없이 복습 노트를 저장하거나 수정하지 않습니다.
- 강의 PDF, 교수님 메모, 개인 노트를 이 공개 저장소에 포함하지 않습니다.
- 제한된 강의 자료 전체 업로드를 유도하지 않습니다.
- 원본 자료 대신 본인 요약, 키워드, 필요한 구간을 우선 사용합니다.
- Velog·Notion·Tistory에 자동 로그인하거나 게시하지 않습니다.

## 개발 및 검증

공통 워크플로와 템플릿은 `core/`에서 관리합니다. 수정 후 Codex와 Claude Code 배포본을 동기화하고 검증합니다.

```bash
node tools/package-skill.mjs
node tools/validate.mjs
```

검증은 플러그인 구조, 배포본 동기화, Markdown 노트 형식, 날짜·제목·키워드 검색을 확인합니다.
