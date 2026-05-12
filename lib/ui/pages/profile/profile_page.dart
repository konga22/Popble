import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/spacing_extension.dart';
import '../../../app/router/app_page.dart';
import '../../../app/router/app_tab.dart';
import '../../../app/theme/app_theme.dart';
import '../../../services/mock_profile_service.dart';
import '../../common/app_components.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    final profile = MockProfileService.me;

    return MainShellPage(
      activeTab: AppTab.profile,
      title: '마이페이지',
      actions: [
        IconButton(
          onPressed: () => showNotReadySnackBar(context),
          icon: const Icon(LucideIcons.settings),
        ),
      ],
      child: ListView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 28),
        children: [
          Row(
            children: [
              const CircleAvatar(
                radius: 36,
                backgroundColor: AppColors.surfaceAlt,
                child: Icon(LucideIcons.user, color: AppColors.ink, size: 34),
              ),
              16.widthBox,
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      profile.name,
                      style: const TextStyle(
                        color: AppColors.ink,
                        fontSize: 24,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    Text(
                      profile.handle,
                      style: const TextStyle(color: AppColors.muted),
                    ),
                  ],
                ),
              ),
            ],
          ),
          24.heightBox,
          Row(
            children: [
              MetricTile(
                label: '내 후기',
                value: '${profile.reviewCount}',
                icon: LucideIcons.star,
              ),
              12.widthBox,
              MetricTile(
                label: '찜 목록',
                value: '${profile.savedCount}',
                icon: LucideIcons.bookmark,
              ),
            ],
          ),
          28.heightBox,
          SectionHeader(
            title: '대표 뱃지',
            trailing: TextButton(
              onPressed:
                  () => context.pushNamed(
                    AppPage.profileDetail.name,
                    pathParameters: {'id': 'curator-jun'},
                  ),
              child: const Text('뱃지 관리'),
            ),
          ),
          16.heightBox,
          ...profile.badges.map(
            (badge) => Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: ListTile(
                tileColor: AppColors.surface,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                  side: const BorderSide(color: AppColors.softBorder),
                ),
                leading: const Icon(LucideIcons.badgeCheck),
                title: Text(badge.title),
                subtitle: Text(badge.caption),
              ),
            ),
          ),
          28.heightBox,
          const SectionHeader(title: '계정 정보'),
          12.heightBox,
          ...['이메일 & 개인 정보', '결제 수단 관리', '보안 설정', '도움말', '약관 및 정책'].map(
            (label) => ListTile(
              tileColor: AppColors.surface,
              title: Text(label),
              trailing: const Icon(LucideIcons.chevronRight),
              onTap: () => showNotReadySnackBar(context),
            ),
          ),
        ],
      ),
    );
  }
}
