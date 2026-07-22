# SKALA Review Skill

## AI 실행 라우터

> 이 부분은 저장소 링크를 전달받은 AI가 먼저 읽는 실행 지침입니다.

현재 환경을 판별한 뒤 아래 한 경로만 선택합니다.

### ChatGPT·Gemini·Claude 웹

1. 이 저장소는 코드 리뷰 도구가 아니라 **SKALA 교육생용 질문식 복습 도우미**다.
2. 웹 AI는 로컬 Skill 설치를 시도하거나 코드 리뷰 도구로 추측하지 않는다.
3. 사용자가 저장소 링크와 함께 `진행해`, `실행해`, `복습 시작`처럼 요청했다면 [자기완결형 웹 실행 번들](https://github.com/yongchane/skala-review-skill/blob/main/platforms/web/SKALA-REVIEW-WEB-BUNDLE.md)을 읽는다.
4. 번들의 `웹 AI 실행 계약`과 복습 하네스를 현재 대화의 작업 규칙으로 적용한다.
5. 설치 가능 여부나 저장소 구조를 설명하지 말고 바로 다음 질문으로 시작한다.

> 오늘 무엇을 배웠나요? 완벽하게 정리하지 않아도 괜찮아요. 생각나는 키워드, 직접 작성한 메모, 정리하다 만 내용, 또는 공부한 자료의 필요한 부분을 보내주세요.

사용자가 학습 내용도 함께 보냈다면 위 질문을 반복하지 말고, 내용을 짧게 확인한 다음 `질문으로 복습`, `바로 초안 작성`, `복습 후 초안 작성` 중 진행 방식을 묻는다. 웹 실행 번들을 열 수 없다면 내용을 추측하거나 다른 Skill로 대체하지 말고 번들 파일 첨부를 요청한다.

### Codex

[`plugins/skala-review/skills/skala-review`](plugins/skala-review/skills/skala-review) 경로의 Skill을 설치한다. 설치 후 새 대화에서 `$skala-review SKALA 복습 시작`으로 실행한다.

### Claude Code

[`platforms/claude-code/skala-review`](platforms/claude-code/skala-review) 폴더를 `~/.claude/skills/skala-review`에 설치한다. 설치 후 새 세션에서 `/skala-review`로 실행한다.

---

수업 내용을 완벽하게 정리하지 못해도 괜찮습니다. 생각나는 키워드, 끄적인 메모, 정리하다 만 내용만 보내면 AI가 한 번에 한 질문씩 복습을 도와주고, 그 과정을 Markdown 학습 노트와 Velog·Notion·Tistory용 초안으로 정리해 주는 복습 도구입니다. Codex·Claude Code뿐 아니라 ChatGPT·Gemini·Claude 웹에서도 사용할 수 있습니다.

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

## 사용 환경 선택

| 사용 환경 | 준비 방법 | 시작 문구 |
|---|---|---|
| Codex | Plugin Marketplace 설치 | `$skala-review SKALA 복습 시작` |
| Claude Code | Skill 폴더 설치 | `/skala-review` |
| ChatGPT 웹 | 맞춤 GPT 또는 Project에 웹 지침 복사 | `SKALA 복습 시작` |
| Gemini 웹 | Gem에 웹 지침 복사 | `SKALA 복습 시작` |
| Claude 웹 | Project 또는 웹 Skill에 지침 복사 | `SKALA 복습 시작` |

터미널을 사용할 수 없다면 저장소의 일반 웹 주소와 함께 README의 `AI 실행 라우터`에 따라 진행하라고 요청할 수 있습니다. 웹 AI가 GitHub를 읽지 못하는 대화에서는 [웹 실행 번들](platforms/web/SKALA-REVIEW-WEB-BUNDLE.md)의 **파일 전체를 복사해 붙여 넣거나 `.md` 파일로 첨부**합니다.

## GitHub 링크로 시작하려는 경우

저장소의 `.git` clone 주소보다 아래 일반 웹 주소를 사용합니다.

```text
https://github.com/yongchane/skala-review-skill
```

AI가 README를 읽을 수 있는 환경이라면 다음처럼 요청합니다.

```text
https://github.com/yongchane/skala-review-skill
README의 AI 실행 라우터에 따라 현재 환경에 맞게 진행해.
```

README는 웹 AI를 자기완결형 웹 번들로, Codex와 Claude Code를 각 설치 경로로 안내합니다. 단, 웹 AI의 GitHub 탐색 권한은 대화와 계정에 따라 다르므로 README를 읽지 못하는 경우에는 웹 번들 파일을 직접 첨부해야 합니다.

### Codex: 직접 Skill 링크로 설치

새 Codex 대화에 다음 문장을 그대로 보냅니다.

```text
https://github.com/yongchane/skala-review-skill/tree/main/plugins/skala-review/skills/skala-review 해당 스킬 설치해줘
```

설치 완료 안내를 받은 다음 **새 대화**에서 아래처럼 시작합니다.

```text
$skala-review SKALA 복습 시작
```

이 흐름은 깨끗한 임시 Codex 환경에서 `설치 → 새 세션 실행 → 오늘 무엇을 배웠나요?`까지 검증했습니다.

### Claude Code: 설치할 폴더까지 명시

Claude Code에는 저장소 루트 링크만 보내지 말고 다음처럼 복사할 경로를 함께 요청합니다.

```text
https://github.com/yongchane/skala-review-skill 저장소를 clone하고,
platforms/claude-code/skala-review 폴더를 ~/.claude/skills/skala-review에 설치해줘.
```

설치 후 새 세션에서 `/skala-review`를 입력합니다. 이 저장소의 Claude Code 배포본은 공통 원본과의 파일 일치 및 구조 검증을 통과했지만, 현재 개발 환경에는 Claude Code 실행 파일이 없어 실제 계정 세션 테스트는 수행하지 못했습니다.

### ChatGPT·Gemini·Claude 웹: README 라우터 적용

웹 AI가 저장소를 읽을 수 있으면 README 최상단 라우터가 [웹 실행 번들](platforms/web/SKALA-REVIEW-WEB-BUNDLE.md)로 연결합니다. 설치 불가 안내나 코드 리뷰 설명을 하지 않고 첫 복습 질문부터 시작하는 것이 정상 동작입니다.

README를 읽을 수 없는 웹 대화에서는 [웹 브라우저 사용 안내](platforms/web/README.md)에 따라 웹 실행 번들 전체를 복사하거나 파일로 첨부합니다.

## 공통 복습 흐름

준비를 마친 뒤 새 대화에서 환경에 맞는 시작 문구를 입력합니다. Codex에서는 다음처럼 명시적으로 호출하는 것이 가장 확실합니다.

```text
$skala-review SKALA 복습 시작
```

`$skala-review`를 붙이면 Codex가 이 Skill을 명시적으로 선택합니다. Plugin 화면에 보이는 `SKALA Review` 시작 문구를 눌러도 됩니다. 웹에서는 `$skala-review` 없이 `SKALA 복습 시작`이라고 입력합니다.

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

Codex 또는 Claude Code에서 복습이 끝난 뒤 저장에 동의하면 현재 작업 공간에 다음 구조가 만들어집니다.

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

웹에서는 AI가 로컬 폴더에 저장했다고 가정하지 않습니다. 최종 Markdown 보관본을 내려받거나 복사해 두고, 다음 복습 때 파일을 다시 첨부하거나 내용을 붙여 넣습니다. 이전 노트를 받으면 정답을 바로 보여주지 않고 회상 질문부터 시작하도록 웹 지침에 포함되어 있습니다.

## 플랫폼별 결과물

- **Velog**: 제목과 Markdown 본문을 복사해 붙일 수 있게 제공합니다.
- **Notion**: 핵심 요약, 개념 설명, 복습 문답, 다음 질문이 잘 보이는 학습 노트로 제공합니다.
- **Tistory**: 읽기 쉬운 블로그형 Markdown으로 제공하며, HTML은 사용자가 요청할 때만 만듭니다.
- **일반 Markdown**: 특정 플랫폼에 종속되지 않는 `.md` 형식으로 제공합니다.

Skill은 플랫폼에 로그인하거나 글을 자동으로 게시하지 않습니다. 사용자가 결과를 검토하고 직접 복사·수정·게시합니다.

## 웹 브라우저에서 사용

ChatGPT·Gemini·Claude 웹 사용자는 터미널 설치가 필요 없습니다.

먼저 저장소의 일반 웹 주소를 사용합니다. `.git`은 clone용 주소이므로 웹 AI에 전달할 때는 제외합니다.

```text
https://github.com/yongchane/skala-review-skill
README의 AI 실행 라우터에 따라 현재 환경에 맞게 진행해.
```

웹 AI가 README와 연결된 번들을 읽으면 로컬 설치 없이 현재 대화에서 복습 하네스를 따릅니다. GitHub 접근이 차단된 경우에는 아래 대체 방법을 사용합니다.

1. [자기완결형 웹 실행 번들](platforms/web/SKALA-REVIEW-WEB-BUNDLE.md)을 엽니다.
2. 파일 전체를 복사하거나 `.md` 파일로 내려받습니다.
3. 일반 대화에 전체 내용을 붙여 넣거나 파일을 첨부합니다. 계속 사용하려면 맞춤 GPT, ChatGPT Project, Gemini Gem 또는 Claude Project의 지침에 등록합니다.
4. 다음 문구를 그대로 입력합니다.

```text
첨부하거나 붙여 넣은 SKALA 웹 실행 번들을 이 대화에 적용해줘.
지침을 요약하거나 설명하지 말고 바로 SKALA 복습을 시작해줘.
```

정상적으로 적용되면 AI는 저장소 설치 방법을 설명하는 대신 `오늘 무엇을 배웠나요?`라고 물어봅니다. 복습이 끝나면 Markdown 보관본을 직접 저장하고, 다음 복습 때 다시 첨부합니다.

### 웹 지침은 어디까지 유지되나요?

웹의 일반 채팅에서 `이 스킬을 적용해줘`라고 말하거나 지침을 붙여 넣는 것만으로 계정에 영구 설치되지는 않습니다.

| 적용 방식 | 유지 범위 |
|---|---|
| 일반 채팅에 지침 전체 전달 | 현재 채팅에서만 적용 |
| ChatGPT Project instructions | 해당 Project 안의 채팅 |
| 맞춤 GPT | 해당 GPT로 시작한 채팅 |
| Gemini Gem | 해당 Gem으로 시작한 채팅 |
| Claude Project 또는 웹 Skill | 해당 Project·Skill을 사용하는 채팅 |
| Codex·Claude Code Skill 설치 | 로컬에서 제거하기 전까지 재사용 |

일반 채팅 방식은 빠른 체험에 적합하지만, 새 채팅에서는 지침을 다시 전달해야 합니다. 계속 사용할 교육생에게는 Project·맞춤 GPT·Gem 등록을 권장합니다. 다만 이 설정도 계정 전체가 아니라 선택한 Project·GPT·Gem 안에서만 적용됩니다.

GitHub의 웹 지침이 업데이트되어도 이미 등록한 Project·맞춤 GPT·Gem의 내용이 자동으로 바뀌지는 않습니다. 새 버전이 올라오면 [간소화된 웹 공통 지침](platforms/web/SKALA-REVIEW-WEB-INSTRUCTIONS.md)을 다시 복사하고 [웹 실행 번들](platforms/web/SKALA-REVIEW-WEB-BUNDLE.md)을 교체해 주세요.

계정에서 맞춤 기능을 만들 수 없다면 일반 대화의 첫 메시지에 웹 실행 번들을 붙여 넣거나 첨부해 현재 대화에서 사용할 수 있습니다. 서비스별 자세한 과정은 [웹 브라우저 사용 안내](platforms/web/README.md)를 확인해 주세요.

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

## 오픈소스와 기여

이 프로젝트는 [MIT 라이선스](LICENSE)로 제공됩니다. 누구나 라이선스 조건에 따라 사용, 수정, 배포하고 프로젝트 개선에 기여할 수 있습니다.

오픈소스 기여가 처음이어도 괜찮습니다. 오탈자 수정, 더 쉬운 설명, 복습 흐름 개선, 새로운 템플릿, Codex·Claude Code·ChatGPT·Gemini·Claude 웹 호환성 개선을 환영합니다.

기여하는 기본 순서는 다음과 같습니다.

1. 기존 [Issue](https://github.com/yongchane/skala-review-skill/issues)를 검색하거나 새 Issue를 작성합니다.
2. 저장소를 Fork하고 별도 브랜치에서 수정합니다.
3. `node tools/package-skill.mjs`와 `node tools/validate.mjs`를 실행합니다.
4. 변경 이유와 검증 결과를 포함해 Pull Request를 엽니다.

자세한 방법은 [기여 가이드](CONTRIBUTING.md)를 확인해 주세요. 참여할 때는 [행동강령](CODE_OF_CONDUCT.md)을 따라야 하며, 보안·개인정보 문제는 [비공개 제보 안내](SECURITY.md)를 이용해 주세요.

기여 내용에는 다음 자료를 포함하면 안 됩니다.

- 배포가 제한된 강의 PDF·슬라이드·교재 원문
- 교수자나 교육생의 개인정보 또는 비공개 발언
- 개인 복습 기록과 실제 대화 원문
- API 키, 토큰, 계정 정보, 개인 로컬 경로
- 사용 허가를 확인할 수 없는 이미지와 문서

실제 수업 사례가 필요하면 원문 대신 직접 만든 짧은 가상 예시로 바꿔 주세요.

## 개발 및 검증

공통 워크플로와 템플릿은 `core/`에서 관리합니다. 웹 공통 지침은 `core/web/`에서 관리합니다. 패키징 명령은 이 원본들을 합쳐 `platforms/web/SKALA-REVIEW-WEB-BUNDLE.md`를 자동 생성합니다. 생성된 번들을 직접 수정하지 않습니다.

```bash
node tools/package-skill.mjs
node tools/validate.mjs
```

검증은 플러그인 구조, 에이전트·웹 배포본 동기화, 웹 필수 복습 규칙, Markdown 노트 형식, 날짜·제목·키워드 검색을 확인합니다.
