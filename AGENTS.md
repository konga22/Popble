# PopupMate — Flutter Guide

## Project Overview

PopupMate는 한국의 팝업 스토어를 발견, 탐색, 저장, 공유하는 모바일 앱이다.
현재 구현은 Figma `C8fidVKmN9LrNnDkIVbLyu`, section `409:11104` 최종본을 기준으로 한 Flutter mock UI 리빌드다.

## Stack

| Area | Tech |
| --- | --- |
| Framework | Flutter |
| Language | Dart |
| Routing | go_router |
| Icons | lucide_icons_flutter |
| Platforms | iOS / Android |
| Backend | Mock services only for now |

## Structure

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

## Required Style

- Keep `main.dart` thin: `runApp(const AppRoot())` only.
- Use `MaterialApp.router`, `GoRouter`, and enum route names.
- Keep route paths in `AppPage`; do not hardcode paths in pages.
- Use `goNamed` for root tab flow changes, `pushNamed` for detail/write/waiting flows, and `pop` for temporary flow exits.
- Use `AppTheme` and `AppColors` instead of scattering color literals, except for local visual gradients/placeholders.
- Use `lucide_icons_flutter` icons only.
- Keep external/data behavior in `services/`; pages should consume mock services, not own global data.
- Keep reusable UI in `ui/common/`.
- Add controllers to `State`, dispose them, validate before mock service calls, and check `mounted` after `await`.
- Use short, user-facing snackbar messages through `context.showSnackbar`.

## Design Direction

- Visual design follows Figma first.
- Figma `Curated` copy is replaced with `PopupMate`.
- Current color base:
  - background `#FCF8F9`
  - ink `#393C43`
  - nav surface `#F0EDED`
  - border `#C6C6CB`
- UI should feel mobile-first, restrained, and practical.

## Verification

Run before PR:

```bash
dart format lib test
flutter analyze
flutter test
git diff --check
```
