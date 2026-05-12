import '../models/mock_models.dart';

class MockCommunityService {
  const MockCommunityService._();

  static final posts = <CommunityPost>[
    const CommunityPost(
      author: '김민지',
      timeAgo: '2분 전',
      category: '메이트',
      title: '탬버린즈 성수 워크숍 같이 가실 분!',
      popupTitle: 'Tamburins Seongsu',
      body: '이번 주말 성수동 팝업 같이 돌면서 사진 찍고 이야기하실 분 찾아요.',
      likes: 124,
      comments: 12,
      status: '2/4 모집중',
    ),
    const CommunityPost(
      author: '박알렉스',
      timeAgo: '방문 후기',
      category: '후기',
      title: 'Dior Concept Store는 오전 방문 추천',
      popupTitle: 'Dior Concept Store',
      body:
          'The exhibition was breathtaking. Highly recommend visiting early morning.',
      likes: 89,
      comments: 5,
      status: 'HOT',
    ),
    const CommunityPost(
      author: '이지우',
      timeAgo: '1시간 전',
      category: '교환',
      title: '더현대 팝업 내일 가실 분 구해요!',
      popupTitle: 'The Hyundai Popup',
      body: '굿즈 교환도 같이 보면 좋을 것 같아요.',
      likes: 52,
      comments: 8,
      status: '마감임박',
    ),
  ];
}
