import '../models/mock_models.dart';

class MockProfileService {
  const MockProfileService._();

  static const me = UserProfile(
    name: '김지수',
    handle: '@popup_jisoo',
    bio: '새로운 공간과 한정 굿즈를 기록하는 팝업 큐레이터입니다.',
    reviewCount: 12,
    savedCount: 48,
    badges: [
      UserBadge(title: 'Top Tier', caption: '대표 뱃지'),
      UserBadge(title: 'Trendsetter', caption: '트렌드 세터'),
      UserBadge(title: 'Certified', caption: '방문 인증'),
    ],
  );

  static const other = UserProfile(
    name: '김현준',
    handle: '@curator_jun',
    bio: '공간과 예술을 사랑하는 전시 큐레이터입니다.',
    reviewCount: 42,
    savedCount: 128,
    badges: [
      UserBadge(title: 'TOP REVIEWER', caption: '공개'),
      UserBadge(title: 'HOT TREND', caption: '활동'),
      UserBadge(title: 'EXHIBITIONIST', caption: '전시'),
    ],
  );
}
