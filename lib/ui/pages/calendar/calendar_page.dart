import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/spacing_extension.dart';
import '../../../app/theme/app_theme.dart';
import '../../../services/mock_popup_service.dart';
import '../../common/app_components.dart';

class CalendarPage extends StatelessWidget {
  const CalendarPage({super.key});

  @override
  Widget build(BuildContext context) {
    const month = '2024년 12월';
    final events = MockPopupService.calendarEvents;

    return Scaffold(
      appBar: const AppTopBar(title: '팝업 캘린더', showBack: true),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 28),
        children: [
          Text(
            month,
            style: const TextStyle(
              color: AppColors.ink,
              fontFamily: 'MoveSans',
              fontSize: 28,
              fontWeight: FontWeight.w700,
            ),
          ),
          20.heightBox,
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: 35,
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 7,
              mainAxisSpacing: 8,
              crossAxisSpacing: 8,
            ),
            itemBuilder: (context, index) {
              final day = index - 4;
              final hasEvent = events.any((event) => event.day == day);
              return Container(
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: hasEvent ? AppColors.ink : AppColors.surface,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.softBorder),
                ),
                child:
                    day > 0
                        ? Text(
                          '$day',
                          style: TextStyle(
                            color: hasEvent ? Colors.white : AppColors.body,
                            fontWeight: FontWeight.w800,
                          ),
                        )
                        : const SizedBox.shrink(),
              );
            },
          ),
          28.heightBox,
          const SectionHeader(title: '선택한 날짜의 팝업', caption: '운영 중'),
          16.heightBox,
          ...events.map(
            (event) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: ListTile(
                tileColor: AppColors.surface,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                  side: const BorderSide(color: AppColors.softBorder),
                ),
                leading: const Icon(LucideIcons.calendar),
                title: Text(event.title),
                subtitle: Text('${event.period} | ${event.area}'),
                trailing: StatusBadge(label: event.status),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
