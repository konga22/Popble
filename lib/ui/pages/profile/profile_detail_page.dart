import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/spacing_extension.dart';
import '../../../app/theme/app_theme.dart';
import '../../../services/mock_profile_service.dart';
import '../../common/app_components.dart';

class ProfileDetailPage extends StatelessWidget {
  const ProfileDetailPage({super.key});

  @override
  Widget build(BuildContext context) {
    final profile = MockProfileService.other;

    return Scaffold(
      appBar: const AppTopBar(title: '프로필 상세', showBack: true),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 28),
        children: [
          const CircleAvatar(
            radius: 52,
            backgroundColor: AppColors.surfaceAlt,
            child: Icon(LucideIcons.user, color: AppColors.ink, size: 46),
          ),
          18.heightBox,
          Center(
            child: Text(
              profile.name,
              style: const TextStyle(
                color: AppColors.ink,
                fontSize: 28,
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
          Center(
            child: Text(
              profile.handle,
              style: const TextStyle(color: AppColors.muted),
            ),
          ),
          12.heightBox,
          Text(
            profile.bio,
            textAlign: TextAlign.center,
            style: const TextStyle(color: AppColors.body, height: 1.5),
          ),
          24.heightBox,
          Row(
            children: [
              MetricTile(
                label: '후기',
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
          26.heightBox,
          const SectionHeader(title: '이번 주 추천 팝업'),
          14.heightBox,
          const EmptyPlaceholder(
            title: '최근 활동 내역',
            message: '성수 레이어 갤러리 팝업 방문함 · 2시간 전',
            icon: LucideIcons.activity,
          ),
        ],
      ),
    );
  }
}
