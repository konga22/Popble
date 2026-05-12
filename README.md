# PopupMate

PopupMate는 한국의 팝업 스토어를 탐색, 저장, 공유하는 모바일 앱입니다. 현재 버전은 Figma 최종본을 Flutter로 옮기는 mock UI 리빌드 단계입니다.

## Tech Stack

| Area | Stack |
| --- | --- |
| Framework | Flutter |
| Language | Dart |
| Routing | go_router |
| Icons | lucide_icons_flutter |
| State | Local widget state + mock services |
| Target | iOS / Android |

## Getting Started

```bash
flutter pub get
flutter analyze
flutter test
flutter run
```

iOS Simulator:

```bash
flutter run -d ios
```

Android Emulator:

```bash
flutter run -d android
```

## Project Structure

```text
lib/
  main.dart
  app/
    router/
    theme/
    extensions/
  models/
  services/
  ui/
    common/
    pages/
```

## Current Scope

- Figma `409:11104` final section 기준 mock UI 구현
- Loading, Onboarding, Permission, Login, Home 진입 흐름
- 하단 탭: Search, Map, Home, Community, Profile
- Popup detail, reviews, community, waiting, inventory, calendar, profile detail
- Firebase/Auth/Firestore/Storage는 아직 연결하지 않음

## Team Workflow

- `master`: stable/release
- `dev`: integration branch
- `team/<github-id>`: teammate branches
- PR은 `dev` 대상으로 만들고 PM이 최종 merge합니다.

## Checks Before PR

```bash
dart format lib test
flutter analyze
flutter test
git diff --check
```
