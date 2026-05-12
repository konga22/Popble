import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/router/app_page.dart';
import '../../../app/router/app_tab.dart';
import '../../../app/theme/app_theme.dart';
import '../../../services/mock_popup_service.dart';
import '../../common/app_components.dart';

class MapPage extends StatefulWidget {
  const MapPage({super.key});

  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  double _radius = 500;

  @override
  Widget build(BuildContext context) {
    final popup = MockPopupService.popups.last;

    return MainShellPage(
      activeTab: AppTab.map,
      title: '지도',
      child: Stack(
        children: [
          Positioned.fill(
            child: DecoratedBox(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFFE9E5E3), Color(0xFFC9D0D0)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: CustomPaint(painter: _MapGridPainter()),
            ),
          ),
          Positioned(
            left: 20,
            right: 20,
            top: 16,
            child: TextField(
              decoration: const InputDecoration(
                prefixIcon: Icon(LucideIcons.search),
                hintText: '성수동 팝업스토어 검색',
              ),
            ),
          ),
          Positioned(
            left: 20,
            right: 20,
            top: 92,
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
                  Text(
                    '${_radius.round()}m 반경',
                    style: const TextStyle(fontWeight: FontWeight.w800),
                  ),
                  Slider(
                    min: 100,
                    max: 1000,
                    divisions: 9,
                    value: _radius,
                    onChanged: (value) => setState(() => _radius = value),
                  ),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [Text('100m'), Text('500m'), Text('1km')],
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            left: 20,
            right: 20,
            bottom: 24,
            child: PopupCard(
              popup: popup,
              onTap:
                  () => context.pushNamed(
                    AppPage.popupDetail.name,
                    pathParameters: {'id': popup.id},
                  ),
            ),
          ),
        ],
      ),
    );
  }
}

class _MapGridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint =
        Paint()
          ..color = Colors.white.withValues(alpha: 0.34)
          ..strokeWidth = 1;

    for (var x = 0.0; x < size.width; x += 48) {
      canvas.drawLine(Offset(x, 0), Offset(x, size.height), paint);
    }
    for (var y = 0.0; y < size.height; y += 48) {
      canvas.drawLine(Offset(0, y), Offset(size.width, y), paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
