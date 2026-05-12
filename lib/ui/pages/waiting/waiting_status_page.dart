import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/spacing_extension.dart';
import '../../../app/theme/app_theme.dart';
import '../../../services/mock_waiting_service.dart';
import '../../common/app_components.dart';

class WaitingStatusPage extends StatelessWidget {
  const WaitingStatusPage({super.key});

  @override
  Widget build(BuildContext context) {
    final waiting = MockWaitingService.status;

    return Scaffold(
      appBar: const AppTopBar(title: '대기 안내', showBack: true),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 28),
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: AppColors.ink,
              borderRadius: BorderRadius.circular(24),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const StatusBadge(label: 'CURRENT STATUS'),
                24.heightBox,
                Text(
                  '${waiting.estimatedMinutes ~/ 2}분 후 당신의 차례입니다',
                  style: const TextStyle(
                    color: Colors.white,
                    fontFamily: 'MoveSans',
                    fontSize: 30,
                    fontWeight: FontWeight.w700,
                    height: 1.18,
                  ),
                ),
                12.heightBox,
                Text(
                  '대기 번호: ${waiting.myNumber}번 (현재 ${waiting.currentNumber}번 입장 중)',
                  style: const TextStyle(color: Colors.white),
                ),
              ],
            ),
          ),
          28.heightBox,
          const SectionHeader(title: '주변 탐색', caption: '서울시 성수동'),
          16.heightBox,
          ...[
            '카페 오라 (Cafe Ora) · 도보 3분 · 4.8',
            '오브젝트 성수 · 소품샵 · 도보 5분',
            '아크앤북 · 독서 공간 · 도보 7분',
            'GS25 프리미엄 · 도보 1분 · 24시간',
          ].map(
            (label) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: ListTile(
                tileColor: AppColors.surface,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                  side: const BorderSide(color: AppColors.softBorder),
                ),
                leading: const Icon(LucideIcons.mapPin),
                title: Text(label),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
