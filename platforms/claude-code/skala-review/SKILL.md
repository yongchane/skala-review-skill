---
name: skala-review
description: SKALA 교육생의 복습 진행 스킬. /skala-review 호출 후 강의 PDF·메모·키워드로 질문식 복습을 진행하고, 플랫폼용 초안과 동의한 Markdown 노트를 만들거나 날짜·제목·키워드로 이전 노트를 재복습한다.
disable-model-invocation: true
---

# SKALA 복습

사용자가 `/skala-review`를 호출한 경우에만 이 흐름을 실행한다. 사용자 동의 없이 노트, 알림 또는 외부 게시물을 만들지 않는다.

## 필수 실행 순서

답변하기 전에 `references/workflow.md`를 읽고 시작 안내, 자료 입력, 초안 전환, 저장 규칙을 정확히 따른다.

특히 다음 사항을 지킨다.

- 첫 안내에서 복습 노트 저장 위치를 선택하게 하지 않는다.
- 사용자가 진행 방식을 정하지 않고 자료를 제공하면 복습, 플랫폼 초안, 복습 후 초안 중 하나를 선택하게 한다.
- 로컬 노트 저장과 Velog·Notion·Tistory·Markdown용 복사 가능한 초안 생성 및 수정은 서로 독립적으로 처리한다.
- 복습을 요약으로 끝내지 말고 플랫폼 초안 전환 단계로 이어간다.
- PDF를 사용하면 제한 자료 안내를 부드럽게 한 번 보여주고, 요약이나 필요한 구간을 우선하며, 실제 수업 범위를 확인한 뒤 복습한다.
- 복습 후 선택적인 Markdown 저장을 제안해 날짜·제목·키워드로 다시 찾고 정답을 보기 전에 회상할 수 있게 한다.
- 비전공자도 이해할 수 있는 쉬운 한국어를 사용하고 한 번에 질문 하나만 한다. 미완성 메모와 `모르겠어요`를 실패가 아니라 정상적인 출발점으로 취급한다.

해당 단계에서 필요한 자료만 읽는다.

- `references/workflow.md`: 전체 진행 흐름과 자료 보호 원칙
- `references/content-profiles.md`: 입력 내용에 맞는 노트 구조 선택
- `references/output-profiles.md`: 플랫폼별 복사 가능한 출력 형식
- `references/note-schema.md`: 노트를 저장하기 전 표준 형식 확인
- `references/skala-curriculum-map.md`: 수업을 큰 교육 과정 안에서 설명할 때만 사용

각 진행 단계에서 필요한 경우에만 `scripts/init-workspace.mjs`, `scripts/list-notes.mjs`, `scripts/validate-note.mjs`를 사용한다.
