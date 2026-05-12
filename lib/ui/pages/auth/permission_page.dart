import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/spacing_extension.dart';
import '../../../app/router/app_page.dart';
import '../../../app/theme/app_theme.dart';
import '../../common/app_components.dart';

class PermissionPage extends StatelessWidget {
  const PermissionPage({super.key});

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
                '편리한 이용을 위해\n권한을 허용해주세요',
                style: TextStyle(
                  color: AppColors.ink,
                  fontFamily: 'MoveSans',
                  fontSize: 30,
                  fontWeight: FontWeight.w700,
                  height: 1.2,
                ),
              ),
              12.heightBox,
              const Text(
                '선택 권한은 허용하지 않아도 서비스를 이용할 수 있습니다.',
                style: TextStyle(color: AppColors.body, height: 1.5),
              ),
              32.heightBox,
              const _PermissionTile(
                icon: LucideIcons.mapPin,
                title: '위치',
                badge: '필수',
                message: '주변 팝업 추천 및 웨이팅 현황 파악을 위해 현재 위치 정보가 필요합니다.',
              ),
              14.heightBox,
              const _PermissionTile(
                icon: LucideIcons.bell,
                title: '알림',
                badge: '선택',
                message: '입장 순서 안내, 예약 확정 및 혜택 정보를 실시간으로 보내드립니다.',
              ),
              14.heightBox,
              const _PermissionTile(
                icon: LucideIcons.camera,
                title: '카메라 및 사진',
                badge: '선택',
                message: '프로필 이미지 설정 및 리뷰 작성 시 사진 첨부를 위해 사용됩니다.',
              ),
              const Spacer(),
              const Text(
                '* 설정 > PopupMate 앱 설정에서 언제든지 권한을 변경할 수 있습니다.',
                style: TextStyle(color: AppColors.muted, fontSize: 12),
              ),
              16.heightBox,
              PrimaryButton(
                label: '동의하고 시작하기',
                onPressed: () => context.goNamed(AppPage.login.name),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _PermissionTile extends StatelessWidget {
  const _PermissionTile({
    required this.icon,
    required this.title,
    required this.badge,
    required this.message,
  });

  final IconData icon;
  final String title;
  final String badge;
  final String message;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.softBorder),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: AppColors.ink),
          14.widthBox,
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        color: AppColors.ink,
                        fontSize: 17,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    8.widthBox,
                    StatusBadge(label: badge),
                  ],
                ),
                8.heightBox,
                Text(
                  message,
                  style: const TextStyle(color: AppColors.body, height: 1.45),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
