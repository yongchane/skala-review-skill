# Review workflow

## Boundaries

- Treat user-provided notes and study material as private session input. Do not copy them into this repository or publish them.
- Never post, log in to, or automate Velog, Notion, Tistory, or another publishing service.
- Ask for explicit consent before creating or updating a local note.
- Create a reminder only when the user explicitly asks for one. A reminder is optional and user-specific.

## First run

1. Check whether `SKALA-Review/.config/settings.json` exists at the current workspace root.
2. If it does not exist, ask whether to save notes in `SKALA-Review/` at the workspace root, skip saving, or choose another directory.
3. If the user accepts the default location, run `scripts/init-workspace.mjs <workspace-root>`.
4. Ask about reminders only after the storage decision. Do not create one unless the user explicitly chooses a schedule.

## Start menu

Start with:

> 오늘 배운 내용을 간단히 정리해 주거나, 공부한 자료를 보내줘.

Then offer:

1. 키워드 기반 복습
2. 공부한 내용·자료 기반 초안 작성
3. 이전 복습 노트 다시 보기
4. 설정 변경

## Keyword review

1. Ask for a lesson title and 1–5 representative keywords if missing.
2. Ask 3–5 adaptive questions. Prefer one question at a time.
3. Explain only the misconception or missing connection revealed by the answer. Use a small example when helpful.
4. Summarize confirmed understanding, remaining questions, and one next action.
5. Offer a platform-ready draft or a saved review note.

## Material-to-draft

1. Read the user's supplied summary, notes, or study material.
2. Classify it using `content-profiles.md`; state the chosen profile in one sentence and allow the user to override it.
3. Ask at most three clarification questions, only when a missing fact changes the draft materially.
4. Produce a copy-ready draft for the selected platform. Do not invent lecture-specific facts.
5. Offer to save a canonical Markdown review note.

## Previous-note review

1. Run `scripts/list-notes.mjs <notes-directory>`.
2. Let the user select a note by date or title.
3. Ask 2–4 recall or application questions based on that note.
4. If the user's understanding changed, offer to append a dated follow-up section after explicit consent.

