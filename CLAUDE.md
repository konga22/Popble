# 팝업메이트 — Flutter 작업 가이드

## 프로젝트 개요

**PopupMate**는 한국의 팝업 스토어를 발견, 탐색, 공유하는 모바일 앱이다.
피그마 파일은 `C8fidVKmN9LrNnDkIVbLyu`이고, 이번 Flutter 리빌드는 `409:11104` 최종 디자인을 기준으로 한다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Flutter |
| 언어 | Dart |
| 라우팅 | GoRouter |
| 아이콘 | lucide_icons_flutter |
| 데이터 | Mock service |
| 플랫폼 | iOS / Android |

## 구조

```text
PopupMate/
├── lib/
│   ├── main.dart
│   ├── app/
│   │   ├── router/
│   │   ├── theme/
│   │   └── extensions/
│   ├── models/
│   ├── services/
│   └── ui/
│       ├── common/
│       └── pages/
├── assets/
├── docs/
├── android/
├── ios/
└── pubspec.yaml
```

## 핵심 규칙

- `main.dart`는 `runApp(const AppRoot())`만 담당한다.
- `AppRoot`는 `MaterialApp.router`, `AppTheme.light`, `appRouter` 연결만 담당한다.
- 라우트는 `AppPage` enum과 extension으로 관리하고, 화면에서 raw path string을 직접 쓰지 않는다.
- 탭 이동은 `goNamed`, 상세/작성/웨이팅 같은 하위 플로우는 `pushNamed`, 닫기는 `pop`을 사용한다.
- 공통 UI는 `lib/ui/common/`에 둔다.
- 화면은 `lib/ui/pages/<feature>/` 아래에 둔다.
- 실제 Firebase/Auth/Firestore 연동 전까지 데이터는 `lib/services/`의 mock service로만 공급한다.
- 아이콘은 Lucide만 사용한다.

## 참고 문서

- [README](./README.md)
- [디자인 시스템](./docs/design-system.md)
- [아키텍처](./docs/architecture.md)
- [코딩 컨벤션](./docs/conventions.md)
- [화면 목록](./docs/screens.md)
