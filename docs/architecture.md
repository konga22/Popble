# Architecture

PopupMate is now a Flutter app. The architecture follows the provided professor-style Flutter convention, adapted to the Figma redesign.

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

- `main.dart`: thin entrypoint.
- `app/router`: `AppPage`, tab definitions, and `GoRouter` setup.
- `app/theme`: app-wide colors and Material theme.
- `models`: mock data shapes.
- `services`: mock services; no Firebase/API yet.
- `ui/common`: reusable UI building blocks.
- `ui/pages`: screen-level widgets.
