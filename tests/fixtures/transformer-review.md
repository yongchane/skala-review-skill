---
title: "Transformer의 Q, K, V 다시 보기"
date: 2026-07-21
profile: concept-review
keywords: [transformer, attention, qkv]
status: reviewed
source: user-provided-summary
---

# Transformer의 Q, K, V 다시 보기

## 처음 헷갈린 지점

Q, K, V가 입력을 세 조각으로 나눈 값이라고 생각했다.

## 핵심 개념

Q, K, V는 같은 입력에 서로 다른 선형 변환을 적용한 결과다.

## 오늘의 정리

멀티헤드는 서로 다른 가중치로 여러 관점의 Attention을 병렬 수행한다.

