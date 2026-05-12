import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/spacing_extension.dart';
import '../../../app/router/app_page.dart';
import '../../../app/router/app_tab.dart';
import '../../../app/theme/app_theme.dart';
import '../../../models/mock_models.dart';
import '../../../services/mock_popup_service.dart';
import '../../common/app_components.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final popups = MockPopupService.popups;
    final featured = popups.first;

    return MainShellPage(
      activeTab: AppTab.home,
      title: 'PopupMate',
      actions: [
        IconButton(
          onPressed: () => context.pushNamed(AppPage.calendar.name),
          icon: const Icon(LucideIcons.calendar),
        ),
        IconButton(
          onPressed: () => showNotReadySnackBar(context),
          icon: const Icon(LucideIcons.bell),
        ),
      ],
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.pushNamed(AppPage.communityWrite.name),
        backgroundColor: AppColors.ink,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: const Icon(LucideIcons.plus),
      ),
      child: ListView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 28),
        children: [
          _HeroCarousel(popup: featured),
          24.heightBox,
          Row(
            children: [
              _QuickButton(
                icon: LucideIcons.calendar,
                label: '팝업 캘린더',
                onTap: () => context.pushNamed(AppPage.calendar.name),
              ),
              12.widthBox,
              _QuickButton(
                icon: LucideIcons.locateFixed,
                label: '내 주변 팝업',
                onTap: () => context.goNamed(AppPage.map.name),
              ),
            ],
          ),
          12.heightBox,
          Row(
            children: [
              _QuickButton(
                icon: LucideIcons.mapPin,
                label: '지역별 팝업',
                onTap: () => context.goNamed(AppPage.search.name),
              ),
              12.widthBox,
              _QuickButton(
                icon: LucideIcons.package,
                label: '장르별 팝업',
                onTap: () => context.goNamed(AppPage.search.name),
              ),
            ],
          ),
          34.heightBox,
          SectionHeader(
            title: '지금 뜨는 팝업',
            caption: '실시간 가장 핫한 장소들을 확인하세요',
            trailing: TextButton(
              onPressed: () => context.goNamed(AppPage.search.name),
              child: const Text('전체보기'),
            ),
          ),
          16.heightBox,
          SizedBox(
            height: 255,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemBuilder: (context, index) {
                final popup = popups[index];
                return PopupCard(
                  popup: popup,
                  compact: true,
                  onTap:
                      () => context.pushNamed(
                        AppPage.popupDetail.name,
                        pathParameters: {'id': popup.id},
                      ),
                );
              },
              separatorBuilder: (_, __) => 14.widthBox,
              itemCount: popups.length,
            ),
          ),
          34.heightBox,
          const SectionHeader(title: '종료 임박 팝업', caption: '놓치면 아쉬운 이번 주 마감 팝업'),
          16.heightBox,
          ...popups
              .take(2)
              .map(
                (popup) => Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: _ClosingTile(
                    popupTitle: popup.title,
                    area: popup.area,
                    dday: popup.dday,
                    onTap:
                        () => context.pushNamed(
                          AppPage.popupDetail.name,
                          pathParameters: {'id': popup.id},
                        ),
                  ),
                ),
              ),
        ],
      ),
    );
  }
}

class _HeroCarousel extends StatelessWidget {
  const _HeroCarousel({required this.popup});

  final Popup popup;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 480,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(28),
        gradient: LinearGradient(
          colors: popup.colors,
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          StatusBadge(label: popup.heroLabel),
          const Spacer(),
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
          12.heightBox,
          Text(
            popup.subtitle,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 15,
              height: 1.5,
            ),
          ),
          20.heightBox,
          Row(
            children: [
              const Icon(LucideIcons.mapPin, color: Colors.white, size: 18),
              8.widthBox,
              Text(
                '${popup.area} | ${popup.period}',
                style: const TextStyle(color: Colors.white),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _QuickButton extends StatelessWidget {
  const _QuickButton({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(18),
        child: Container(
          height: 78,
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: AppColors.softBorder),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Icon(icon, color: AppColors.ink, size: 22),
              Text(
                label,
                style: const TextStyle(
                  color: AppColors.ink,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ClosingTile extends StatelessWidget {
  const _ClosingTile({
    required this.popupTitle,
    required this.area,
    required this.dday,
    required this.onTap,
  });

  final String popupTitle;
  final String area;
  final String dday;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: onTap,
      tileColor: AppColors.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: AppColors.softBorder),
      ),
      leading: StatusBadge(label: dday, tone: BadgeTone.warning),
      title: Text(
        popupTitle,
        style: const TextStyle(fontWeight: FontWeight.w800),
      ),
      subtitle: Text(area),
      trailing: const Icon(LucideIcons.chevronRight),
    );
  }
}
