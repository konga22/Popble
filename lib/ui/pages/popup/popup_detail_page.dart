import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/spacing_extension.dart';
import '../../../app/router/app_page.dart';
import '../../../app/router/app_tab.dart';
import '../../../app/theme/app_theme.dart';
import '../../../models/mock_models.dart';
import '../../../services/mock_community_service.dart';
import '../../../services/mock_popup_service.dart';
import '../../common/app_components.dart';

class PopupDetailPage extends StatefulWidget {
  const PopupDetailPage({super.key, required this.popupId});

  final String popupId;

  @override
  State<PopupDetailPage> createState() => _PopupDetailPageState();
}

class _PopupDetailPageState extends State<PopupDetailPage> {
  String _tab = '정보';

  @override
  Widget build(BuildContext context) {
    final popup = MockPopupService.popupById(widget.popupId);

    return MainShellPage(
      activeTab: AppTab.home,
      title: '팝업 상세',
      actions: [
        IconButton(
          onPressed: () => context.pushNamed(AppPage.reviewWrite.name),
          icon: const Icon(LucideIcons.star),
        ),
      ],
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          _DetailHero(popup: popup),
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 18, 20, 28),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                FilterChipBar(
                  labels: const ['정보', '리뷰', '커뮤니티', '재고'],
                  selected: _tab,
                  onSelected: (value) {
                    if (value == '재고') {
                      context.pushNamed(AppPage.inventory.name);
                      return;
                    }
                    setState(() => _tab = value);
                  },
                ),
                22.heightBox,
                switch (_tab) {
                  '리뷰' => _ReviewsSection(reviews: MockPopupService.reviews),
                  '커뮤니티' => const _PopupCommunitySection(),
                  _ => _InfoSection(popup: popup),
                },
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _DetailHero extends StatelessWidget {
  const _DetailHero({required this.popup});

  final Popup popup;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 360,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: popup.colors,
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Spacer(),
          Text(
            popup.category.toUpperCase(),
            style: const TextStyle(
              color: Colors.white,
              fontSize: 12,
              fontWeight: FontWeight.w800,
              letterSpacing: 1.2,
            ),
          ),
          10.heightBox,
          Text(
            popup.title,
            style: const TextStyle(
              color: Colors.white,
              fontFamily: 'MoveSans',
              fontSize: 34,
              fontWeight: FontWeight.w700,
              height: 1.12,
            ),
          ),
          10.heightBox,
          Text(
            popup.address,
            style: const TextStyle(color: Colors.white, fontSize: 15),
          ),
        ],
      ),
    );
  }
}

class _InfoSection extends StatelessWidget {
  const _InfoSection({required this.popup});

  final Popup popup;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            MetricTile(
              label: '예상 대기 시간',
              value: popup.waitTime,
              icon: LucideIcons.clock,
            ),
            12.widthBox,
            MetricTile(
              label: '입장료',
              value: popup.entryFee,
              icon: LucideIcons.ticket,
            ),
          ],
        ),
        22.heightBox,
        const SectionHeader(title: '운영 정보'),
        14.heightBox,
        _InfoRow(icon: LucideIcons.clock, label: popup.hours),
        _InfoRow(icon: LucideIcons.mapPin, label: popup.address),
        _InfoRow(icon: LucideIcons.navigation, label: '주차 불가 · 인근 공영주차장 이용 권장'),
        24.heightBox,
        const SectionHeader(title: '팝업 소개'),
        12.heightBox,
        Text(
          '${popup.subtitle}. 이번 팝업은 브랜드의 정체성을 담아 따뜻한 환대와 감각적인 경험을 제안합니다. 한정판 굿즈와 현장 이벤트를 함께 확인해보세요.',
          style: const TextStyle(color: AppColors.body, height: 1.55),
        ),
        24.heightBox,
        PrimaryButton(
          label: '웨이팅 예약하기',
          icon: LucideIcons.clock,
          onPressed: () => context.pushNamed(AppPage.waiting.name),
        ),
        12.heightBox,
        OutlinedButton.icon(
          onPressed: () => context.goNamed(AppPage.map.name),
          icon: const Icon(LucideIcons.map),
          label: const Text('지도 보기'),
          style: OutlinedButton.styleFrom(
            minimumSize: const Size.fromHeight(52),
            foregroundColor: AppColors.ink,
            side: const BorderSide(color: AppColors.border),
          ),
        ),
      ],
    );
  }
}

class _InfoRow extends StatelessWidget {
  const _InfoRow({required this.icon, required this.label});

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          Icon(icon, color: AppColors.muted, size: 18),
          10.widthBox,
          Expanded(
            child: Text(label, style: const TextStyle(color: AppColors.body)),
          ),
        ],
      ),
    );
  }
}

class _ReviewsSection extends StatelessWidget {
  const _ReviewsSection({required this.reviews});

  final List<PopupReview> reviews;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(title: '전체 평점', caption: '4.8'),
        16.heightBox,
        ...reviews.map(
          (review) => Padding(
            padding: const EdgeInsets.only(bottom: 14),
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: AppColors.softBorder),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        review.author,
                        style: const TextStyle(fontWeight: FontWeight.w800),
                      ),
                      const Spacer(),
                      const Icon(LucideIcons.star, size: 16),
                      4.widthBox,
                      Text('${review.rating}'),
                    ],
                  ),
                  6.heightBox,
                  Text(
                    review.date,
                    style: const TextStyle(color: AppColors.muted),
                  ),
                  10.heightBox,
                  Text(review.body, style: const TextStyle(height: 1.45)),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _PopupCommunitySection extends StatelessWidget {
  const _PopupCommunitySection();

  @override
  Widget build(BuildContext context) {
    final posts = MockCommunityService.posts;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(title: '인기 게시글'),
        14.heightBox,
        ...posts.map(
          (post) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: ListTile(
              tileColor: AppColors.surface,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
                side: const BorderSide(color: AppColors.softBorder),
              ),
              title: Text(post.title),
              subtitle: Text('${post.author} · ${post.timeAgo}'),
              trailing: StatusBadge(label: post.category),
            ),
          ),
        ),
        16.heightBox,
        PrimaryButton(
          label: '커뮤니티 글 작성',
          icon: LucideIcons.penLine,
          onPressed: () => context.pushNamed(AppPage.communityWrite.name),
        ),
      ],
    );
  }
}
