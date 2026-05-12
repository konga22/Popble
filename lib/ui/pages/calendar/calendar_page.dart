import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/assets/app_assets.dart';
import '../../../app/router/app_page.dart';
import '../../../app/router/app_tab.dart';
import '../../../app/theme/app_theme.dart';
import '../../common/app_components.dart';

class CalendarPage extends StatelessWidget {
  const CalendarPage({super.key});

  static const _items = [
    _CalendarPopupItem(
      id: 'maison-kitsune',
      title: '성수 XYZ 팝업',
      period: '2024.12.01 - 2024.12.15',
      area: '성수동',
      status: '운영 중',
      image: AppAssets.calendarXyz,
      urgent: false,
    ),
    _CalendarPopupItem(
      id: 'object-house',
      title: '한남 모던 갤러리 팝업',
      period: '2024.11.25 - 2024.12.13',
      area: '한남동',
      status: 'D-2 종료 임박',
      image: AppAssets.calendarGallery,
      urgent: true,
    ),
    _CalendarPopupItem(
      id: 'aromatic-cloud',
      title: '청담 시그니처 뷰티',
      period: '2024.12.05 - 2024.12.25',
      area: '청담동',
      status: '운영 중',
      image: AppAssets.calendarBeauty,
      urgent: false,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            const _CalendarHeader(),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.fromLTRB(20, 24, 20, 32),
                children: [
                  const _CalendarMonthHeader(),
                  const SizedBox(height: 16),
                  const _CalendarGrid(),
                  const SizedBox(height: 48),
                  const Text(
                    '선택한 날짜의 팝업',
                    style: TextStyle(
                      color: Color(0xFF1C1B1C),
                      fontSize: 20,
                      height: 1.4,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ..._items.map(
                    (item) => Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: _CalendarPopupCard(item: item),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const FigmaBottomNavBar(
        activeTab: AppTab.home,
        backgroundColor: AppColors.background,
        topRadius: 0,
      ),
    );
  }
}

class _CalendarHeader extends StatelessWidget {
  const _CalendarHeader();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 64,
      padding: const EdgeInsets.symmetric(horizontal: 20),
      decoration: const BoxDecoration(
        color: AppColors.background,
        border: Border(bottom: BorderSide(color: AppColors.border)),
      ),
      child: Row(
        children: [
          _HeaderIconButton(
            icon: LucideIcons.arrowLeft,
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
              '팝업 캘린더',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: AppColors.ink,
                fontSize: 20,
                height: 1.4,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          _HeaderIconButton(icon: LucideIcons.calendar, onTap: () {}),
        ],
      ),
    );
  }
}

class _CalendarMonthHeader extends StatelessWidget {
  const _CalendarMonthHeader();

  @override
  Widget build(BuildContext context) {
    return const Row(
      children: [
        Expanded(
          child: Text(
            '2024년 12월',
            style: TextStyle(
              color: Color(0xFF1C1B1C),
              fontSize: 24,
              height: 1.33,
              letterSpacing: -0.24,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        Icon(LucideIcons.chevronLeft, color: AppColors.body, size: 20),
        SizedBox(width: 16),
        Icon(LucideIcons.chevronRight, color: AppColors.body, size: 20),
      ],
    );
  }
}

class _CalendarGrid extends StatelessWidget {
  const _CalendarGrid();

  static const _weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  static const _cells = [
    _DayCell(label: '24', muted: true),
    _DayCell(label: '25', muted: true),
    _DayCell(label: '26', muted: true),
    _DayCell(label: '27', muted: true),
    _DayCell(label: '28', muted: true),
    _DayCell(label: '29', muted: true),
    _DayCell(label: '30', muted: true),
    _DayCell(label: '1', sunday: true),
    _DayCell(label: '2', hasEvent: true),
    _DayCell(label: '3'),
    _DayCell(label: '4'),
    _DayCell(label: '5', hasEvent: true),
    _DayCell(label: '6'),
    _DayCell(label: '7'),
    _DayCell(label: '8', sunday: true),
    _DayCell(label: '9'),
    _DayCell(label: '', icon: LucideIcons.ticket),
    _DayCell(label: '11', selected: true),
    _DayCell(label: '12'),
    _DayCell(label: '13', hasEvent: true),
    _DayCell(label: '14'),
    _DayCell(label: '...'),
    _DayCell(label: '...'),
    _DayCell(label: '...'),
    _DayCell(label: '...'),
    _DayCell(label: '...'),
    _DayCell(label: '...'),
    _DayCell(label: '...'),
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFF6F3F3),
        borderRadius: BorderRadius.circular(8),
        boxShadow: const [
          BoxShadow(
            color: Color(0x0D000000),
            blurRadius: 1,
            offset: Offset(0, 1),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            children:
                _weekdays.map((weekday) {
                  return Expanded(
                    child: Text(
                      weekday,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        color: Color(0xFF45474B),
                        fontSize: 12,
                        height: 1.33,
                        letterSpacing: 0.6,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  );
                }).toList(),
          ),
          const SizedBox(height: 8),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: _cells.length,
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 7,
              mainAxisExtent: 40,
              crossAxisSpacing: 4,
              mainAxisSpacing: 4,
            ),
            itemBuilder: (context, index) => _CalendarDay(cell: _cells[index]),
          ),
        ],
      ),
    );
  }
}

class _CalendarDay extends StatelessWidget {
  const _CalendarDay({required this.cell});

  final _DayCell cell;

  @override
  Widget build(BuildContext context) {
    final textColor =
        cell.selected
            ? Colors.white
            : cell.sunday
            ? const Color(0xFFBA1A1A)
            : const Color(0xFF1C1B1C);

    return Opacity(
      opacity: cell.muted ? 0.3 : 1,
      child: Container(
        alignment: Alignment.center,
        decoration:
            cell.selected
                ? BoxDecoration(
                  color: AppColors.ink,
                  borderRadius: BorderRadius.circular(12),
                )
                : null,
        child: Stack(
          alignment: Alignment.center,
          children: [
            if (cell.icon != null)
              Icon(cell.icon, color: AppColors.ink, size: 15)
            else
              Text(
                cell.label,
                style: TextStyle(
                  color: textColor,
                  fontSize: 14,
                  height: 1.43,
                  fontWeight: FontWeight.w400,
                ),
              ),
            if (cell.hasEvent)
              const Positioned(
                bottom: 4,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    color: AppColors.ink,
                    shape: BoxShape.circle,
                  ),
                  child: SizedBox.square(dimension: 4),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _CalendarPopupCard extends StatelessWidget {
  const _CalendarPopupCard({required this.item});

  final _CalendarPopupItem item;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(8),
      onTap:
          () => context.pushNamed(
            AppPage.popupDetail.name,
            pathParameters: {'id': item.id},
          ),
      child: Container(
        padding: const EdgeInsets.all(5),
        decoration: BoxDecoration(
          color: const Color(0xFFF6F3F3),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: AppColors.border.withValues(alpha: 0.3)),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: Image.asset(
                item.image,
                width: 96,
                height: 96,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: SizedBox(
                height: 96,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Row(
                      children: [
                        _StatusPill(label: item.status, urgent: item.urgent),
                        const Spacer(),
                        const Icon(
                          LucideIcons.heart,
                          color: AppColors.muted,
                          size: 17,
                        ),
                      ],
                    ),
                    const SizedBox(height: 5),
                    Text(
                      item.title,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        color: Color(0xFF1C1B1C),
                        fontSize: 16,
                        height: 1.3,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                    const SizedBox(height: 2),
                    _InlineIconText(
                      icon: LucideIcons.calendarDays,
                      label: item.period,
                    ),
                    const SizedBox(height: 2),
                    _InlineIconText(icon: LucideIcons.mapPin, label: item.area),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StatusPill extends StatelessWidget {
  const _StatusPill({required this.label, required this.urgent});

  final String label;
  final bool urgent;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: urgent ? const Color(0xFFFFDAD6) : const Color(0xFFDFE0E2),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: urgent ? const Color(0xFF93000A) : const Color(0xFF616365),
          fontSize: 10,
          height: 1.2,
          fontWeight: urgent ? FontWeight.w400 : FontWeight.w500,
        ),
      ),
    );
  }
}

class _InlineIconText extends StatelessWidget {
  const _InlineIconText({required this.icon, required this.label});

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, color: const Color(0xFF45474B), size: 13),
        const SizedBox(width: 4),
        Expanded(
          child: Text(
            label,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              color: Color(0xFF45474B),
              fontSize: 13,
              height: 1.25,
              fontWeight: FontWeight.w400,
            ),
          ),
        ),
      ],
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

class _CalendarPopupItem {
  const _CalendarPopupItem({
    required this.id,
    required this.title,
    required this.period,
    required this.area,
    required this.status,
    required this.image,
    required this.urgent,
  });

  final String id;
  final String title;
  final String period;
  final String area;
  final String status;
  final String image;
  final bool urgent;
}

class _DayCell {
  const _DayCell({
    required this.label,
    this.selected = false,
    this.muted = false,
    this.sunday = false,
    this.hasEvent = false,
    this.icon,
  });

  final String label;
  final bool selected;
  final bool muted;
  final bool sunday;
  final bool hasEvent;
  final IconData? icon;
}
