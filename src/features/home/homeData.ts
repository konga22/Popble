import { MOCK_IMAGES } from "../../constants/mockImages";

export type HomeSectionKey = "trending" | "comingSoon" | "closingSoon";

export type PopupStatus = "open" | "comingSoon" | "closingSoon" | "closed";

export type TrendingKeywordTone = "pink" | "sky" | "neutral";

export type TrendingKeyword = {
  id: string;
  rank: number;
  label: string;
  query: string;
  tone: TrendingKeywordTone;
};

export type PopupSummary = {
  id: string;
  image: string;
  category: string;
  title: string;
  area: string;
  venue: string;
  address: string;
  periodLabel: string;
  hours: string;
  description: string;
  status: PopupStatus;
  searchKeywords: string[];
  highlights: string[];
  hot?: boolean;
  dday?: string;
  closingSubtitle?: string;
  closingBadge?: string;
  urgent?: boolean;
  isSaved?: boolean;
  reminderEnabled?: boolean;
};

export type HomeFeed = {
  trendingKeywords: TrendingKeyword[];
  trendingPopups: PopupSummary[];
  comingSoonPopups: PopupSummary[];
  closingSoonPopups: PopupSummary[];
};

export const HOME_SECTION_META: Record<
  HomeSectionKey,
  { title: string; actionLabel: string; description: string }
> = {
  trending: {
    title: "현재 인기 있는 팝업",
    actionLabel: "전체보기",
    description: "지금 Popble에서 가장 많이 열어본 팝업이에요.",
  },
  comingSoon: {
    title: "곧 오픈할 팝업",
    actionLabel: "D-Day 알림",
    description: "오픈 전에 저장하고 알림을 받아볼 수 있어요.",
  },
  closingSoon: {
    title: "종료 임박 팝업",
    actionLabel: "Hurry Up!",
    description: "놓치기 전에 오늘 갈 수 있는 팝업을 확인해요.",
  },
};

const POPUPS: PopupSummary[] = [
  {
    id: "studio-mood-garden",
    image: MOCK_IMAGES.trendingGarden,
    category: "Fashion · Seongsu",
    title: "스튜디오 무드: 여름 정원",
    area: "성수동",
    venue: "스튜디오 무드 성수",
    address: "서울 성동구 연무장길 12",
    periodLabel: "~ 08.24 까지",
    hours: "11:00 - 20:00",
    description:
      "플라워 오브제와 시즌 한정 의류를 함께 볼 수 있는 정원 콘셉트 팝업이에요.",
    status: "open",
    hot: true,
    isSaved: true,
    reminderEnabled: true,
    searchKeywords: ["성수", "패션", "정원", "스튜디오", "무드"],
    highlights: ["한정 굿즈", "포토존", "예약 없이 입장"],
  },
  {
    id: "dessert-lab-saturday",
    image: MOCK_IMAGES.dessertLab,
    category: "Cafe · Hannam",
    title: "토요일 한정 디저트 랩 팝업",
    area: "한남동",
    venue: "랩스위트 한남",
    address: "서울 용산구 이태원로54길 18",
    periodLabel: "~ 09.02 까지",
    hours: "12:00 - 19:30",
    description:
      "토요일마다 다른 디저트 박스를 공개하는 예약제 디저트 실험실 팝업이에요.",
    status: "open",
    searchKeywords: ["한남", "디저트", "카페", "토요일", "예약"],
    highlights: ["토요일 한정", "예약 추천", "테이크아웃 가능"],
  },
  {
    id: "glow-beauty-bar",
    image: MOCK_IMAGES.beautyBar,
    category: "Beauty · Seongsu",
    title: "글로우 뷰티 바 캡슐 스토어",
    area: "성수동",
    venue: "글로우 바",
    address: "서울 성동구 아차산로 88",
    periodLabel: "~ 09.08 까지",
    hours: "10:30 - 20:30",
    description:
      "신제품 테스트와 퍼스널 컬러 상담을 함께 경험할 수 있는 뷰티 캡슐 스토어입니다.",
    status: "open",
    searchKeywords: ["성수", "뷰티", "메이크업", "글로우", "캡슐"],
    highlights: ["퍼스널 컬러", "샘플 증정", "현장 예약"],
  },
  {
    id: "lovesome-market-2",
    image: MOCK_IMAGES.comingMarket,
    category: "Lifestyle · Yeonnam",
    title: "러브썸 마켓 vol.2",
    area: "연남동",
    venue: "러브썸 하우스",
    address: "서울 마포구 동교로46길 26",
    periodLabel: "08.27 오픈",
    hours: "11:00 - 21:00",
    description:
      "핸드메이드 오브제와 향 제품을 모은 감성 마켓 팝업이에요.",
    status: "comingSoon",
    dday: "D-3",
    reminderEnabled: true,
    searchKeywords: ["연남", "마켓", "오브제", "향", "러브썸"],
    highlights: ["오픈런 예상", "선착순 키링", "반려동물 동반"],
  },
  {
    id: "sound-studio-exhibit",
    image: MOCK_IMAGES.soundStudio,
    category: "Music · Hongdae",
    title: "사운드 스튜디오 전시",
    area: "홍대",
    venue: "웨이브 스튜디오",
    address: "서울 마포구 와우산로 42",
    periodLabel: "08.31 오픈",
    hours: "13:00 - 22:00",
    description:
      "헤드폰으로 공간별 사운드를 감상하는 몰입형 음악 전시 팝업입니다.",
    status: "comingSoon",
    dday: "D-7",
    searchKeywords: ["홍대", "음악", "전시", "사운드", "스튜디오"],
    highlights: ["야간 운영", "청음존", "예약 권장"],
  },
  {
    id: "city-picnic-popup",
    image: MOCK_IMAGES.picnicPopup,
    category: "Outdoor · Yeouido",
    title: "도심 속 피크닉 팝업",
    area: "여의도",
    venue: "리버사이드 라운지",
    address: "서울 영등포구 여의동로 330",
    periodLabel: "09.03 오픈",
    hours: "10:00 - 18:00",
    description:
      "피크닉 매트, 음료, 포토 소품을 대여해주는 주말 한정 야외 팝업이에요.",
    status: "comingSoon",
    dday: "D-10",
    searchKeywords: ["여의도", "피크닉", "야외", "주말", "리버"],
    highlights: ["주말 한정", "한강 근처", "소품 대여"],
  },
  {
    id: "glow-beauty-closet",
    image: MOCK_IMAGES.closingBeauty,
    category: "Beauty · Cheongdam",
    title: "글로우 뷰티 클로젯",
    area: "청담동",
    venue: "클로젯 라운지",
    address: "서울 강남구 도산대로 420",
    periodLabel: "오늘 종료",
    hours: "10:00 - 21:00",
    description:
      "뷰티 브랜드 샘플링과 메이크업 터치업을 받을 수 있는 종료 임박 팝업입니다.",
    status: "closingSoon",
    closingSubtitle: "오늘 영업 종료",
    closingBadge: "2시간 남음",
    urgent: true,
    isSaved: true,
    searchKeywords: ["청담", "뷰티", "클로젯", "샘플", "종료"],
    highlights: ["오늘 종료", "현장 샘플", "빠른 입장"],
  },
  {
    id: "vintage-archive-popup",
    image: MOCK_IMAGES.vintageArchive,
    category: "Vintage · Itaewon",
    title: "빈티지 아카이브 팝업",
    area: "이태원",
    venue: "아카이브 룸",
    address: "서울 용산구 보광로 102",
    periodLabel: "내일 종료",
    hours: "12:00 - 20:00",
    description:
      "빈티지 재킷과 포스터 컬렉션을 한자리에서 볼 수 있는 아카이브 팝업이에요.",
    status: "closingSoon",
    closingSubtitle: "내일 영업 종료",
    closingBadge: "D-1",
    searchKeywords: ["이태원", "빈티지", "아카이브", "패션", "포스터"],
    highlights: ["내일 종료", "희소 아이템", "카드 결제"],
  },
];

export const HOME_FEED: HomeFeed = {
  trendingKeywords: [
    {
      id: "keyword-seongsu-dior",
      rank: 1,
      label: "성수 디올",
      query: "성수",
      tone: "pink",
    },
    {
      id: "keyword-sanrio-market",
      rank: 2,
      label: "산리오 마켓",
      query: "마켓",
      tone: "sky",
    },
    {
      id: "keyword-bread-garden",
      rank: 3,
      label: "빵가든",
      query: "디저트",
      tone: "neutral",
    },
  ],
  trendingPopups: POPUPS.slice(0, 3),
  comingSoonPopups: POPUPS.slice(3, 6),
  closingSoonPopups: POPUPS.slice(6, 8),
};

export function getHomeFeed() {
  return HOME_FEED;
}

export function getAllHomePopups() {
  return POPUPS;
}

export function getPopupById(id: string) {
  return POPUPS.find((popup) => popup.id === id);
}

export function getPopupsBySection(section: HomeSectionKey) {
  switch (section) {
    case "comingSoon":
      return HOME_FEED.comingSoonPopups;
    case "closingSoon":
      return HOME_FEED.closingSoonPopups;
    case "trending":
    default:
      return HOME_FEED.trendingPopups;
  }
}

export function isHomeSectionKey(value: string): value is HomeSectionKey {
  return value === "trending" || value === "comingSoon" || value === "closingSoon";
}

export function searchHomePopups(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return HOME_FEED.trendingPopups;
  }

  return POPUPS.filter((popup) => {
    const searchableText = [
      popup.title,
      popup.category,
      popup.area,
      popup.venue,
      popup.address,
      ...popup.searchKeywords,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}
