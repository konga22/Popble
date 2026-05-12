import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/assets/app_assets.dart';
import '../../../app/router/app_page.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  static const _background = Color(0xFFFCF8F9);
  static const _ink = Color(0xFF1C1B1C);
  static const _title = Color(0xFF393C43);
  static const _body = Color(0xFF45474B);
  static const _muted = Color(0xFF76777B);
  static const _border = Color(0xFFC6C6CB);

  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _loading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _onLogin() async {
    setState(() => _loading = true);
    await Future<void>.delayed(const Duration(milliseconds: 300));
    if (!mounted) return;
    setState(() => _loading = false);
    context.goNamed(AppPage.home.name);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _background,
      body: Stack(
        children: [
          Positioned(
            left: -160,
            bottom: -18,
            child: ImageFiltered(
              imageFilter: ImageFilter.blur(sigmaX: 70, sigmaY: 70),
              child: Container(
                width: 320,
                height: 320,
                decoration: BoxDecoration(
                  color: const Color(0xFFD4C3B8).withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(160),
                ),
              ),
            ),
          ),
          SafeArea(
            child: Column(
              children: [
                SizedBox(
                  height: 64,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20,
                      vertical: 8,
                    ),
                    child: Row(
                      children: [
                        const Text(
                          'PopupMate',
                          style: TextStyle(
                            color: _title,
                            fontSize: 24,
                            fontWeight: FontWeight.w700,
                            height: 32 / 24,
                            letterSpacing: -0.24,
                          ),
                        ),
                        const Spacer(),
                        IconButton(
                          onPressed: () {
                            if (context.canPop()) {
                              context.pop();
                              return;
                            }
                            context.goNamed(AppPage.onboarding.name);
                          },
                          icon: const Icon(
                            LucideIcons.x,
                            color: _title,
                            size: 20,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.fromLTRB(20, 12, 20, 12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(height: 16),
                        const Text(
                          '반갑습니다!',
                          style: TextStyle(
                            color: _ink,
                            fontSize: 32,
                            fontWeight: FontWeight.w500,
                            height: 40 / 32,
                          ),
                        ),
                        const SizedBox(height: 8),
                        const SizedBox(
                          width: 328,
                          child: Text(
                            '로그인하여 당신만의 팝업 큐레이션을 시작해보세요.',
                            style: TextStyle(
                              color: _body,
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                              height: 24 / 16,
                            ),
                          ),
                        ),
                        const SizedBox(height: 24),
                        _SocialButton(
                          label: '카카오로 시작하기',
                          backgroundColor: const Color(0xFFFEE500),
                          textColor: const Color(0xFF191919),
                          assetIcon: AppAssets.loginKakao,
                          iconSize: 20,
                          onPressed: _onLogin,
                        ),
                        const SizedBox(height: 12),
                        _SocialButton(
                          label: 'Apple로 로그인',
                          backgroundColor: _ink,
                          textColor: Colors.white,
                          lucideIcon: LucideIcons.apple,
                          iconSize: 18,
                          iconColor: Colors.white,
                          onPressed: _onLogin,
                          fontWeight: FontWeight.w700,
                        ),
                        const SizedBox(height: 22),
                        const _DividerWithText(),
                        const SizedBox(height: 22),
                        _FigmaTextField(
                          label: '이메일 주소',
                          hint: 'example@email.com',
                          controller: _emailController,
                          keyboardType: TextInputType.emailAddress,
                        ),
                        const SizedBox(height: 14),
                        _FigmaTextField(
                          label: '비밀번호',
                          hint: '비밀번호를 입력하세요',
                          controller: _passwordController,
                          obscureText: true,
                        ),
                        const SizedBox(height: 16),
                        SizedBox(
                          width: double.infinity,
                          height: 56,
                          child: ElevatedButton(
                            onPressed: _loading ? null : _onLogin,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: _title,
                              foregroundColor: Colors.white,
                              disabledBackgroundColor: _title,
                              elevation: 0,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(8),
                              ),
                              textStyle: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                                height: 24 / 16,
                              ),
                            ),
                            child:
                                _loading
                                    ? const SizedBox(
                                      width: 18,
                                      height: 18,
                                      child: CircularProgressIndicator(
                                        strokeWidth: 2,
                                        color: Colors.white,
                                      ),
                                    )
                                    : const Text('로그인'),
                          ),
                        ),
                        const SizedBox(height: 16),
                        const _LoginLinks(),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _SocialButton extends StatelessWidget {
  const _SocialButton({
    required this.label,
    required this.backgroundColor,
    required this.textColor,
    required this.iconSize,
    required this.onPressed,
    this.assetIcon,
    this.lucideIcon,
    this.iconColor,
    this.fontWeight = FontWeight.w500,
  });

  final String label;
  final Color backgroundColor;
  final Color textColor;
  final String? assetIcon;
  final IconData? lucideIcon;
  final double iconSize;
  final Color? iconColor;
  final VoidCallback onPressed;
  final FontWeight fontWeight;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 56,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: backgroundColor,
          foregroundColor: textColor,
          elevation: 1,
          shadowColor: Colors.black.withValues(alpha: 0.05),
          padding: const EdgeInsets.symmetric(horizontal: 20),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: TextStyle(
            fontSize: 16,
            fontWeight: fontWeight,
            height: 24 / 16,
          ),
        ),
        child: SizedBox(
          width: double.infinity,
          child: Stack(
            alignment: Alignment.center,
            children: [
              Align(
                alignment: Alignment.centerLeft,
                child: _SocialButtonIcon(
                  assetIcon: assetIcon,
                  iconData: lucideIcon,
                  size: iconSize,
                  color: iconColor,
                ),
              ),
              Text(label),
            ],
          ),
        ),
      ),
    );
  }
}

class _SocialButtonIcon extends StatelessWidget {
  const _SocialButtonIcon({
    required this.assetIcon,
    required this.iconData,
    required this.size,
    required this.color,
  });

  final String? assetIcon;
  final IconData? iconData;
  final double size;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    if (iconData != null) {
      return Icon(iconData, size: size, color: color);
    }

    return SvgPicture.asset(
      assetIcon!,
      width: size,
      height: size,
      colorFilter:
          color == null ? null : ColorFilter.mode(color!, BlendMode.srcIn),
    );
  }
}

class _DividerWithText extends StatelessWidget {
  const _DividerWithText();

  @override
  Widget build(BuildContext context) {
    return const Row(
      children: [
        Expanded(child: Divider(color: _LoginPageState._border, height: 1)),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            'OR',
            style: TextStyle(
              color: _LoginPageState._muted,
              fontSize: 12,
              fontWeight: FontWeight.w700,
              height: 16 / 12,
              letterSpacing: 0.6,
            ),
          ),
        ),
        Expanded(child: Divider(color: _LoginPageState._border, height: 1)),
      ],
    );
  }
}

class _FigmaTextField extends StatelessWidget {
  const _FigmaTextField({
    required this.label,
    required this.hint,
    required this.controller,
    this.keyboardType,
    this.obscureText = false,
  });

  final String label;
  final String hint;
  final TextEditingController controller;
  final TextInputType? keyboardType;
  final bool obscureText;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            color: _LoginPageState._muted,
            fontSize: 12,
            fontWeight: FontWeight.w500,
            height: 16 / 12,
            letterSpacing: 0.6,
          ),
        ),
        const SizedBox(height: 8),
        SizedBox(
          height: 56,
          child: TextField(
            controller: controller,
            obscureText: obscureText,
            keyboardType: keyboardType,
            cursorColor: _LoginPageState._title,
            style: const TextStyle(
              color: _LoginPageState._ink,
              fontSize: 16,
              fontWeight: FontWeight.w400,
              height: 24 / 16,
            ),
            decoration: InputDecoration(
              hintText: hint,
              hintStyle: const TextStyle(
                color: _LoginPageState._border,
                fontSize: 16,
                fontWeight: FontWeight.w400,
                height: 24 / 16,
              ),
              filled: true,
              fillColor: Colors.white,
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 18,
                vertical: 16,
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(4),
                borderSide: const BorderSide(color: _LoginPageState._border),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(4),
                borderSide: const BorderSide(color: _LoginPageState._border),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(4),
                borderSide: const BorderSide(color: _LoginPageState._title),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _LoginLinks extends StatelessWidget {
  const _LoginLinks();

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _FooterLink(label: '비밀번호 찾기', onTap: () {}),
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 24),
          child: SizedBox(
            width: 4,
            height: 4,
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: _LoginPageState._border,
                shape: BoxShape.circle,
              ),
            ),
          ),
        ),
        _FooterLink(label: '회원가입', onTap: () {}),
      ],
    );
  }
}

class _FooterLink extends StatelessWidget {
  const _FooterLink({required this.label, required this.onTap});

  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Text(
        label,
        style: const TextStyle(
          color: _LoginPageState._body,
          fontSize: 14,
          fontWeight: FontWeight.w500,
          height: 20 / 14,
          decoration: TextDecoration.underline,
        ),
      ),
    );
  }
}
