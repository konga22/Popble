import 'package:flutter/material.dart';

class AppColors {
  const AppColors._();

  static const background = Color(0xFFFCF8F9);
  static const surface = Color(0xFFFFFFFF);
  static const surfaceAlt = Color(0xFFF0EDED);
  static const ink = Color(0xFF393C43);
  static const body = Color(0xFF5F626B);
  static const muted = Color(0xFF8A8D96);
  static const border = Color(0xFFC6C6CB);
  static const softBorder = Color(0xFFE5E1E2);
  static const accent = Color(0xFF2F3138);
  static const danger = Color(0xFFB84040);
  static const success = Color(0xFF4D7A58);
  static const warning = Color(0xFFA06A2D);
  static const chip = Color(0xFFF5F1F2);
  static const darkNavy = Color(0xFF0F172A);
}

class AppTheme {
  const AppTheme._();

  static ThemeData get light {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: AppColors.ink,
      brightness: Brightness.light,
      primary: AppColors.ink,
      surface: AppColors.surface,
      error: AppColors.danger,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: AppColors.background,
      fontFamily: 'MoneygraphyRounded',
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.background,
        foregroundColor: AppColors.ink,
        centerTitle: false,
        elevation: 0,
        titleTextStyle: TextStyle(
          color: AppColors.ink,
          fontFamily: 'MoveSans',
          fontSize: 24,
          fontWeight: FontWeight.w700,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.ink,
          foregroundColor: Colors.white,
          minimumSize: const Size.fromHeight(52),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.surface,
        hintStyle: const TextStyle(color: AppColors.muted),
        prefixIconColor: AppColors.muted,
        suffixIconColor: AppColors.muted,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.softBorder),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.ink),
        ),
      ),
    );
  }
}
