import 'package:flutter/widgets.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import 'app_page.dart';

enum AppTab { search, map, home, community, profile }

extension AppTabExtension on AppTab {
  String get label => switch (this) {
    AppTab.search => '검색',
    AppTab.map => '지도',
    AppTab.home => '홈',
    AppTab.community => '커뮤니티',
    AppTab.profile => '마이페이지',
  };

  IconData get icon => switch (this) {
    AppTab.search => LucideIcons.search,
    AppTab.map => LucideIcons.map,
    AppTab.home => LucideIcons.house,
    AppTab.community => LucideIcons.messageCircle,
    AppTab.profile => LucideIcons.user,
  };

  AppPage get page => switch (this) {
    AppTab.search => AppPage.search,
    AppTab.map => AppPage.map,
    AppTab.home => AppPage.home,
    AppTab.community => AppPage.community,
    AppTab.profile => AppPage.profile,
  };
}
