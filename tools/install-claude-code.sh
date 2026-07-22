#!/usr/bin/env bash

set -euo pipefail

repository_url="${SKALA_REVIEW_REPOSITORY_URL:-https://github.com/yongchane/skala-review-skill.git}"
managed_root="${SKALA_REVIEW_HOME:-$HOME/.local/share/skala-review-skill}"
skills_root="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"
skill_target="$skills_root/skala-review"
skill_source="$managed_root/platforms/claude-code/skala-review"

latest_release_tag() {
  git -C "$managed_root" tag --list 'v[0-9]*' --sort=-v:refname | sed -n '1p'
}

checkout_latest_release() {
  git -C "$managed_root" fetch origin --tags --prune

  local release_tag
  release_tag="$(latest_release_tag)"

  if [[ -n "$release_tag" ]]; then
    git -C "$managed_root" checkout --detach --force "$release_tag"
    printf '검증된 Release %s를 설치합니다.\n' "$release_tag"
  else
    git -C "$managed_root" checkout --force main
    git -C "$managed_root" pull --ff-only origin main
    printf '아직 Release가 없어 main 최신본을 설치합니다.\n'
  fi
}

if [[ -e "$managed_root" && ! -d "$managed_root/.git" ]]; then
  printf '오류: 관리 경로가 Git 저장소가 아닙니다: %s\n' "$managed_root" >&2
  printf 'SKALA_REVIEW_HOME을 다른 경로로 지정한 뒤 다시 실행해 주세요.\n' >&2
  exit 1
fi

if [[ ! -d "$managed_root/.git" ]]; then
  mkdir -p "$(dirname "$managed_root")"
  git clone "$repository_url" "$managed_root"
fi

checkout_latest_release

for required_file in \
  "$skill_source/SKILL.md" \
  "$skill_source/references/workflow.md" \
  "$skill_source/templates/first-run-notice.md"; do
  if [[ ! -f "$required_file" ]]; then
    printf '오류: Claude Code Skill 필수 파일이 없습니다: %s\n' "$required_file" >&2
    exit 1
  fi
done

mkdir -p "$skills_root"

if [[ -L "$skill_target" ]]; then
  rm "$skill_target"
elif [[ -e "$skill_target" ]]; then
  backup_target="${skill_target}.backup-$(date +%Y%m%d-%H%M%S)"
  mv "$skill_target" "$backup_target"
  printf '기존 복사 설치본을 백업했습니다: %s\n' "$backup_target"
fi

ln -s "$skill_source" "$skill_target"

version="$(tr -d '[:space:]' < "$managed_root/VERSION")"
printf '\nSKALA Review %s 설치가 완료되었습니다.\n' "$version"
printf 'Skill 연결: %s -> %s\n' "$skill_target" "$skill_source"
printf 'Claude Code를 완전히 종료한 뒤 새 세션에서 /skala-review를 실행해 주세요.\n'
printf '이후 업데이트: bash %s/tools/update-claude-code.sh\n' "$managed_root"
