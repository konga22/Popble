# 팝업메이트 화면 목록 & 스펙

피그마 파일키: `C8fidVKmN9LrNnDkIVbLyu`
전체 섹션 Node ID: `5:171`
모든 화면 기준 너비: **390px**

현재 화면들은 Expo Router의 `app/` route 파일에서 `src/screens/*Screen.tsx`를 감싸는 구조다. 데이터와 이미지는 실제 API/운영 에셋이 아니라 mock/static 구현이며, 기존 Figma MCP 임시 asset URL은 `src/constants/mockImages.ts`의 안정적인 mock image constants로 교체되어 있다. 홈 탭은 mock 데이터 기반으로 검색, 팝업 상세, 전체보기, 저장/알림, 제보 route가 1차 연결되어 있다. 홈 신규 디자인은 정식 `HomeScreen`과 `HomeSearchScreen`으로 채택되어 있다.

---

## 화면 목록

| 화면 | Route 파일 | Screen 파일 | Node ID | 상태 | 비고 |
|------|------------|-------------|---------|------|------|
| 홈 | `app/index.tsx` | `src/screens/HomeScreen.tsx` | `179:8` | ✅ 신규 디자인 적용 | mock 데이터 기반 검색/상세/전체보기/저장/알림 |
| 홈 검색 | `app/search.tsx` | `src/screens/HomeSearchScreen.tsx` | - | ✅ 신규 디자인 적용 | 검색바/상세검색/최근검색/추천/순위 |
| 팝업 상세 | `app/popups/[id].tsx` | `src/screens/PopupDetailScreen.tsx` | - | ✅ 1차 기능 구현 | 홈 mock 팝업 상세, 저장/알림 |
| 팝업 섹션 목록 | `app/popups/section/[section].tsx` | `src/screens/PopupCollectionScreen.tsx` | - | ✅ 1차 기능 구현 | 인기/오픈예정/종료임박 전체보기 |
| 팝업 제보 | `app/popups/submit.tsx` | `src/screens/PopupSubmissionScreen.tsx` | - | ✅ 1차 기능 구현 | 홈 FAB 제보 mock 폼 |
| 지도 메인 | `app/map.tsx` | `src/screens/MapScreen.tsx` | `179:169` | ✅ 구현 | mock/static 지도 탐색 |
| 커뮤니티 메인 | `app/community.tsx` | `src/screens/CommunityMainScreen.tsx` | `182:1276` | ✅ 구현 | mock/static 인기글 메인 |
| 커뮤니티 피드 | `app/community-feed.tsx` | `src/screens/CommunityScreen.tsx` | `179:281` | ✅ 구현 | mock/static 모집/교환/팁 피드 |
| 리뷰 & 별점 | `app/review.tsx` | `src/screens/ReviewScreen.tsx` | `179:601` | ✅ 구현 | mock/static 리뷰 아카이브 UI |
| 팝업 파트너 | `app/partner.tsx` | `src/screens/PartnerScreen.tsx` | `181:756` | ✅ 구현 | mock/static 동행 모집 |
| 저장 | `app/saved.tsx` | `src/screens/SavedScreen.tsx` | - | ✅ 구현 | placeholder/static 저장 화면 |
| 마이 | `app/profile.tsx` | `src/screens/ProfileScreen.tsx` | - | ✅ 구현 | placeholder/static 프로필 화면 |

---

## Route 구조

```txt
app/
├── _layout.tsx          # SafeAreaProvider + NavigationRoot
├── index.tsx            # 홈
├── search.tsx           # 홈 검색
├── popups/
│   ├── [id].tsx         # 팝업 상세
│   ├── submit.tsx       # 팝업 제보
│   └── section/
│       └── [section].tsx # 홈 섹션 전체보기
├── map.tsx              # 지도
├── community.tsx        # 커뮤니티 메인
├── community-feed.tsx   # 커뮤니티 피드
├── review.tsx           # 리뷰 & 별점
├── partner.tsx          # 팝업 파트너
├── saved.tsx            # 저장
└── profile.tsx          # 마이
```

`app/_layout.tsx`는 `src/global/navigation/NavigationContext.tsx`의 `NavigationRoot`를 렌더링한다. 각 route 파일은 해당 screen 컴포넌트에 `useAppScreenProps()` 결과를 전달한다.

---

## 1. 홈

- **Route**: `app/index.tsx`
- **파일**: `src/screens/HomeScreen.tsx`
- **Node ID**: `179:8`
- **상태**: ✅ 신규 디자인 적용, mock/static
- **기능 상태**: mock 데이터 기반 검색/상세/전체보기/저장/알림/제보 route 연결
- **높이**: 1735px 기준 스크롤

신규 홈 디자인은 정식 `src/screens/HomeScreen.tsx`에 반영되어 있다.

| 섹션 | Node ID | 설명 |
|------|---------|------|
| TopAppBar | `179:157` | 햄버거 + 로고 + 알림 |
| Search Bar | `179:10` | 검색창 + 트렌딩 키워드 칩 |
| Map Banner | `179:30` | 지도 CTA 배너 |
| Trending Popups | `179:41` | 수평 카드 리스트 |
| Coming Soon | `179:71` | 오픈 예정 카드 리스트 |
| Closing Soon | `179:99` | 종료 임박 리스트 |
| BottomNavBar | `190:73` | 홈 탭 active |
| FAB | `179:154` | 우하단 플로팅 액션 |

홈 관련 route:

| Route | 설명 |
|-------|------|
| `/search` | 검색어 입력, 트렌딩 키워드, 홈 팝업 검색 결과 |
| `/popups/[id]` | 팝업 상세, 저장/알림, 지도 이동 CTA |
| `/popups/section/[section]` | `trending`, `comingSoon`, `closingSoon` 섹션 전체보기 |
| `/popups/submit` | 새 팝업 제보 mock 폼 |

---

## 2. 지도 메인

- **Route**: `app/map.tsx`
- **파일**: `src/screens/MapScreen.tsx`
- **Node ID**: `179:169`
- **상태**: ✅ 구현, mock/static
- **높이**: 884px 기준 풀스크린

| 섹션 | Node ID | 설명 |
|------|---------|------|
| Map Canvas | `179:170` | mock 지도 배경 |
| TopAppBar | `179:247` | 공통 상단 바 |
| Filter Chips | `179:198` | 수평 필터 칩 |
| Map Pins | - | mock 위치 핀과 레이블 |
| Detail Card | `179:211` | 선택된 팝업 상세 카드 |
| Refresh Button | `179:243` | 현 위치/새로고침 액션 |
| BottomNavBar | - | 지도 탭 active |

---

## 3. 커뮤니티 메인

- **Route**: `app/community.tsx`
- **파일**: `src/screens/CommunityMainScreen.tsx`
- **Node ID**: `182:1276`
- **상태**: ✅ 구현, mock/static
- **높이**: 1756.67px 기준 스크롤

| 섹션 | Node ID | 설명 |
|------|---------|------|
| TopAppBar | - | 햄버거 + 제목 + 필터 |
| Hero Section | `182:1278` | 실시간 인기글 히어로 |
| Trending Feed | `182:1283` | 비대칭 트렌딩 포스트 |
| FAB | `182:1361` | 글쓰기 액션 |
| BottomNavBar | - | 커뮤니티 탭 active |

---

## 4. 커뮤니티 피드

- **Route**: `app/community-feed.tsx`
- **파일**: `src/screens/CommunityScreen.tsx`
- **Node ID**: `179:281`
- **상태**: ✅ 구현, mock/static
- **높이**: 1402px 기준 스크롤

| 섹션 | Node ID | 설명 |
|------|---------|------|
| TopAppBar | - | 공통 상단 바 |
| Mate Recruitment | `179:283` | 팝업 메이트 모집 카드 |
| Item Exchange | `179:330` | 인증/굿즈 교환 그리드 |
| Anonymous Tips | `179:375` | 익명 팁 피드 |
| FAB | - | 글쓰기 액션 |
| BottomNavBar | - | 커뮤니티 탭 active |

---

## 5. 리뷰 & 별점

- **Route**: `app/review.tsx`
- **파일**: `src/screens/ReviewScreen.tsx`
- **Node ID**: `179:601`
- **상태**: ✅ 구현, mock/static
- **높이**: 1902px 기준 스크롤

| 섹션 | Node ID | 설명 |
|------|---------|------|
| TopAppBar | - | 공통 상단 바 |
| Editorial Header | `179:603` | Review Archive 헤더 |
| Rating Overview | `179:608` | 평점 카드와 필터 태그 |
| Review List | `179:635` | 에디토리얼 리뷰 리스트 |
| FAB | `179:718` | 리뷰 작성 액션 |
| BottomNavBar | - | 커뮤니티 탭 active |

---

## 6. 팝업 파트너

- **Route**: `app/partner.tsx`
- **파일**: `src/screens/PartnerScreen.tsx`
- **Node ID**: `181:756`
- **상태**: ✅ 구현, mock/static
- **높이**: 1866px 기준 스크롤

| 섹션 | Node ID | 설명 |
|------|---------|------|
| TopAppBar | `181:758` | 햄버거 + 제목 + 필터 |
| Filter Chips | `181:763` | 모집 조건 필터 |
| Recruitment Cards | `181:773` | 파트너 모집 카드 리스트 |
| FAB | `181:874` | 새 모집글 작성 |
| BottomNavBar | - | 커뮤니티 탭 active |

---

## 7. 저장

- **Route**: `app/saved.tsx`
- **파일**: `src/screens/SavedScreen.tsx`
- **상태**: ✅ 구현, placeholder/static

저장한 팝업과 다시 볼 항목을 위한 탭 화면이다. 현재는 API 연동 전 정적 UI 단계다.

---

## 8. 마이

- **Route**: `app/profile.tsx`
- **파일**: `src/screens/ProfileScreen.tsx`
- **상태**: ✅ 구현, placeholder/static

내 활동, 설정, 알림 상태를 위한 탭 화면이다. 현재는 API/인증 연동 전 정적 UI 단계다.

---

## 공통 컴포넌트

### TopAppBar 변형

| 변형 | 구성 | 사용 화면 |
|------|------|-----------|
| 기본형 | 햄버거 + 로고/제목 + 액션 | 홈, 지도, 커뮤니티 계열 |
| 제목형 | 햄버거 + 텍스트 제목 + 필터/액션 | 파트너, 커뮤니티 메인 |
| 액션형 | 제목 + 공유/필터/알림 등 | 리뷰, 저장, 마이 |

### BottomNavBar

탭 순서는 `src/global/navigation/tabConfig.ts`의 `TAB_CONFIG`가 소유한다.

```txt
홈 | 지도 | 커뮤니티 | 저장 | 마이
```

`community-feed`, `review`, `partner` route는 `src/global/navigation/appRoutes.ts`의 `getActiveTab()`에서 커뮤니티 탭 active 상태로 매핑된다.
