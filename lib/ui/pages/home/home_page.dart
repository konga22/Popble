import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/assets/app_assets.dart';
import '../../../app/router/app_page.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  static const _background = Color(0xFFFCF8F9);
  static const _ink = Color(0xFF1C1B1C);
  static const _title = Color(0xFF393C43);
  static const _body = Color(0xFF45474B);
  static const _navText = Color(0xFF616365);
  static const _surfaceAlt = Color(0xFFF0EDED);
  static const _border = Color(0xFFC6C6CB);
  static const _danger = Color(0xFFBA1A1A);

  @override
  Widget build(BuildContext context) {
    final heroHeight = (480 - MediaQuery.viewPaddingOf(context).top).clamp(
      420,
      480,
    );
    final bottomInset = MediaQuery.paddingOf(context).bottom;
    final navHeight = 102.0 + bottomInset;

    return Scaffold(
      backgroundColor: _background,
      body: SafeArea(
        bottom: false,
        child: Stack(
          children: [
            Column(
              children: [
                const _HomeHeader(),
                Expanded(
                  child: ListView(
                    padding: EdgeInsets.only(bottom: navHeight + 40),
                    children: [
                      _HeroSection(height: heroHeight.toDouble()),
                      const SizedBox(height: 32),
                      const _QuickMenu(),
                      const SizedBox(height: 32),
                      const _TrendingSection(),
                      const _ClosingSection(),
                    ],
                  ),
                ),
              ],
            ),
            Positioned(
              right: 20,
              bottom: navHeight + 8,
              child: _FloatingReportButton(
                onTap: () => context.pushNamed(AppPage.communityWrite.name),
              ),
            ),
            Positioned(
              left: 0,
              right: 0,
              bottom: 0,
              child: _FigmaBottomNav(
                height: navHeight,
                bottomInset: bottomInset,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _HomeHeader extends StatelessWidget {
  const _HomeHeader();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 48,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        child: Row(
          children: [
            const Text(
              'PopupMate',
              style: TextStyle(
                color: HomePage._title,
                fontSize: 24,
                fontWeight: FontWeight.w400,
                height: 32 / 24,
                letterSpacing: -0.24,
              ),
            ),
            const Spacer(),
            GestureDetector(
              onTap: () => context.goNamed(AppPage.search.name),
              child: SizedBox(
                width: 32,
                height: 32,
                child: Center(
                  child: Icon(
                    LucideIcons.search,
                    color: HomePage._title,
                    size: 24,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 16),
            GestureDetector(
              onTap: () => context.goNamed(AppPage.profile.name),
              child: Container(
                width: 32,
                height: 32,
                padding: const EdgeInsets.all(1),
                decoration: BoxDecoration(
                  color: const Color(0xFFDFE0E2),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: HomePage._border),
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(11),
                  child: Image.asset(AppAssets.homeProfile, fit: BoxFit.cover),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _HeroSection extends StatelessWidget {
  const _HeroSection({required this.height});

  final double height;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap:
          () => context.pushNamed(
            AppPage.popupDetail.name,
            pathParameters: {'id': 'seongsu-modern-terrace'},
          ),
      child: SizedBox(
        height: height,
        width: double.infinity,
        child: Stack(
          fit: StackFit.expand,
          children: [
            Image.asset(
              AppAssets.homeHero,
              fit: BoxFit.cover,
              alignment: Alignment.center,
            ),
            const DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Color(0x001C1B1C),
                    Color(0x1A1C1B1C),
                    Color(0xCC1C1B1C),
                  ],
                  stops: [0.0, 0.52, 1.0],
                ),
              ),
            ),
            Positioned(
              left: 20,
              right: 20,
              bottom: 52,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: const Color(0xFF50535A),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: const Text(
                      'COMING SOON',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        height: 16 / 12,
                        letterSpacing: 0.6,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    '성수동 팝업:\n더 모던 테라스',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 32,
                      fontWeight: FontWeight.w400,
                      height: 40 / 32,
                      letterSpacing: -0.64,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '2023.11.24 - 12.10 | 성수역 3번 출구',
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.8),
                      fontSize: 16,
                      fontWeight: FontWeight.w400,
                      height: 24 / 16,
                    ),
                  ),
                ],
              ),
            ),
            const Positioned(
              left: 0,
              right: 0,
              bottom: 16,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _HeroDot(active: true),
                  _HeroDot(),
                  _HeroDot(),
                  _HeroDot(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _HeroDot extends StatelessWidget {
  const _HeroDot({this.active = false});

  final bool active;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 8,
      height: 8,
      margin: const EdgeInsets.symmetric(horizontal: 4),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: active ? 1 : 0.4),
        shape: BoxShape.circle,
      ),
    );
  }
}

class _QuickMenu extends StatelessWidget {
  const _QuickMenu();

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.symmetric(horizontal: 20),
      child: SizedBox(
        height: 76.5,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            _QuickAction(
              icon: LucideIcons.calendarDays,
              label: '팝업 캘린더',
              route: AppPage.calendar,
            ),
            _QuickAction(
              icon: LucideIcons.navigation,
              label: '내 주변 팝업',
              route: AppPage.map,
            ),
            _QuickAction(
              icon: LucideIcons.map,
              label: '지역별 팝업',
              route: AppPage.search,
            ),
            _QuickAction(
              icon: LucideIcons.shapes,
              label: '장르별 팝업',
              route: AppPage.search,
            ),
          ],
        ),
      ),
    );
  }
}

class _QuickAction extends StatelessWidget {
  const _QuickAction({
    required this.icon,
    required this.label,
    required this.route,
  });

  final IconData icon;
  final String label;
  final AppPage route;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => context.goNamed(route.name),
      child: SizedBox(
        width: 78.5,
        child: Column(
          children: [
            Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(
                color: HomePage._surfaceAlt,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: HomePage._border),
              ),
              child: Center(
                child: Icon(icon, color: HomePage._title, size: 30),
              ),
            ),
            const SizedBox(height: 7.5),
            Text(
              label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: HomePage._body,
                fontSize: 10,
                fontWeight: FontWeight.w500,
                height: 12.5 / 10,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _TrendingSection extends StatelessWidget {
  const _TrendingSection();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 520,
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '지금 뜨는 팝업',
                        style: TextStyle(
                          color: HomePage._ink,
                          fontSize: 24,
                          fontWeight: FontWeight.w400,
                          height: 32 / 24,
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        '실시간 가장 핫한 장소들을 확인하세요',
                        style: TextStyle(
                          color: HomePage._body,
                          fontSize: 16,
                          fontWeight: FontWeight.w400,
                          height: 24 / 16,
                        ),
                      ),
                    ],
                  ),
                ),
                GestureDetector(
                  onTap: () => context.goNamed(AppPage.search.name),
                  child: const Padding(
                    padding: EdgeInsets.only(top: 4),
                    child: Text(
                      '전체보기',
                      style: TextStyle(
                        color: HomePage._body,
                        fontSize: 16,
                        fontWeight: FontWeight.w400,
                        height: 24 / 16,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          SizedBox(
            height: 416,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 20),
              children: const [
                _TrendingCard(
                  image: AppAssets.homeTrendingOne,
                  title: '메종 키츠네 카페 팝업',
                  subtitle: '가로수길 | 11.20 - 12.15',
                ),
                SizedBox(width: 16),
                _TrendingCard(
                  image: AppAssets.homeTrendingTwo,
                  title: '아트토이 서울 한정전',
                  subtitle: '성수 | 11.18 - 12.03',
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _TrendingCard extends StatelessWidget {
  const _TrendingCard({
    required this.image,
    required this.title,
    required this.subtitle,
  });

  final String image;
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap:
          () => context.pushNamed(
            AppPage.popupDetail.name,
            pathParameters: {'id': 'maison-kitsune'},
          ),
      child: SizedBox(
        width: 360,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Stack(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: Image.asset(
                    image,
                    width: 360,
                    height: 360,
                    fit: BoxFit.cover,
                  ),
                ),
                Positioned(
                  left: 16,
                  top: 16,
                  child: Container(
                    height: 26,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.9),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          LucideIcons.flame,
                          color: HomePage._danger,
                          size: 13,
                        ),
                        const SizedBox(width: 4),
                        const Text(
                          'HOT',
                          style: TextStyle(
                            color: HomePage._ink,
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                            height: 18 / 12,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              title,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(
                color: HomePage._ink,
                fontSize: 20,
                fontWeight: FontWeight.w400,
                height: 28 / 20,
              ),
            ),
            Text(
              subtitle,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(
                color: HomePage._body,
                fontSize: 14,
                fontWeight: FontWeight.w400,
                height: 20 / 14,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ClosingSection extends StatelessWidget {
  const _ClosingSection();

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.fromLTRB(20, 32, 20, 32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '종료 임박 팝업',
            style: TextStyle(
              color: HomePage._ink,
              fontSize: 24,
              fontWeight: FontWeight.w400,
              height: 32 / 24,
            ),
          ),
          SizedBox(height: 4),
          Text(
            '놓치면 아쉬운 이번 주 마감 팝업',
            style: TextStyle(
              color: HomePage._body,
              fontSize: 16,
              fontWeight: FontWeight.w400,
              height: 24 / 16,
            ),
          ),
          SizedBox(height: 16),
          _ClosingCard(
            image: AppAssets.homeClosingOne,
            dday: 'D-2',
            area: '성수',
            title: '나이키 SNKRS 데이',
            progress: 0.85,
            urgent: false,
          ),
          SizedBox(height: 12),
          _ClosingCard(
            image: AppAssets.homeClosingTwo,
            dday: 'D-1',
            area: '한남',
            title: '블루보틀 홀리데이 마켓',
            progress: 0.95,
            urgent: true,
          ),
        ],
      ),
    );
  }
}

class _ClosingCard extends StatelessWidget {
  const _ClosingCard({
    required this.image,
    required this.dday,
    required this.area,
    required this.title,
    required this.progress,
    required this.urgent,
  });

  final String image;
  final String dday;
  final String area;
  final String title;
  final double progress;
  final bool urgent;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 114,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: HomePage._surfaceAlt,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: HomePage._border),
      ),
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: Image.asset(image, width: 80, height: 80, fit: BoxFit.cover),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      dday,
                      style: const TextStyle(
                        color: HomePage._danger,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        height: 16 / 12,
                        letterSpacing: 0.6,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      area,
                      style: const TextStyle(
                        color: HomePage._body,
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        height: 18 / 12,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: HomePage._ink,
                    fontSize: 16,
                    fontWeight: FontWeight.w400,
                    height: 24 / 16,
                  ),
                ),
                const Spacer(),
                ClipRRect(
                  borderRadius: BorderRadius.circular(999),
                  child: LinearProgressIndicator(
                    minHeight: 4,
                    value: progress,
                    backgroundColor: HomePage._border,
                    valueColor: AlwaysStoppedAnimation<Color>(
                      urgent ? HomePage._danger : HomePage._title,
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

class _FloatingReportButton extends StatelessWidget {
  const _FloatingReportButton({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 56,
        height: 56,
        decoration: BoxDecoration(
          color: HomePage._title,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.25),
              blurRadius: 50,
              offset: const Offset(0, 25),
            ),
          ],
        ),
        child: const Center(
          child: Icon(LucideIcons.plus, color: Colors.white, size: 30),
        ),
      ),
    );
  }
}

class _FigmaBottomNav extends StatelessWidget {
  const _FigmaBottomNav({required this.height, required this.bottomInset});

  final double height;
  final double bottomInset;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      decoration: const BoxDecoration(
        color: HomePage._surfaceAlt,
        borderRadius: BorderRadius.vertical(top: Radius.circular(12)),
        border: Border(top: BorderSide(color: HomePage._border)),
      ),
      child: Padding(
        padding: EdgeInsets.only(top: 20.5, bottom: bottomInset),
        child: Row(
          children: [
            _NavItem(
              icon: LucideIcons.search,
              label: '검색',
              onTap: () => context.goNamed(AppPage.search.name),
            ),
            _NavItem(
              icon: LucideIcons.map,
              label: '지도',
              onTap: () => context.goNamed(AppPage.map.name),
            ),
            _NavItem(
              icon: LucideIcons.house,
              label: '홈',
              active: true,
              onTap: () => context.goNamed(AppPage.home.name),
            ),
            _NavItem(
              icon: LucideIcons.messageCircle,
              label: '커뮤니티',
              onTap: () => context.goNamed(AppPage.community.name),
            ),
            _NavItem(
              icon: LucideIcons.user,
              label: '프로필',
              onTap: () => context.goNamed(AppPage.profile.name),
            ),
          ],
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  const _NavItem({
    required this.icon,
    required this.label,
    required this.onTap,
    this.active = false,
  });

  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final bool active;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        behavior: HitTestBehavior.opaque,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(
              width: 44,
              height: 34,
              child: Center(
                child:
                    active
                        ? Container(
                          width: 32,
                          height: 32,
                          decoration: BoxDecoration(
                            color: HomePage._title,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Icon(icon, color: Colors.white, size: 20),
                        )
                        : Icon(icon, color: HomePage._navText, size: 30),
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: active ? HomePage._title : HomePage._navText,
                fontSize: 10,
                fontWeight: active ? FontWeight.w700 : FontWeight.w500,
                height: 15 / 10,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
