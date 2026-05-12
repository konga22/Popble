# PopupMate 글로벌 기능 레지스트리

이 문서는 Flutter 리빌드 이후 앱 전역에서 공유되는 기능의 위치와 책임을 기록한다.

## 글로벌 기능 기준

아래 중 하나라도 만족하면 글로벌 기능으로 본다.

- 2개 이상 화면에서 같은 상태나 동작을 공유한다
- 앱 루트에서 초기화되거나 정리되어야 한다
- 라우팅, 탭, 인증, 테마처럼 앱 전체 UX에 영향을 준다
- 한 화면 수정이 다른 화면 동작까지 바꿀 가능성이 있다

## 작성 규칙

- 라우팅은 `lib/app/router/` 아래에서 관리한다.
- 테마 토큰은 `lib/app/theme/` 아래에서 관리한다.
- mock 데이터와 기능별 조회 로직은 `lib/services/` 아래에 둔다.
- 전역 공통 UI는 `lib/ui/common/` 아래에 둔다.
- 화면은 `lib/ui/pages/<feature>/` 아래에 둔다.
- 새 글로벌 기능을 만들면 이 문서의 레지스트리 표를 갱신한다.

## 현재 구조

```text
lib/
├── app/
│   ├── router/
│   │   ├── app_page.dart
│   │   ├── app_router.dart
│   │   └── app_tab.dart
│   ├── theme/
│   │   └── app_theme.dart
│   └── extensions/
├── models/
├── services/
└── ui/
    ├── common/
    └── pages/
```

## 레지스트리

| 기능명 | 범위 | 위치 | 현재 상태 | 설명 |
|------|------|------|------|------|
| App Root | 앱 전역 | `lib/main.dart` | ✅ 구현 | `runApp`, `MaterialApp.router`, 테마와 라우터 연결 |
| Route Enum | 앱 전역 | `lib/app/router/app_page.dart` | ✅ 구현 | 라우트 name/path/title 중앙 관리 |
| GoRouter | 앱 전역 | `lib/app/router/app_router.dart` | ✅ 구현 | 진입 흐름, 탭 화면, 상세/작성/웨이팅 flow 연결 |
| Bottom Tabs | 앱 전역 | `lib/app/router/app_tab.dart`, `lib/ui/common/app_components.dart` | ✅ 구현 | Search, Map, Home, Community, Profile 탭 정의와 렌더링 |
| Theme Tokens | 앱 전역 | `lib/app/theme/app_theme.dart` | ✅ 구현 | Figma 기반 색상, typography, Material theme 관리 |
| Spacing Extensions | 앱 전역 | `lib/app/extensions/` | ✅ 구현 | 간격, 화면 크기, 안전 영역 헬퍼 |
| Mock Models | 앱 전역 | `lib/models/mock_models.dart` | ✅ 구현 | Popup, Review, Community, Inventory, Waiting, Profile 모델 |
| Mock Services | 기능 전역 | `lib/services/` | ✅ 구현 | Firebase 전 단계의 mock 데이터 공급 |
| Common Components | 앱 전역 | `lib/ui/common/app_components.dart` | ✅ 구현 | TopBar, BottomNav, Button, Field, Card, Badge 등 |
| Global Overlay | 앱 전역 | 미정 | ⬜ 미구현 | 운영 단계에서 Toast/Dialog/Snackbar manager 후보 |
| Analytics | 앱 전역 | 미정 | ⬜ 미구현 | 화면 진입, CTA, 검색 이벤트 추적 후보 |

## 운영 메모

- 새 탭을 추가할 때는 `AppTab`, `AppPage`, `appRouter`, `AppBottomNavBar`의 탭 매핑을 함께 갱신한다.
- 화면에서 raw route path string을 직접 쓰지 않는다. `AppPage.<name>.name`과 `goNamed/pushNamed`를 사용한다.
- 실제 API/Firebase가 붙기 전까지 화면은 `Mock*Service`를 통해서만 데이터를 가져온다.
- Figma의 임시 이미지 URL은 직접 사용하지 않는다. 필요한 이미지는 `assets/` 또는 CDN으로 옮긴 뒤 참조한다.
