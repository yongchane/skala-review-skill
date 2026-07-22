#!/usr/bin/env bash

set -euo pipefail

managed_root="${SKALA_REVIEW_HOME:-$HOME/.local/share/skala-review-skill}"
skills_root="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"

if [[ ! -d "$managed_root/.git" ]]; then
  printf '관리형 설치를 찾을 수 없습니다: %s\n' "$managed_root" >&2
  printf '먼저 저장소에서 tools/install-claude-code.sh를 실행해 주세요.\n' >&2
  exit 1
fi

for skill_name in skala-review skala-review-update; do
  skill_target="$skills_root/$skill_name"
  if [[ ! -L "$skill_target" ]]; then
    printf '현재 Skill이 관리형 심볼릭 링크 설치가 아닙니다: %s\n' "$skill_target" >&2
    printf 'tools/install-claude-code.sh를 한 번 실행해 기존 설치를 마이그레이션해 주세요.\n' >&2
    exit 1
  fi
done

old_commit="$(git -C "$managed_root" rev-parse HEAD)"
old_version="$(tr -d '[:space:]' < "$managed_root/VERSION")"

git -C "$managed_root" fetch origin --tags --prune
latest_tag="$(git -C "$managed_root" tag --list 'v[0-9]*' --sort=-v:refname | sed -n '1p')"

if [[ -z "$latest_tag" ]]; then
  printf '설치 가능한 Release 태그가 없습니다. 현재 버전 %s을 유지합니다.\n' "$old_version"
  exit 0
fi

latest_commit="$(git -C "$managed_root" rev-list -n 1 "$latest_tag")"
if [[ "$old_commit" == "$latest_commit" ]]; then
  printf '이미 최신 Release %s을 사용하고 있습니다.\n' "$latest_tag"
  exit 0
fi

git -C "$managed_root" checkout --detach --force "$latest_tag"

if command -v node >/dev/null 2>&1; then
  if ! node "$managed_root/tools/validate.mjs"; then
    git -C "$managed_root" checkout --detach --force "$old_commit"
    printf '검증에 실패해 이전 버전 %s으로 복구했습니다.\n' "$old_version" >&2
    exit 1
  fi
else
  for required_file in \
    "$managed_root/platforms/claude-code/skala-review/SKILL.md" \
    "$managed_root/platforms/claude-code/skala-review/references/workflow.md" \
    "$managed_root/platforms/claude-code/skala-review/templates/first-run-notice.md" \
    "$managed_root/platforms/claude-code/skala-review-update/SKILL.md"; do
    if [[ ! -f "$required_file" ]]; then
      git -C "$managed_root" checkout --detach --force "$old_commit"
      printf '필수 파일 검증에 실패해 이전 버전 %s으로 복구했습니다.\n' "$old_version" >&2
      exit 1
    fi
  done
fi

new_version="$(tr -d '[:space:]' < "$managed_root/VERSION")"
printf '\nSKALA Review가 %s에서 %s으로 업데이트되었습니다.\n' "$old_version" "$new_version"
printf 'Claude Code를 완전히 종료한 뒤 새 세션에서 /skala-review를 실행해 주세요.\n'
