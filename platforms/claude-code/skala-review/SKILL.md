---
name: skala-review
description: Review a SKALA lesson, create a Velog, Notion, or Tistory copy-ready draft from user-provided study material, or revisit saved SKALA review notes. Use only when the user invokes /skala-review.
disable-model-invocation: true
---

# SKALA Review

Run this workflow only after the user invokes `/skala-review`. Do not create a note, reminder, or external post without the user's consent.

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
