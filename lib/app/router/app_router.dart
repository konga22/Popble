import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';

import '../../ui/pages/auth/loading_page.dart';
import '../../ui/pages/auth/login_page.dart';
import '../../ui/pages/auth/onboarding_page.dart';
import '../../ui/pages/auth/permission_page.dart';
import '../../ui/pages/calendar/calendar_page.dart';
import '../../ui/pages/community/community_page.dart';
import '../../ui/pages/community/community_write_page.dart';
import '../../ui/pages/home/home_page.dart';
import '../../ui/pages/inventory/inventory_page.dart';
import '../../ui/pages/map/map_page.dart';
import '../../ui/pages/popup/popup_detail_page.dart';
import '../../ui/pages/profile/profile_detail_page.dart';
import '../../ui/pages/profile/profile_page.dart';
import '../../ui/pages/review/review_write_page.dart';
import '../../ui/pages/search/search_page.dart';
import '../../ui/pages/waiting/waiting_page.dart';
import '../../ui/pages/waiting/waiting_status_page.dart';
import 'app_page.dart';

final appRouter = GoRouter(
  initialLocation: AppPage.loading.path,
  routes: [
    GoRoute(
      name: AppPage.loading.name,
      path: AppPage.loading.path,
      builder: (_, __) => const LoadingPage(),
    ),
    GoRoute(
      name: AppPage.onboarding.name,
      path: AppPage.onboarding.path,
      builder: (_, __) => const OnboardingPage(),
    ),
    GoRoute(
      name: AppPage.permissions.name,
      path: AppPage.permissions.path,
      builder: (_, __) => const PermissionPage(),
    ),
    GoRoute(
      name: AppPage.login.name,
      path: AppPage.login.path,
      builder: (_, __) => const LoginPage(),
    ),
    GoRoute(
      name: AppPage.home.name,
      path: AppPage.home.path,
      pageBuilder: (_, __) => _fadePage(const HomePage()),
    ),
    GoRoute(
      name: AppPage.search.name,
      path: AppPage.search.path,
      pageBuilder: (_, __) => _fadePage(const SearchPage()),
    ),
    GoRoute(
      name: AppPage.map.name,
      path: AppPage.map.path,
      pageBuilder: (_, __) => _fadePage(const MapPage()),
    ),
    GoRoute(
      name: AppPage.community.name,
      path: AppPage.community.path,
      pageBuilder: (_, __) => _fadePage(const CommunityPage()),
    ),
    GoRoute(
      name: AppPage.profile.name,
      path: AppPage.profile.path,
      pageBuilder: (_, __) => _fadePage(const ProfilePage()),
    ),
    GoRoute(
      name: AppPage.calendar.name,
      path: AppPage.calendar.path,
      builder: (_, __) => const CalendarPage(),
    ),
    GoRoute(
      name: AppPage.popupDetail.name,
      path: AppPage.popupDetail.path,
      builder: (_, state) {
        final popupId = state.pathParameters['id'] ?? 'maison-kitsune';
        return PopupDetailPage(popupId: popupId);
      },
    ),
    GoRoute(
      name: AppPage.waiting.name,
      path: AppPage.waiting.path,
      builder: (_, __) => const WaitingPage(),
    ),
    GoRoute(
      name: AppPage.waitingStatus.name,
      path: AppPage.waitingStatus.path,
      builder: (_, __) => const WaitingStatusPage(),
    ),
    GoRoute(
      name: AppPage.inventory.name,
      path: AppPage.inventory.path,
      builder: (_, __) => const InventoryPage(),
    ),
    GoRoute(
      name: AppPage.reviewWrite.name,
      path: AppPage.reviewWrite.path,
      builder: (_, __) => const ReviewWritePage(),
    ),
    GoRoute(
      name: AppPage.communityWrite.name,
      path: AppPage.communityWrite.path,
      builder: (_, __) => const CommunityWritePage(),
    ),
    GoRoute(
      name: AppPage.profileDetail.name,
      path: AppPage.profileDetail.path,
      builder: (_, __) => const ProfileDetailPage(),
    ),
  ],
);

CustomTransitionPage<void> _fadePage(Widget child) {
  return CustomTransitionPage<void>(
    child: child,
    transitionDuration: const Duration(milliseconds: 110),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return FadeTransition(opacity: animation, child: child);
    },
  );
}
