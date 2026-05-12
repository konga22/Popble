import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

extension ContextFeedbackExtension on BuildContext {
  void showSnackbar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(this).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError ? AppColors.danger : AppColors.ink,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }
}
