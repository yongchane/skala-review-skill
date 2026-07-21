---
name: skala-review
description: Review a SKALA lesson, create a Velog, Notion, or Tistory copy-ready draft from user-provided study material, or revisit saved SKALA review notes. Use only when the user invokes /skala-review.
disable-model-invocation: true
---

# SKALA Review

Run this workflow only after the user invokes `/skala-review`. Do not create a note, reminder, or external post without the user's consent.

Read the following resources as needed:

- `references/workflow.md` for the operating flow and privacy boundaries.
- `references/content-profiles.md` to choose a memo-driven note shape.
- `references/output-profiles.md` for platform-specific copy-ready output.
- `references/note-schema.md` before saving a note.
- `references/skala-curriculum-map.md` only to position a lesson at a high level.

Use `scripts/init-workspace.mjs`, `scripts/list-notes.mjs`, and `scripts/validate-note.mjs` only when their corresponding workflow step applies.

