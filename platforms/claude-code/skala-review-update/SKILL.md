---
name: skala-review-update
description: SKALA Review Skill 설치·업데이트 전용 스킬. 사용자가 "SKALA 복습 스킬 업데이트해줘", "SKALA Skill 최신 버전으로 바꿔줘", "복습 스킬 업데이트"라고 명시적으로 요청하거나 /skala-review-update를 호출하면 검증된 최신 GitHub Release로 설치·업데이트하고 Claude Code 재실행을 안내한다.
---

# SKALA Review 업데이트

사용자가 SKALA Review Skill 설치 또는 업데이트를 명시적으로 요청한 경우에만 실행한다. 일반 복습 중에는 업데이트를 확인하거나 실행하지 않는다.

## 실행 순서

1. `~/.local/share/skala-review-skill/tools/update-claude-code.sh`가 있으면 다음 명령을 실행한다.

   ```bash
   bash ~/.local/share/skala-review-skill/tools/update-claude-code.sh
   ```

2. 관리형 설치가 없다면 현재 Git 저장소의 원격 주소가 `yongchane/skala-review-skill`인지 확인한다.
3. 확인된 저장소 루트에 `tools/install-claude-code.sh`가 있으면 다음 명령으로 기존 복사 설치본을 관리형 설치로 전환한다.

   ```bash
   bash <저장소-루트>/tools/install-claude-code.sh
   ```

4. 두 경로를 모두 찾을 수 없다면 임의의 스크립트를 내려받아 실행하지 않는다. 공식 저장소를 먼저 clone하거나 기존 clone 위치를 알려달라고 요청한다.
5. 명령의 실제 출력으로 적용 버전과 검증 성공 여부를 확인한다. 확인하지 않은 성공을 보고하지 않는다.
6. 완료 후 Claude Code를 완전히 종료하고 새 세션에서 `/skala-review`를 실행하라고 안내한다.

## 안전 규칙

- 사용자의 명시적 업데이트 요청을 실행 동의로 취급하되, 런타임이 터미널 권한 확인을 요구하면 해당 확인 절차를 따른다.
- 공식 저장소가 아닌 Git 원격이나 관련 없는 프로젝트에서 설치 스크립트를 실행하지 않는다.
- 업데이트 스크립트가 실패하면 오류를 그대로 요약하고, 이전 버전 복구 여부를 출력에서 확인한다.
- 기존 복습 노트와 `SKALA-Review/` 폴더를 변경하거나 삭제하지 않는다.
- 업데이트가 끝난 현재 세션에서 새 Skill 동작을 보장하지 않는다. 반드시 재실행을 안내한다.
