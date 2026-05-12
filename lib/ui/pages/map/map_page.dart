import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/assets/app_assets.dart';
import '../../../app/router/app_page.dart';
import '../../../app/router/app_tab.dart';
import '../../../app/theme/app_theme.dart';

class MapPage extends StatefulWidget {
  const MapPage({super.key});

  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  static const _radiusOptions = [100, 500, 1000];

  int _radius = 500;
  bool _showRadiusMenu = true;
  bool _saved = false;

  String get _radiusLabel => _radius == 1000 ? '1km' : '${_radius}m';

  void _selectRadius(int value) {
    setState(() {
      _radius = value;
      _showRadiusMenu = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            const _MapHeader(),
            Expanded(
              child: _MapCanvas(
                radiusLabel: _radiusLabel,
                radiusOptions: _radiusOptions,
                selectedRadius: _radius,
                showRadiusMenu: _showRadiusMenu,
                saved: _saved,
                onRadiusTap:
                    () => setState(() => _showRadiusMenu = !_showRadiusMenu),
                onRadiusSelected: _selectRadius,
                onWaitingTap: () => context.pushNamed(AppPage.waiting.name),
                onSaveTap: () => setState(() => _saved = !_saved),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const _MapBottomNavBar(activeTab: AppTab.map),
    );
  }
}

class _MapHeader extends StatelessWidget {
  const _MapHeader();

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
          _IconTapTarget(
            icon: LucideIcons.arrowLeft,
            iconSize: 22,
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
              '팝업 상세',
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: AppColors.ink,
                fontSize: 20,
                height: 1.4,
                fontWeight: FontWeight.w400,
              ),
            ),
          ),
          _IconTapTarget(icon: LucideIcons.share2, iconSize: 21, onTap: () {}),
        ],
      ),
    );
  }
}

class _MapCanvas extends StatelessWidget {
  const _MapCanvas({
    required this.radiusLabel,
    required this.radiusOptions,
    required this.selectedRadius,
    required this.showRadiusMenu,
    required this.saved,
    required this.onRadiusTap,
    required this.onRadiusSelected,
    required this.onWaitingTap,
    required this.onSaveTap,
  });

  final String radiusLabel;
  final List<int> radiusOptions;
  final int selectedRadius;
  final bool showRadiusMenu;
  final bool saved;
  final VoidCallback onRadiusTap;
  final ValueChanged<int> onRadiusSelected;
  final VoidCallback onWaitingTap;
  final VoidCallback onSaveTap;

  @override
  Widget build(BuildContext context) {
    return ClipRect(
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          const Positioned.fill(child: _DesaturatedMapBackground()),
          Positioned.fill(
            child: LayoutBuilder(
              builder: (context, constraints) {
                return _MapMarkers(size: constraints.biggest);
              },
            ),
          ),
          Positioned(
            left: 20,
            right: 20,
            top: 16,
            child: _FloatingMapControls(
              radiusLabel: radiusLabel,
              radiusOptions: radiusOptions,
              selectedRadius: selectedRadius,
              showRadiusMenu: showRadiusMenu,
              onRadiusTap: onRadiusTap,
              onRadiusSelected: onRadiusSelected,
            ),
          ),
          Positioned(
            left: 20,
            right: 20,
            bottom: 32,
            child: _QuickPreviewCard(
              saved: saved,
              onWaitingTap: onWaitingTap,
              onSaveTap: onSaveTap,
            ),
          ),
        ],
      ),
    );
  }
}

class _DesaturatedMapBackground extends StatelessWidget {
  const _DesaturatedMapBackground();

  @override
  Widget build(BuildContext context) {
    return ColoredBox(
      color: AppColors.surfaceAlt,
      child: Opacity(
        opacity: 0.6,
        child: ColorFiltered(
          colorFilter: const ColorFilter.matrix(<double>[
            0.2126,
            0.7152,
            0.0722,
            0,
            0,
            0.2126,
            0.7152,
            0.0722,
            0,
            0,
            0.2126,
            0.7152,
            0.0722,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
          ]),
          child: SizedBox.expand(
            child: Image.asset(
              AppAssets.mapBackground,
              fit: BoxFit.cover,
              alignment: Alignment.center,
            ),
          ),
        ),
      ),
    );
  }
}

class _MapMarkers extends StatelessWidget {
  const _MapMarkers({required this.size});

  final Size size;

  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        Positioned(
          left: (size.width * 0.5) - 96,
          top: (size.height * 0.48) - 96,
          child: const _RadiusCircle(),
        ),
        Positioned(
          left: (size.width * 0.42 - 16).clamp(22.0, size.width - 54),
          top: (size.height * 0.36).clamp(230.0, size.height - 260),
          child: const _PinMarker(),
        ),
        Positioned(
          left: (size.width * 0.5) - 24,
          top: (size.height * 0.48) - 24,
          child: const _ClusterMarker(count: '12', size: 48, innerSize: 32),
        ),
        Positioned(
          right: (size.width * 0.25).clamp(24, size.width - 112),
          bottom: (size.height * 0.36).clamp(206, size.height - 248),
          child: const _ClusterMarker(count: '5', size: 40, innerSize: 28),
        ),
      ],
    );
  }
}

class _RadiusCircle extends StatelessWidget {
  const _RadiusCircle();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 192,
      height: 192,
      decoration: BoxDecoration(
        color: AppColors.ink.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppColors.ink.withValues(alpha: 0.1),
          width: 2,
        ),
      ),
    );
  }
}

class _PinMarker extends StatelessWidget {
  const _PinMarker();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 32,
      height: 32,
      decoration: BoxDecoration(
        color: AppColors.ink,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white, width: 2),
        boxShadow: const [
          BoxShadow(
            color: Color(0x1A000000),
            blurRadius: 15,
            offset: Offset(0, 10),
          ),
        ],
      ),
      child: const Icon(LucideIcons.mapPin, color: Colors.white, size: 17),
    );
  }
}

class _ClusterMarker extends StatelessWidget {
  const _ClusterMarker({
    required this.count,
    required this.size,
    required this.innerSize,
  });

  final String count;
  final double size;
  final double innerSize;

  @override
  Widget build(BuildContext context) {
    final isLarge = innerSize >= 32;

    return Container(
      width: size,
      height: size,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: AppColors.ink.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Container(
        width: innerSize,
        height: innerSize,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: AppColors.ink,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.white, width: 2),
          boxShadow: const [
            BoxShadow(
              color: Color(0x1A000000),
              blurRadius: 6,
              offset: Offset(0, 4),
            ),
          ],
        ),
        child: Text(
          count,
          style: TextStyle(
            color: Colors.white,
            fontSize: isLarge ? 20 : 12,
            height: isLarge ? 1.4 : 1.33,
            letterSpacing: isLarge ? 0 : 0.6,
            fontWeight: FontWeight.w400,
          ),
        ),
      ),
    );
  }
}

class _FloatingMapControls extends StatelessWidget {
  const _FloatingMapControls({
    required this.radiusLabel,
    required this.radiusOptions,
    required this.selectedRadius,
    required this.showRadiusMenu,
    required this.onRadiusTap,
    required this.onRadiusSelected,
  });

  final String radiusLabel;
  final List<int> radiusOptions;
  final int selectedRadius;
  final bool showRadiusMenu;
  final VoidCallback onRadiusTap;
  final ValueChanged<int> onRadiusSelected;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const _MapSearchBar(),
        const SizedBox(height: 16),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            _RadiusDropdown(
              label: '$radiusLabel 반경',
              options: radiusOptions,
              selectedRadius: selectedRadius,
              isOpen: showRadiusMenu,
              onTap: onRadiusTap,
              onSelected: onRadiusSelected,
            ),
            const _CurrentLocationButton(),
          ],
        ),
      ],
    );
  }
}

class _MapSearchBar extends StatelessWidget {
  const _MapSearchBar();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 48,
      padding: const EdgeInsets.symmetric(horizontal: 17),
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
      child: const Row(
        children: [
          Icon(LucideIcons.search, size: 20, color: AppColors.body),
          SizedBox(width: 20),
          Expanded(
            child: Text(
              '성수동 팝업스토어 검색',
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: Color(0xFF6B7280),
                fontSize: 14,
                height: 1.2,
                fontWeight: FontWeight.w400,
              ),
            ),
          ),
          SizedBox(width: 8),
          Icon(LucideIcons.slidersHorizontal, size: 20, color: AppColors.ink),
        ],
      ),
    );
  }
}

class _RadiusDropdown extends StatelessWidget {
  const _RadiusDropdown({
    required this.label,
    required this.options,
    required this.selectedRadius,
    required this.isOpen,
    required this.onTap,
    required this.onSelected,
  });

  final String label;
  final List<int> options;
  final int selectedRadius;
  final bool isOpen;
  final VoidCallback onTap;
  final ValueChanged<int> onSelected;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 128,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          GestureDetector(
            behavior: HitTestBehavior.opaque,
            onTap: onTap,
            child: Container(
              height: 36,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              decoration: BoxDecoration(
                color: AppColors.ink,
                borderRadius: BorderRadius.circular(12),
                boxShadow: const [
                  BoxShadow(
                    color: Color(0x0D000000),
                    blurRadius: 1,
                    offset: Offset(0, 1),
                  ),
                ],
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      height: 1.33,
                      letterSpacing: 0.6,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  const SizedBox(width: 8),
                  const Icon(
                    LucideIcons.chevronDown,
                    color: Colors.white,
                    size: 14,
                  ),
                ],
              ),
            ),
          ),
          if (isOpen)
            Positioned(
              left: 0,
              top: 45,
              child: Container(
                width: 128,
                padding: const EdgeInsets.symmetric(vertical: 9),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                    color: AppColors.border.withValues(alpha: 0.3),
                  ),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x1A000000),
                      blurRadius: 15,
                      offset: Offset(0, 10),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children:
                      options.map((option) {
                        final selected = option == selectedRadius;
                        final label = option == 1000 ? '1km' : '${option}m';

                        return GestureDetector(
                          behavior: HitTestBehavior.opaque,
                          onTap: () => onSelected(option),
                          child: Container(
                            height: 36,
                            alignment: Alignment.centerLeft,
                            padding: const EdgeInsets.symmetric(horizontal: 16),
                            color:
                                selected
                                    ? AppColors.surfaceAlt.withValues(
                                      alpha: 0.5,
                                    )
                                    : Colors.transparent,
                            child: Text(
                              label,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                color:
                                    selected
                                        ? AppColors.ink
                                        : const Color(0xFF1C1B1C),
                                fontSize: 14,
                                height: 1.43,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                          ),
                        );
                      }).toList(),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _CurrentLocationButton extends StatelessWidget {
  const _CurrentLocationButton();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 40,
      height: 40,
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
      child: const Icon(
        LucideIcons.locateFixed,
        color: AppColors.ink,
        size: 22,
      ),
    );
  }
}

class _QuickPreviewCard extends StatelessWidget {
  const _QuickPreviewCard({
    required this.saved,
    required this.onWaitingTap,
    required this.onSaveTap,
  });

  final bool saved;
  final VoidCallback onWaitingTap;
  final VoidCallback onSaveTap;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppColors.border.withValues(alpha: 0.2)),
        boxShadow: const [
          BoxShadow(
            color: Color(0x0D000000),
            blurRadius: 2,
            offset: Offset(0, 1),
          ),
        ],
      ),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: SizedBox(
                    width: 80,
                    height: 80,
                    child: OverflowBox(
                      maxWidth: 243,
                      maxHeight: 80,
                      alignment: Alignment.center,
                      child: Image.asset(
                        AppAssets.mapPreview,
                        width: 243,
                        height: 80,
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                const Expanded(child: _PreviewContent()),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 4, 16, 16),
            child: Row(
              children: [
                Expanded(
                  child: GestureDetector(
                    behavior: HitTestBehavior.opaque,
                    onTap: onWaitingTap,
                    child: Container(
                      height: 40,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: AppColors.ink,
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: const Text(
                        '웨이팅 신청하기',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          height: 1.33,
                          letterSpacing: 0.6,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  onTap: onSaveTap,
                  child: Container(
                    width: 40,
                    height: 40,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: AppColors.border),
                    ),
                    child: Icon(
                      saved ? LucideIcons.heart : LucideIcons.heart,
                      color: saved ? AppColors.danger : AppColors.body,
                      fill: saved ? 1 : 0,
                      size: 22,
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

class _PreviewContent extends StatelessWidget {
  const _PreviewContent();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        const Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            _NewBadge(),
            Flexible(
              child: Text(
                '200m away',
                textAlign: TextAlign.right,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  color: Color(0xFF45474B),
                  fontSize: 12,
                  height: 1.33,
                  letterSpacing: 0.6,
                  fontWeight: FontWeight.w400,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        const Text(
          'Aromatic Cloud Popup',
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: TextStyle(
            color: AppColors.ink,
            fontSize: 20,
            height: 1.4,
            fontWeight: FontWeight.w400,
          ),
        ),
        const Text(
          '성수동 2가 314-1',
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: TextStyle(
            color: Color(0xFF45474B),
            fontSize: 14,
            height: 1.43,
            fontWeight: FontWeight.w400,
          ),
        ),
      ],
    );
  }
}

class _NewBadge extends StatelessWidget {
  const _NewBadge();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 24,
      padding: const EdgeInsets.symmetric(horizontal: 9),
      alignment: Alignment.center,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(2),
        border: Border.all(color: AppColors.ink.withValues(alpha: 0.2)),
      ),
      child: const Text(
        'NEW',
        style: TextStyle(
          color: AppColors.ink,
          fontSize: 12,
          height: 1.33,
          letterSpacing: 0.6,
          fontWeight: FontWeight.w400,
        ),
      ),
    );
  }
}

class _MapBottomNavBar extends StatelessWidget {
  const _MapBottomNavBar({required this.activeTab});

  final AppTab activeTab;

  @override
  Widget build(BuildContext context) {
    final bottomInset = MediaQuery.paddingOf(context).bottom;

    return Container(
      height: 100 + bottomInset,
      padding: EdgeInsets.only(bottom: bottomInset),
      decoration: const BoxDecoration(
        color: AppColors.surfaceAlt,
        borderRadius: BorderRadius.vertical(top: Radius.circular(8)),
        boxShadow: [
          BoxShadow(
            color: Color(0x0D000000),
            blurRadius: 1,
            offset: Offset(0, 1),
          ),
        ],
      ),
      child: Row(
        children:
            AppTab.values.map((tab) {
              return Expanded(
                child: _MapBottomNavItem(
                  tab: tab,
                  active: tab == activeTab,
                  onTap: () {
                    if (tab == activeTab) {
                      return;
                    }
                    context.goNamed(tab.page.name);
                  },
                ),
              );
            }).toList(),
      ),
    );
  }
}

class _MapBottomNavItem extends StatelessWidget {
  const _MapBottomNavItem({
    required this.tab,
    required this.active,
    required this.onTap,
  });

  final AppTab tab;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: onTap,
      child: Center(
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 140),
          curve: Curves.easeOut,
          constraints: const BoxConstraints(minWidth: 48, minHeight: 48),
          padding:
              active
                  ? const EdgeInsets.symmetric(horizontal: 16, vertical: 8)
                  : const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: active ? AppColors.ink : Colors.transparent,
            borderRadius: BorderRadius.circular(12),
            boxShadow:
                active
                    ? const [
                      BoxShadow(
                        color: Color(0x0D000000),
                        blurRadius: 1,
                        offset: Offset(0, 1),
                      ),
                    ]
                    : null,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                tab.icon,
                color: active ? Colors.white : const Color(0xFF45474B),
                size: 20,
              ),
              SizedBox(height: active ? 2 : 4),
              Text(
                tab.label,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  color: active ? Colors.white : const Color(0xFF45474B),
                  fontSize: 12,
                  height: 1.33,
                  letterSpacing: 0.6,
                  fontWeight: FontWeight.w400,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _IconTapTarget extends StatelessWidget {
  const _IconTapTarget({
    required this.icon,
    required this.onTap,
    this.iconSize = 20,
  });

  final IconData icon;
  final VoidCallback onTap;
  final double iconSize;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: onTap,
      child: SizedBox(
        width: 44,
        height: 44,
        child: Icon(icon, color: AppColors.ink, size: iconSize),
      ),
    );
  }
}
