import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/assets/app_assets.dart';
import '../../../app/router/app_page.dart';
import '../../../app/router/app_tab.dart';
import '../../../app/theme/app_theme.dart';
import '../../common/app_components.dart';

class SearchPage extends StatelessWidget {
  const SearchPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        bottom: false,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(20, 8, 20, 32),
          children: [
            const _SearchHeader(),
            const SizedBox(height: 18),
            const _SearchInputSection(),
            const SizedBox(height: 32),
            const _SearchResultsHeader(),
            const SizedBox(height: 16),
            _SearchResultCard(
              title: '메종 키츠네 가든 팝업',
              address: '서울특별시 성동구 연무장길 12',
              badge: 'D-4',
              image: AppAssets.searchResultExterior,
              imageAlignment: Alignment.topCenter,
              onTap:
                  () => context.pushNamed(
                    AppPage.popupDetail.name,
                    pathParameters: {'id': 'maison-kitsune'},
                  ),
            ),
            const SizedBox(height: 32),
            _SearchResultCard(
              title: '오브제 아트 하우스',
              address: '서울특별시 성동구 아차산로 55',
              badge: '예약중',
              image: AppAssets.searchResultInterior,
              imageAlignment: Alignment.center,
              onTap:
                  () => context.pushNamed(
                    AppPage.popupDetail.name,
                    pathParameters: {'id': 'object-house'},
                  ),
            ),
            const SizedBox(height: 48),
            const Text(
              '검색 결과 유사 팝업',
              style: TextStyle(
                color: Color(0xFF1C1B1C),
                fontSize: 24,
                height: 1.33,
                letterSpacing: -0.24,
                fontWeight: FontWeight.w400,
              ),
            ),
            const SizedBox(height: 24),
            const Row(
              children: [
                Expanded(
                  child: _SimilarPopupCard(
                    image: AppAssets.searchSimilarOne,
                    caption: '브랜드 위크',
                    title: '미니멀리스트 쇼룸',
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: _SimilarPopupCard(
                    image: AppAssets.searchSimilarTwo,
                    caption: '라이프스타일',
                    title: '어반 네이처 전시',
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
      bottomNavigationBar: const FigmaBottomNavBar(activeTab: AppTab.search),
    );
  }
}

class _SearchHeader extends StatelessWidget {
  const _SearchHeader();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 40,
      child: Row(
        children: [
          const Expanded(
            child: Text(
              'PopupMate',
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: AppColors.ink,
                fontSize: 24,
                height: 1.33,
                letterSpacing: -0.24,
                fontWeight: FontWeight.w400,
              ),
            ),
          ),
          const Icon(LucideIcons.search, color: AppColors.ink, size: 20),
          const SizedBox(width: 16),
          Container(
            width: 32,
            height: 32,
            padding: const EdgeInsets.all(1),
            decoration: BoxDecoration(
              color: const Color(0xFFE5E2E2),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.border),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: Image.asset(AppAssets.searchAvatar, fit: BoxFit.cover),
            ),
          ),
        ],
      ),
    );
  }
}

class _SearchInputSection extends StatelessWidget {
  const _SearchInputSection();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Container(
            height: 47,
            padding: const EdgeInsets.fromLTRB(13, 0, 12, 0),
            decoration: BoxDecoration(
              color: const Color(0xFFF6F3F3),
              border: Border.all(color: const Color(0xFF76777B)),
            ),
            child: const Row(
              children: [
                Expanded(
                  child: Text(
                    '성수 팝업스토어',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: Color(0xFF1C1B1C),
                      fontSize: 16,
                      height: 1.5,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ),
                Icon(LucideIcons.search, color: AppColors.body, size: 20),
              ],
            ),
          ),
        ),
        const SizedBox(width: 12),
        Container(
          width: 38,
          height: 38,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: AppColors.border),
          ),
          child: const Icon(
            LucideIcons.slidersHorizontal,
            color: AppColors.ink,
            size: 20,
          ),
        ),
      ],
    );
  }
}

class _SearchResultsHeader extends StatelessWidget {
  const _SearchResultsHeader();

  @override
  Widget build(BuildContext context) {
    return const Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          'SEARCH RESULTS',
          style: TextStyle(
            color: Color(0xFF45474B),
            fontSize: 12,
            height: 1.33,
            letterSpacing: 1.2,
            fontWeight: FontWeight.w400,
          ),
        ),
        Text(
          '2건의 결과',
          style: TextStyle(
            color: AppColors.ink,
            fontSize: 14,
            height: 1.43,
            fontWeight: FontWeight.w400,
          ),
        ),
      ],
    );
  }
}

class _SearchResultCard extends StatelessWidget {
  const _SearchResultCard({
    required this.title,
    required this.address,
    required this.badge,
    required this.image,
    required this.imageAlignment,
    required this.onTap,
  });

  final String title;
  final String address;
  final String badge;
  final String image;
  final Alignment imageAlignment;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(8),
      onTap: onTap,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Stack(
              children: [
                SizedBox(
                  height: 197,
                  width: double.infinity,
                  child: Image.asset(
                    image,
                    fit: BoxFit.cover,
                    alignment: imageAlignment,
                  ),
                ),
                Positioned(
                  right: 16,
                  top: 11,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 5,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.ink.withValues(alpha: 0.8),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      badge,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        height: 1.33,
                        letterSpacing: 0.6,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          Text(
            title,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              color: Color(0xFF1C1B1C),
              fontSize: 20,
              height: 1.4,
              fontWeight: FontWeight.w400,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              const Icon(LucideIcons.mapPin, color: AppColors.body, size: 13),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  address,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: Color(0xFF45474B),
                    fontSize: 14,
                    height: 1.43,
                    fontWeight: FontWeight.w400,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _SimilarPopupCard extends StatelessWidget {
  const _SimilarPopupCard({
    required this.image,
    required this.caption,
    required this.title,
  });

  final String image;
  final String caption;
  final String title;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFF6F3F3),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: Image.asset(
              image,
              width: double.infinity,
              height: 135,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            caption,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              color: AppColors.ink,
              fontSize: 12,
              height: 1.33,
              letterSpacing: 0.6,
              fontWeight: FontWeight.w400,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            title,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              color: Color(0xFF1C1B1C),
              fontSize: 16,
              height: 1.5,
              fontWeight: FontWeight.w400,
            ),
          ),
        ],
      ),
    );
  }
}
