# Review workflow

## Boundaries

- Treat user-provided notes and study material as private session input. Do not copy them into this repository or publish them.
- Never post, log in to, or automate Velog, Notion, Tistory, or another publishing service.
- Ask for explicit consent before creating or updating a local note.
- Create a reminder only when the user explicitly asks for one. A reminder is optional and user-specific.

## Storage is never a gate

- A learner must be able to review, receive a copy-ready draft, and revise that draft without selecting a storage location.
- Do **not** ask about `SKALA-Review/`, settings, or reminders in the opening message.
- Ask about a storage location only after the learner explicitly asks to save a finalized note. Then check whether `SKALA-Review/.config/settings.json` exists at the current workspace root.
- If it does not exist, offer the default location, a different directory, or cancellation. If the learner accepts the default, run `scripts/init-workspace.mjs <workspace-root>`.
- Ask about reminders only when the learner explicitly asks to configure one. Do not introduce reminders during a normal review.

## Start menu

Start with:

> 오늘 배운 내용을 간단히 정리해 주거나, 공부한 자료를 보내줘.

When the learner has not yet supplied a topic or material, also present the following choices. Do not ask a storage question here.

1. 키워드 기반 복습
2. 공부한 내용·자료 기반 초안 작성
3. 복습 후 초안 작성
4. 이전 복습 노트 다시 보기
5. 설정 변경

## Material intake and mode selection

When the learner supplies notes, a PDF, a screenshot, or a short lesson summary **without clearly selecting a mode**, first acknowledge the material and ask:

> 자료를 확인했어요. 어떻게 진행할까요?
>
> 1. 핵심을 질문으로 점검하는 복습
> 2. Velog·Notion·Tistory에 올릴 초안 작성
> 3. 복습한 뒤 그 내용을 바탕으로 초안 작성

- Treat statements such as “저장 없이 진행” as a storage preference only. They do **not** select a review or draft mode.
- If the learner explicitly asks for a draft, skip this choice and start the draft flow.
- If the learner explicitly asks for review, start the review flow; when review ends, continue to the draft handoff below.
- Do not classify material and begin questions before this choice, unless the learner explicitly selected a mode.

## Keyword review

1. Ask for a lesson title and 1–5 representative keywords if missing.
2. Ask 3–5 adaptive questions. Prefer one question at a time.
3. Explain only the misconception or missing connection revealed by the answer. Use a small example when helpful.
4. Summarize confirmed understanding, remaining questions, and one next action.
5. Continue to the draft handoff. Do not end the session at the recap.

## Material-to-draft

1. Read the user's supplied summary, notes, or study material.
2. Classify it using `content-profiles.md`; state the chosen profile in one sentence and allow the user to override it.
3. Ask at most three clarification questions, only when a missing fact changes the draft materially.
4. Produce a copy-ready draft for the selected platform. Do not invent lecture-specific facts.
5. Enter the revision loop below.

## Draft handoff and revision loop

After a keyword review, always say that the learner can now turn the reviewed content into a draft. Ask for a target: `Velog`, `Notion`, `Tistory`, or `일반 Markdown`. If the learner already named a target, do not ask again.

1. Produce the first copy-ready draft directly in chat. This output is required even when the learner chose not to save a local note.
2. Ask what they want to change: explanation depth, title, tone, section order, examples, images, or a missing point.
3. Revise the draft with the learner until they say it is final.
4. Only then offer to save the finalized canonical Markdown note. Saving is optional and separate from receiving the draft.

Never respond to a request for a Velog, Notion, or Tistory draft by saying that no file can be made merely because the learner selected “저장 없이 진행.” “저장 없이” means no local archive; it does not prohibit copy-ready text.

## Previous-note review

1. Run `scripts/list-notes.mjs <notes-directory>`.
2. Let the user select a note by date or title.
3. Ask 2–4 recall or application questions based on that note.
4. If the user's understanding changed, offer to append a dated follow-up section after explicit consent.
