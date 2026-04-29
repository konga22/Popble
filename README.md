# 팝업메이트 개발 가이드

팝업메이트는 한국의 팝업 스토어를 발견, 탐색, 저장, 공유하는 모바일 앱입니다.

## 기술 스택

| 분류 | 기술 |
| --- | --- |
| 앱 프레임워크 | Expo SDK 54 |
| UI | React Native 0.81 |
| 언어 | TypeScript |
| 라우팅 | Expo Router |
| 스타일 | NativeWind v4 |
| 패키지 매니저 | npm, package-lock 기반 |
| 현재 백엔드 | 아직 미연동, mock 데이터 기반 |

## 빠른 시작

```bash
git clone https://github.com/konga22/PopupMate.git
cd PopupMate
npm ci
npm run typecheck
npx expo start
```

실행 후 터미널에서 아래 키를 누릅니다.

| 키 | 동작 |
| --- | --- |
| `i` | iOS Simulator 실행, macOS만 가능 |
| `a` | Android Emulator 실행 |
| QR 스캔 | 실제 iPhone/Android 폰에서 Expo Go 실행 |
| `w` | 웹 브라우저 실행 |

캐시가 꼬였을 때는 아래처럼 다시 시작합니다.

```bash
npx expo start -c
```

## 브랜치 작업 방식

이 프로젝트는 PM이 최종 머지를 확인하는 방식을 기준으로 운영합니다.

| 브랜치 | 용도 |
| --- | --- |
| `master` | 안정 버전, 배포 후보 |
| `dev` | 팀 작업이 모이는 개발 브랜치 |
| `team/konga22` | PM, 홈 화면, 전체 QA |
| `team/kwanhyeak0304` | 팀원 개인 작업 브랜치 |
| `team/skngyj` | 팀원 개인 작업 브랜치 |
| `team/sooyeon0o0` | 팀원 개인 작업 브랜치 |
| `team/soyoung1218` | 팀원 개인 작업 브랜치 |

팀원은 자기 브랜치에서 작업하고, GitHub에서 `dev`를 대상으로 Pull Request를 만듭니다. `master`와 `dev`에는 직접 push하지 않습니다.

처음 자기 브랜치를 받을 때:

```bash
git fetch origin
git switch -c team/본인아이디 --track origin/team/본인아이디
```

작업 전 최신 `dev`를 반영할 때:

```bash
git fetch origin
git merge origin/dev
```

작업 저장 후 GitHub에 올릴 때:

```bash
git status
git add .
git commit -m "feat: 작업 내용 요약"
git push origin team/본인아이디
```

그다음 GitHub에서 Pull Request를 만듭니다.

- base: `dev`
- compare: `team/본인아이디`
- PM이 변경사항을 확인한 뒤 merge

## macOS 개발환경 세팅

Mac은 iOS Simulator와 Android Emulator를 둘 다 사용할 수 있습니다.

### 1. 필수 설치

1. Git
2. Node.js LTS
3. npm
4. Visual Studio Code 또는 원하는 코드 에디터
5. Expo Go 앱, 실제 폰 테스트용

설치 확인:

```bash
git --version
node -v
npm -v
```

### 2. iOS Simulator 세팅

iOS Simulator는 macOS에서만 사용할 수 있습니다.

1. App Store에서 Xcode 설치
2. Xcode를 한 번 실행해서 추가 구성요소 설치
3. Xcode Settings에서 iOS Simulator 설치 확인
4. 터미널에서 프로젝트 실행

```bash
npx expo start
```

터미널에서 `i`를 누르면 iOS Simulator로 앱이 열립니다.

### 3. Android Emulator 세팅

1. Android Studio 설치
2. Android SDK 설치
3. Android Emulator 설치
4. Android Virtual Device 생성, 예: Pixel 계열
5. 환경변수 추가

zsh 기준:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$ANDROID_HOME/platform-tools:$PATH
```

위 설정은 `~/.zshrc`에 넣어두면 터미널을 다시 열어도 유지됩니다.

확인:

```bash
adb devices
```

실행:

```bash
npx expo start
```

터미널에서 `a`를 누르면 Android Emulator로 앱이 열립니다.

### 4. 실제 iPhone/Android 폰으로 실행

1. 폰에 Expo Go 설치
2. 컴퓨터와 폰을 같은 Wi-Fi 또는 같은 핫스팟에 연결
3. 프로젝트에서 실행

```bash
npx expo start
```

4. 터미널 또는 브라우저에 뜨는 QR 코드를 Expo Go로 스캔

폰에서 연결이 안 될 때:

```bash
npx expo start --tunnel
```

터널 모드는 네트워크가 복잡할 때 도움되지만, 일반 LAN 연결보다 느릴 수 있습니다.

## Windows 개발환경 세팅

Windows는 Android Emulator와 실제 폰 테스트를 중심으로 개발합니다. iOS Simulator는 Windows에서 사용할 수 없습니다. iPhone 테스트는 Expo Go로 QR을 스캔해서 실제 기기에서 확인합니다.

### 1. 필수 설치

1. Git for Windows
2. Node.js LTS
3. npm
4. Visual Studio Code 또는 원하는 코드 에디터
5. Android Studio
6. Expo Go 앱, 실제 폰 테스트용

PowerShell에서 확인:

```powershell
git --version
node -v
npm -v
```

### 2. 프로젝트 실행

```powershell
git clone https://github.com/konga22/PopupMate.git
cd PopupMate
npm ci
npm run typecheck
npx expo start
```

Android Emulator로 실행하려면 터미널에서 `a`를 누릅니다.

실제 폰으로 실행하려면 Expo Go에서 QR 코드를 스캔합니다.

### 3. Android Emulator 세팅

1. Android Studio 실행
2. SDK Manager에서 Android SDK 설치
3. Device Manager에서 Android Virtual Device 생성
4. Windows 환경 변수 설정

권장 환경 변수:

```powershell
ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
```

Path에 아래 값을 추가합니다.

```powershell
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

확인:

```powershell
adb devices
```

### 4. Windows에서 자주 나는 문제

PowerShell에서 명령이 막히면 새 PowerShell을 관리자 권한으로 열고 실행 정책을 확인합니다.

```powershell
Get-ExecutionPolicy
```

폰에서 QR 연결이 안 되면 컴퓨터와 폰이 같은 네트워크에 있는지 확인합니다. 회사, 학교, 카페 Wi-Fi에서는 기기 간 연결이 막혀 있을 수 있으므로 핫스팟 또는 터널 모드를 사용합니다.

```powershell
npx expo start --tunnel
```

## 공통 개발 규칙

작업 전:

```bash
git status
git fetch origin
```

작업 후:

```bash
npm run typecheck
git status
```

커밋 메시지는 아래처럼 짧고 명확하게 씁니다.

```bash
git commit -m "feat: 홈 화면 새로고침 추가"
git commit -m "fix: 하단 네비 위치 조정"
git commit -m "docs: 개발환경 가이드 추가"
```

## Docker를 써야 하나?

현재 결론: 지금 Expo 프론트엔드 개발에는 Docker를 필수로 쓰지 않습니다.

Docker는 컴퓨터 안에 격리된 실행 환경을 만들어주는 도구입니다. 팀원 컴퓨터마다 Node, DB, 서버 버전이 달라서 문제가 생길 때 Docker로 환경을 맞춥니다.

기본 용어:

| 용어 | 뜻 |
| --- | --- |
| Image | 실행 환경을 찍어둔 템플릿 |
| Container | Image로 실제 실행한 프로세스 |
| Dockerfile | Image를 만드는 설명서 |
| Compose | 여러 컨테이너를 한 번에 실행하는 설정 |
| Volume | 컨테이너가 꺼져도 데이터를 유지하는 저장소 |

### 지금 Docker를 필수로 쓰지 않는 이유

1. iOS Simulator는 macOS의 Xcode에 묶여 있어서 Docker 안에서 일반적으로 실행하지 않습니다.
2. Android Emulator도 Docker보다 로컬 Android Studio에서 돌리는 쪽이 쉽고 안정적입니다.
3. Expo 개발 서버는 실제 폰과 같은 네트워크에서 연결되는 흐름이라 Docker 네트워크 설정이 오히려 복잡해질 수 있습니다.
4. 현재 프로젝트는 프론트엔드 중심이고, 서버와 DB가 아직 없습니다.

그래서 지금은 각자 로컬에 Node.js, Expo, Xcode 또는 Android Studio를 설치해서 개발하는 방식이 가장 단순합니다.

## Docker를 적용한다면 언제?

백엔드를 직접 만들 때 Docker가 유용해집니다.

### Firebase를 선택하는 경우

Firebase를 쓰면 초반에는 Docker가 거의 필요 없습니다.

추천 구성:

| 기능 | Firebase 서비스 |
| --- | --- |
| 로그인 | Firebase Authentication |
| 팝업/저장/커뮤니티 데이터 | Cloud Firestore |
| 이미지 업로드 | Cloud Storage |
| 서버에서만 처리할 작업 | Cloud Functions |
| 알림 | FCM 또는 Expo Push Notifications |

Firebase 방식에서는 팀원이 앱을 실행할 때 Docker 대신 Firebase 프로젝트 설정값을 맞추면 됩니다. 로컬 테스트가 필요해지면 Firebase Emulator Suite를 검토합니다.

### 직접 백엔드를 만드는 경우

예를 들어 `NestJS + PostgreSQL` 또는 `Express + PostgreSQL`로 서버를 만들면 Docker를 쓰는 편이 좋습니다.

그때는 프로젝트를 아래처럼 나눌 수 있습니다.

```text
PopupMate/
├── app/
├── src/
├── backend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
└── compose.yaml
```

예시 `compose.yaml`:

```yaml
services:
  db:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: popupmate
      POSTGRES_PASSWORD: popupmate
      POSTGRES_DB: popupmate
    volumes:
      - popupmate_db:/var/lib/postgresql/data

volumes:
  popupmate_db:
```

이 예시는 지금 바로 필요한 파일은 아닙니다. 백엔드를 직접 만들기로 결정했을 때 추가합니다.

## 추천 운영 방향

1. 지금은 Expo 앱 개발환경을 로컬로 통일합니다.
2. 백엔드는 MVP 속도를 위해 Firebase를 우선 검토합니다.
3. 데이터 구조가 복잡해지고 SQL이 필요해지면 Supabase 또는 직접 백엔드를 검토합니다.
4. 직접 백엔드를 만들 때 Docker Compose를 추가합니다.

## 참고 문서

- Expo 시작 가이드: https://docs.expo.dev/get-started/start-developing/
- Expo Go: https://docs.expo.dev/get-started/expo-go/
- Expo development build: https://docs.expo.dev/develop/development-builds/introduction/
- Android Studio: https://developer.android.com/studio
- Docker 개요: https://docs.docker.com/get-started/docker-overview/
- Docker Compose: https://docs.docker.com/compose/
