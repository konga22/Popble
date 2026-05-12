import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/assets/app_assets.dart';
import '../../../app/router/app_page.dart';
import '../../../app/router/app_tab.dart';
import '../../../app/theme/app_theme.dart';
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
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        bottom: false,
        child: Stack(
          children: [
            Positioned.fill(
              child: ListView(
                padding: const EdgeInsets.only(bottom: 132),
                children: [
                  _HeroTitleAndTabs(
                    selectedTab: _tab,
                    onTabSelected: (tab) => setState(() => _tab = tab),
                  ),
                  if (_tab == '정보') const _DetailInfoContent(),
                  if (_tab == '커뮤니티') const _DetailCommunityContent(),
                  if (_tab == '리뷰') const _DetailReviewContent(),
                ],
              ),
            ),
            const Positioned(left: 0, right: 0, top: 0, child: _DetailHeader()),
            Positioned(
              left: 20,
              right: 20,
              bottom: -4,
              child: _WaitlistButton(
                onTap: () => context.pushNamed(AppPage.waiting.name),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const FigmaBottomNavBar(
        activeTab: AppTab.home,
        raisedHome: true,
        backgroundColor: Color(0xFFF6F3F3),
        topRadius: 24,
      ),
    );
  }
}

class _DetailHeader extends StatelessWidget {
  const _DetailHeader();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 48,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 2),
      decoration: BoxDecoration(
        color: AppColors.background.withValues(alpha: 0.82),
      ),
      child: Row(
        children: [
          _HeaderIconButton(
            icon: LucideIcons.chevronLeft,
            onTap: () {
              if (context.canPop()) {
                context.pop();
                return;
              }
              context.goNamed(AppPage.home.name);
            },
          ),
          const Expanded(
            child: Text(
              '상세 정보',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: AppColors.ink,
                fontSize: 20,
                height: 1.4,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          _HeaderIconButton(icon: LucideIcons.share2, onTap: () {}),
        ],
      ),
    );
  }
}

class _HeroTitleAndTabs extends StatelessWidget {
  const _HeroTitleAndTabs({
    required this.selectedTab,
    required this.onTabSelected,
  });

  final String selectedTab;
  final ValueChanged<String> onTabSelected;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 600,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          SizedBox(
            height: 360,
            width: double.infinity,
            child: Stack(
              fit: StackFit.expand,
              children: [
                Image.asset(
                  AppAssets.detailHero,
                  fit: BoxFit.cover,
                  alignment: Alignment.center,
                ),
                const DecoratedBox(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [Color(0x00FCF8F9), AppColors.background],
                      stops: [0.68, 1],
                    ),
                  ),
                ),
              ],
            ),
          ),
          const Positioned(left: 20, right: 20, top: 318, child: _TitleCard()),
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: _DetailTabs(
              selectedTab: selectedTab,
              onSelected: onTabSelected,
            ),
          ),
        ],
      ),
    );
  }
}

class _TitleCard extends StatelessWidget {
  const _TitleCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(33),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppColors.border.withValues(alpha: 0.3)),
        boxShadow: const [
          BoxShadow(
            color: Color(0x0D000000),
            blurRadius: 1,
            offset: Offset(0, 1),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: const Color(0xFFDFE0E2),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Text(
              'FASHION & LIFESTYLE',
              style: TextStyle(
                color: Color(0xFF616365),
                fontSize: 12,
                height: 1.33,
                letterSpacing: 0.6,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            '메종 키츠네 가든 팝\n업',
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              color: AppColors.ink,
              fontSize: 32,
              height: 1.25,
              letterSpacing: -0.64,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 4),
          const Row(
            children: [
              Icon(LucideIcons.mapPin, color: Color(0xFF45474B), size: 15),
              SizedBox(width: 8),
              Expanded(
                child: Text(
                  '성동구 성수동 연무장길 12',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: Color(0xFF45474B),
                    fontSize: 16,
                    height: 1.5,
                    fontWeight: FontWeight.w500,
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

class _DetailTabs extends StatelessWidget {
  const _DetailTabs({required this.selectedTab, required this.onSelected});

  final String selectedTab;
  final ValueChanged<String> onSelected;

  static const _tabs = ['정보', '커뮤니티', '리뷰'];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: AppColors.border)),
      ),
      child: Row(
        children:
            _tabs.map((tab) {
              final selected = tab == selectedTab;

              return Expanded(
                child: GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  onTap: () => onSelected(tab),
                  child: Container(
                    padding: const EdgeInsets.fromLTRB(0, 16, 0, 18),
                    decoration: BoxDecoration(
                      border: Border(
                        bottom: BorderSide(
                          color: selected ? AppColors.ink : Colors.transparent,
                          width: 2,
                        ),
                      ),
                    ),
                    child: Text(
                      tab,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color:
                            selected ? AppColors.ink : const Color(0xFF76777B),
                        fontSize: 20,
                        height: 1.4,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ),
              );
            }).toList(),
      ),
    );
  }
}

class _DetailInfoContent extends StatelessWidget {
  const _DetailInfoContent();

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.fromLTRB(20, 32, 20, 32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _InfoTile(
            icon: LucideIcons.ticket,
            label: '입장료',
            value: '무료 (사전예약 권장)',
          ),
          SizedBox(height: 12),
          _InfoTile(
            icon: LucideIcons.clock,
            label: '운영시간',
            value: '11:00 - 20:00',
            strong: true,
          ),
          SizedBox(height: 12),
          _InfoTile(
            icon: LucideIcons.timer,
            label: '예상 대기 시간',
            value: '약 45분 예상',
          ),
          SizedBox(height: 72),
          _DescriptionSection(),
          SizedBox(height: 48),
          _DetailMapSection(),
          SizedBox(height: 48),
          _NearbySection(),
        ],
      ),
    );
  }
}

class _InfoTile extends StatelessWidget {
  const _InfoTile({
    required this.icon,
    required this.label,
    required this.value,
    this.strong = false,
  });

  final IconData icon;
  final String label;
  final String value;
  final bool strong;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 72,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surfaceAlt,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: AppColors.ink.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: AppColors.ink, size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: Color(0xFF76777B),
                    fontSize: 12,
                    height: 1.33,
                    letterSpacing: 0.6,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                Text(
                  value,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: const Color(0xFF1C1B1C),
                    fontSize: 16,
                    height: 1.5,
                    fontWeight: strong ? FontWeight.w700 : FontWeight.w500,
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

class _DescriptionSection extends StatelessWidget {
  const _DescriptionSection();

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionTitleRow(title: '팝업 소개', action: '자세히 보기'),
        SizedBox(height: 16),
        Text(
          "도심 속의 작은 휴식처, 메종 키츠네의 '가든 팝업'이 성수동에 찾아왔습니다. 이번 팝업은 프랑스어로 '집'을 뜻하는 메종의 정체성을 담아, 따뜻한 환대의 공간을 제안합니다.",
          maxLines: 4,
          overflow: TextOverflow.ellipsis,
          style: TextStyle(
            color: Color(0xFF45474B),
            fontSize: 16,
            height: 1.625,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}

class _DetailMapSection extends StatelessWidget {
  const _DetailMapSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionTitleRow(
          title: '찾아오시는 길',
          action: '지도 확대',
          onTap: () => context.goNamed(AppPage.map.name),
        ),
        const SizedBox(height: 16),
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: Container(
            height: 240,
            decoration: BoxDecoration(
              border: Border.all(color: AppColors.border),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Stack(
              fit: StackFit.expand,
              children: [
                Image.asset(
                  AppAssets.detailMap,
                  fit: BoxFit.cover,
                  alignment: Alignment.center,
                ),
                Center(
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.ink,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: const [
                        BoxShadow(
                          color: Color(0x1A000000),
                          blurRadius: 15,
                          offset: Offset(0, 10),
                        ),
                      ],
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(LucideIcons.mapPin, color: Colors.white, size: 17),
                        SizedBox(width: 8),
                        Text(
                          '메종 키츠네 가든',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            height: 1.5,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _NearbySection extends StatelessWidget {
  const _NearbySection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _SectionTitleRow(title: '주변 추천 상권', action: 'SEE ALL'),
        const SizedBox(height: 16),
        SizedBox(
          height: 282,
          child: ListView(
            clipBehavior: Clip.none,
            scrollDirection: Axis.horizontal,
            children: const [
              _NearbyCard(
                image: AppAssets.detailNearbyCafe,
                badge: 'CAFÉ',
                title: '쎈느 Scène',
                caption: '도보 3분 · 시그니처 베이커리',
              ),
              SizedBox(width: 24),
              _NearbyCard(
                image: AppAssets.detailNearbyRestaurant,
                badge: 'DINING',
                title: '누데이크 성수',
                caption: '도보 5분 · 아티스틱 디저트 카페',
              ),
              SizedBox(width: 24),
              _NearbyCard(
                image: AppAssets.searchSimilarTwo,
                badge: 'SHOP',
                title: '엠프티 EMPTY',
                caption: '도보 2분 · 셀렉트 패션 스토어',
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _NearbyCard extends StatelessWidget {
  const _NearbyCard({
    required this.image,
    required this.badge,
    required this.title,
    required this.caption,
  });

  final String image;
  final String badge;
  final String title;
  final String caption;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 280,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Stack(
              children: [
                Image.asset(image, width: 280, height: 208, fit: BoxFit.cover),
                Positioned(
                  right: 8,
                  top: 8,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.9),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      badge,
                      style: const TextStyle(
                        color: Color(0xFF1C1B1C),
                        fontSize: 10,
                        height: 1.5,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          Text(
            title,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              color: AppColors.ink,
              fontSize: 16,
              height: 1.5,
              fontWeight: FontWeight.w700,
            ),
          ),
          Text(
            caption,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              color: Color(0xFF45474B),
              fontSize: 16,
              height: 1.5,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}

class _SectionTitleRow extends StatelessWidget {
  const _SectionTitleRow({
    required this.title,
    required this.action,
    this.onTap,
  });

  final String title;
  final String action;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        Expanded(
          child: Text(
            title,
            style: const TextStyle(
              color: AppColors.ink,
              fontSize: 24,
              height: 1.33,
              letterSpacing: -0.24,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
        GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Row(
              children: [
                Text(
                  action,
                  style: TextStyle(
                    color:
                        action == 'SEE ALL' ? AppColors.border : AppColors.ink,
                    fontSize: 16,
                    height: 1.5,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                if (action != 'SEE ALL') ...[
                  const SizedBox(width: 4),
                  const Icon(
                    LucideIcons.chevronRight,
                    color: AppColors.ink,
                    size: 16,
                  ),
                ],
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _WaitlistButton extends StatelessWidget {
  const _WaitlistButton({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: onTap,
      child: Container(
        height: 72,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: AppColors.ink,
          borderRadius: BorderRadius.circular(12),
          boxShadow: const [
            BoxShadow(
              color: Color(0x1A000000),
              blurRadius: 25,
              offset: Offset(0, 20),
            ),
          ],
        ),
        child: const Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(LucideIcons.calendarCheck, color: Colors.white, size: 20),
            SizedBox(width: 16),
            Text(
              '웨이팅 예약하기',
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                height: 1.5,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _DetailCommunityContent extends StatelessWidget {
  const _DetailCommunityContent();

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.fromLTRB(20, 32, 20, 32),
      child: Column(
        children: [
          _SimplePanel(
            icon: LucideIcons.messageCircle,
            title: '커뮤니티 준비 중',
            body: '방문자들의 질문과 팁을 모아볼 수 있는 영역입니다.',
          ),
        ],
      ),
    );
  }
}

class _DetailReviewContent extends StatelessWidget {
  const _DetailReviewContent();

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.fromLTRB(20, 32, 20, 32),
      child: Column(
        children: [
          _SimplePanel(
            icon: LucideIcons.star,
            title: '리뷰 준비 중',
            body: '팝업 방문 후 남긴 리뷰와 별점을 보여줄 예정입니다.',
          ),
        ],
      ),
    );
  }
}

class _SimplePanel extends StatelessWidget {
  const _SimplePanel({
    required this.icon,
    required this.title,
    required this.body,
  });

  final IconData icon;
  final String title;
  final String body;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppColors.surfaceAlt,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          Icon(icon, color: AppColors.ink, size: 28),
          const SizedBox(height: 12),
          Text(
            title,
            style: const TextStyle(
              color: AppColors.ink,
              fontSize: 18,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            body,
            textAlign: TextAlign.center,
            style: const TextStyle(color: AppColors.body, height: 1.5),
          ),
        ],
      ),
    );
  }
}

class _HeaderIconButton extends StatelessWidget {
  const _HeaderIconButton({required this.icon, required this.onTap});

  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: onTap,
      child: SizedBox(
        width: 44,
        height: 44,
        child: Icon(icon, color: AppColors.ink, size: 22),
      ),
    );
  }
}
