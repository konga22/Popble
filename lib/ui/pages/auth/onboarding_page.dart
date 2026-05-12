import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/spacing_extension.dart';
import '../../../app/router/app_page.dart';
import '../../../app/theme/app_theme.dart';
import '../../common/app_components.dart';

class OnboardingPage extends StatelessWidget {
  const OnboardingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'POPMATE',
                style: TextStyle(
                  color: AppColors.ink,
                  fontSize: 13,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 1.8,
                ),
              ),
              const Spacer(),
              Container(
                height: 310,
                width: double.infinity,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(28),
                  gradient: const LinearGradient(
                    colors: [Color(0xFF2F3138), Color(0xFFBCA99B)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                child: const Center(
                  child: Icon(
                    LucideIcons.sparkles,
                    color: Colors.white,
                    size: 70,
                  ),
                ),
              ),
              42.heightBox,
              const Text(
                '내 취향에 딱 맞는\n팝업 탐색',
                style: TextStyle(
                  color: AppColors.ink,
                  fontFamily: 'MoveSans',
                  fontSize: 34,
                  fontWeight: FontWeight.w700,
                  height: 1.12,
                ),
              ),
              14.heightBox,
              const Text(
                '웨이팅 시간 예측부터 맞춤형 큐레이션까지\n당신만의 감각적인 경험을 제안합니다.',
                style: TextStyle(
                  color: AppColors.body,
                  fontSize: 15,
                  height: 1.55,
                ),
              ),
              34.heightBox,
              PrimaryButton(
                label: '시작하기',
                icon: LucideIcons.arrowRight,
                onPressed: () => context.goNamed(AppPage.permissions.name),
              ),
              12.heightBox,
              Center(
                child: TextButton(
                  onPressed: () => context.goNamed(AppPage.login.name),
                  child: const Text('이미 계정이 있으신가요? 로그인'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
