---
title: "Transformer의 Q, K, V 다시 보기"
date: 2026-07-21
profile: concept-review
keywords: [transformer, attention, qkv]
status: reviewed
source: user-provided-summary
skala_module: "생성형 AI 서비스 개발"
---

# Transformer의 Q, K, V 다시 보기

## 처음 헷갈린 지점

Q, K, V가 입력을 세 조각으로 나눈 값이라고 생각했다.

## 핵심 개념

Q, K, V는 같은 입력에 서로 다른 선형 변환을 적용한 결과다.

## 복습 질문과 내 답

Q, K, V를 입력의 세 조각으로 나누는 것으로 잘못 이해했지만, 질문을 통해 서로 다른 투영 결과라는 점을 수정했다.

## SKALA 과정·프로젝트 연결

Transformer 기반 LLM과 검색·질의응답 기능을 이해하는 데 연결된다.

## 오늘의 정리

멀티헤드는 서로 다른 가중치로 여러 관점의 Attention을 병렬 수행한다.

## 다음에 다시 볼 질문

왜 Attention score에 softmax를 적용할까?
