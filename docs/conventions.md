# Conventions

- Use Flutter/Dart with strict, readable page-first code.
- Keep route names in `AppPage`; use `goNamed`, `pushNamed`, and `pop`.
- Use `lucide_icons_flutter` for all icons.
- Keep reusable widgets in `ui/common`.
- Keep data and mock behavior in `services`.
- Use `TextEditingController` for forms and dispose controllers.
- Validate before service calls and show user-facing snackbars through `context.showSnackbar`.
- Run `dart format lib test`, `flutter analyze`, and `flutter test` before PR.
