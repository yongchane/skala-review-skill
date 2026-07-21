# Output profiles

## Velog

Return Markdown that can be pasted directly: title, concise introduction, headings selected by the content profile, code blocks when supplied, and `[이미지: 설명]` placeholders when the user asks for an image location.

## Notion

Return a study-note layout that pastes cleanly into Notion: title, key takeaways, explanation, question-and-answer or practice record, and next review prompts. Do not require Notion-specific API blocks.

## Tistory

Return a blog-oriented Markdown draft: searchable title, a short lead paragraph, readable headings, and a closing takeaway. Provide HTML only when the user explicitly asks for it.

## Shared rules

- Default to copy-ready text in chat.
- Preserve uncertainty with labels such as `확인 필요` instead of filling gaps.
- Never claim a platform upload succeeded; publishing is performed by the user.

