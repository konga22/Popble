import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:go_router/go_router.dart';

import '../../../app/assets/app_assets.dart';
import '../../../app/router/app_page.dart';

class OnboardingPage extends StatelessWidget {
  const OnboardingPage({super.key});

  static const _ink = Color(0xFF1C1B1C);
  static const _body = Color(0xFF45474B);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              AppAssets.onboardingBackground,
              fit: BoxFit.cover,
              alignment: Alignment.center,
            ),
          ),
          const Positioned.fill(
            child: DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Color(0x00FCF8F9),
                    Color(0x33FCF8F9),
                    Color(0xE6FCF8F9),
                  ],
                  stops: [0.0, 0.45, 1.0],
                ),
              ),
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 32, 20, 48),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'POPMATE',
                    style: TextStyle(
                      color: _ink,
                      fontSize: 24,
                      fontWeight: FontWeight.w800,
                      height: 32 / 24,
                      letterSpacing: -1.2,
                    ),
                  ),
                  const Spacer(),
                  const Text(
                    '내 취향에 딱 맞는\n팝업 탐색',
                    style: TextStyle(
                      color: _ink,
                      fontSize: 36,
                      fontWeight: FontWeight.w500,
                      height: 44 / 36,
                      letterSpacing: -1.08,
                    ),
                  ),
                  const SizedBox(height: 16),
                  const SizedBox(
                    width: 310,
                    child: Text(
                      '웨이팅 시간 예측부터 맞춤형 큐레이션\n까지\n당신만의 감각적인 경험을 제안합니다',
                      style: TextStyle(
                        color: _body,
                        fontSize: 17,
                        fontWeight: FontWeight.w500,
                        height: 27.63 / 17,
                      ),
                    ),
                  ),
                  const SizedBox(height: 48),
                  SizedBox(
                    height: 64,
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed:
                          () => context.goNamed(AppPage.permissions.name),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: _ink,
                        foregroundColor: Colors.white,
                        elevation: 20,
                        shadowColor: Colors.black.withValues(alpha: 0.25),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        textStyle: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w500,
                          height: 28 / 20,
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Text('시작하기'),
                          const SizedBox(width: 8),
                          SvgPicture.asset(
                            AppAssets.onboardingArrow,
                            width: 16,
                            height: 16,
                            colorFilter: const ColorFilter.mode(
                              Colors.white,
                              BlendMode.srcIn,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text(
                        '이미 계정이 있으신가요? ',
                        style: TextStyle(
                          color: Color(0xFF76777B),
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          height: 20 / 14,
                        ),
                      ),
                      GestureDetector(
                        onTap: () => context.goNamed(AppPage.login.name),
                        child: const Text(
                          '로그인',
                          style: TextStyle(
                            color: _ink,
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            height: 20 / 14,
                            decoration: TextDecoration.underline,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
