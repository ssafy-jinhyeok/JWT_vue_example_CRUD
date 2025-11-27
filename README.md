# JWT Vue CRUD 예제

이 프로젝트는 JWT(JSON Web Token) 인증을 사용하여 CRUD(생성, 읽기, 수정, 삭제) 작업을 구현하는 Vue.js 애플리케이션 데모입니다. 빠른 개발 경험을 위해 Vite를 사용하고, 상태 관리를 위해 Pinia, 라우팅을 위해 Vue Router, API 통신을 위해 Axios를 활용합니다.

## 목차
- [주요 기능](#주요-기능)
- [프로젝트 구조](#프로젝트-구조)
- [설치 방법](#설치-방법)
- [사용 가능한 스크립트](#사용-가능한-스크립트)
- [사용된 기술](#사용된-기술)

## 주요 기능
- 사용자 인증 (회원가입, 로그인)
- 다양한 리소스(예: 제품, 주문, 사용자)에 대한 CRUD 작업
- Vue Router를 사용한 클라이언트 사이드 라우팅
- Pinia를 사용한 상태 관리
- Axios를 사용한 API 통신

## 프로젝트 구조

이 프로젝트는 표준 Vue.js 애플리케이션 구조를 따르며, API 서비스, 스토어 및 뷰를 위한 전용 디렉터리로 구성되어 있습니다.

```
.
├── public/                 # 정적 에셋
├── src/
│   ├── api/                # API 서비스 모듈 (auth, order, product, user)
│   ├── assets/             # 이미지, 스타일 등 정적 에셋 (예: CSS)
│   ├── components/         # 재사용 가능한 Vue 컴포넌트
│   ├── router/             # Vue Router 설정
│   ├── stores/             # Pinia 스토어 (상태 관리) (auth, order, product, user)
│   ├── views/              # 페이지/뷰를 나타내는 Vue 컴포넌트
│   │   ├── LoginView.vue
│   │   ├── OrderCreate.vue
│   │   ├── OrderDetail.vue
│   │   ├── OrderList.vue
│   │   ├── ProductCreate.vue
│   │   ├── ProductDetail.vue
│   │   ├── ProductEdit.vue
│   │   ├── ProductList.vue
│   │   ├── RegisterView.vue
│   │   ├── UserEdit.vue
│   │   └── UserList.vue
│   ├── App.vue             # 메인 애플리케이션 컴포넌트
│   └── main.js             # 애플리케이션 진입점
├── .gitignore              # Git 무시 파일
├── index.html              # 메인 HTML 파일
├── jsconfig.json           # 자바스크립트 언어 서비스 설정
├── package.json            # 프로젝트 의존성 및 스크립트
├── package-lock.json       # 의존성 잠금 파일
├── README.md               # 이 README 파일
├── vite.config.js          # Vite 빌드 설정
└── .vscode/                # VSCode 에디터 설정
```

## 설치 방법

프로젝트를 시작하고 실행하려면 다음 단계를 따르세요:

1.  **리포지토리 클론:**
    ```bash
    git clone https://github.com/ssafy-jinhyeok/JWT_vue_example_CRUD.git
    cd jwt-vue-example-crud
    ```
    (참고: 이 프로젝트의 공식 리포지토리입니다.)

2.  **의존성 설치:**
    ```bash
    npm install
    ```

## 사용 가능한 스크립트

프로젝트 디렉터리에서 다음 스크립트를 실행할 수 있습니다:

### `npm run dev`

개발 모드에서 앱을 실행합니다.
브라우저에서 [http://localhost:5173](http://localhost:5173)을 열어 확인하세요. (포트는 Vite 설정에 따라 다를 수 있습니다)
파일을 수정하면 페이지가 자동으로 새로고침됩니다. 콘솔에서 린트 오류도 확인할 수 있습니다.

### `npm run build`

프로덕션을 위해 앱을 `dist` 폴더에 빌드합니다.
Vue를 프로덕션 모드로 올바르게 번들링하고 최상의 성능을 위해 빌드를 최적화합니다.

### `npm run preview`

프로덕션 미리보기를 위해 `dist` 폴더를 로컬에서 제공합니다.

## 사용된 기술
-   **Vue 3**: 사용자 인터페이스 구축을 위한 반응형 프레임워크.
-   **Vite**: 빠른 개발을 위한 차세대 프론트엔드 도구.
-   **Pinia**: Vue를 위한 직관적이고 타입-세이프하며 모듈식인 상태 관리 라이브러리.
-   **Vue Router 4**: Vue.js를 위한 공식 라우팅 라이브러리.
-   **Axios**: 브라우저와 Node.js를 위한 Promise 기반 HTTP 클라이언트.
-   **JWT (JSON Web Tokens)**: 안전한 인증을 위해 사용됩니다.
