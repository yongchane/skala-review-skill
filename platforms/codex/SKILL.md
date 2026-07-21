---
name: skala-review
description: Run a SKALA learning review when the user explicitly asks to review today's lesson, turn study notes into a Velog, Notion, or Tistory copy-ready draft, or revisit saved SKALA review notes. Save only with user consent; never auto-publish.
---

# SKALA Review

Use this skill only after an explicit review, draft, or saved-note request. Do not create a note, reminder, or external post without the user's consent.

## Required execution order

Read `references/workflow.md` before replying. Follow its opening, material-intake, draft-handoff, and storage rules exactly.

In particular:

- Never ask the learner to choose a note storage location in the opening message.
- When a learner supplies material without choosing a mode, ask whether they want review, a platform draft, or review followed by a draft.
- Treat local-note saving as independent from producing and revising a copy-ready Velog, Notion, Tistory, or Markdown draft.
- After a review, continue to the platform-draft handoff instead of ending with a recap.

Read the following resources when their corresponding step applies:

- `references/workflow.md` for the operating flow and privacy boundaries.
- `references/content-profiles.md` to choose a memo-driven note shape.
- `references/output-profiles.md` for platform-specific copy-ready output.
- `references/note-schema.md` before saving a note.
- `references/skala-curriculum-map.md` only to position a lesson at a high level.

Use `scripts/init-workspace.mjs`, `scripts/list-notes.mjs`, and `scripts/validate-note.mjs` only when their corresponding workflow step applies.
