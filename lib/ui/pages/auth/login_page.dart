import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/context_extension.dart';
import '../../../app/extensions/spacing_extension.dart';
import '../../../app/router/app_page.dart';
import '../../../app/theme/app_theme.dart';
import '../../../services/mock_auth_service.dart';
import '../../common/app_components.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController(text: 'example@email.com');
  final _passwordController = TextEditingController(text: 'popupmate');
  bool _loading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _onLogin() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text.trim();

    if (email.isEmpty || password.isEmpty) {
      context.showSnackbar('이메일과 비밀번호를 입력해주세요.', isError: true);
      return;
    }

    setState(() => _loading = true);
    final success = await MockAuthService.login(
      email: email,
      password: password,
    );
    if (!mounted) return;
    setState(() => _loading = false);

    if (!success) {
      context.showSnackbar('로그인 정보를 다시 확인해주세요.', isError: true);
      return;
    }

    context.goNamed(AppPage.home.name);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  '반갑습니다!',
                  style: TextStyle(
                    color: AppColors.ink,
                    fontFamily: 'MoveSans',
                    fontSize: 32,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                10.heightBox,
                const Text(
                  '로그인하여 당신만의 팝업 큐레이션을 시작해보세요.',
                  style: TextStyle(color: AppColors.body, height: 1.5),
                ),
                36.heightBox,
                PrimaryButton(
                  label: '카카오로 시작하기',
                  icon: LucideIcons.messageCircle,
                  onPressed: () => context.goNamed(AppPage.home.name),
                ),
                12.heightBox,
                OutlinedButton.icon(
                  onPressed: () => context.goNamed(AppPage.home.name),
                  icon: const Icon(LucideIcons.apple),
                  label: const Text('Apple로 로그인'),
                  style: OutlinedButton.styleFrom(
                    minimumSize: const Size.fromHeight(52),
                    foregroundColor: AppColors.ink,
                    side: const BorderSide(color: AppColors.border),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
                26.heightBox,
                const Center(
                  child: Text('OR', style: TextStyle(color: AppColors.muted)),
                ),
                26.heightBox,
                LabelTextField(
                  label: '이메일 주소',
                  hint: 'example@email.com',
                  controller: _emailController,
                  icon: LucideIcons.mail,
                ),
                20.heightBox,
                LabelTextField(
                  label: '비밀번호',
                  hint: '비밀번호를 입력하세요',
                  controller: _passwordController,
                  icon: LucideIcons.lockKeyhole,
                  enableObscure: true,
                ),
                28.heightBox,
                PrimaryButton(
                  label: '로그인',
                  loading: _loading,
                  onPressed: _onLogin,
                ),
                12.heightBox,
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    TextButton(
                      onPressed: () => showNotReadySnackBar(context),
                      child: const Text('비밀번호 찾기'),
                    ),
                    TextButton(
                      onPressed: () => showNotReadySnackBar(context),
                      child: const Text('회원가입'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
