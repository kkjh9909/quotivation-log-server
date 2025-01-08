# <img width="50" alt="quotivation_logo (1)" src="https://github.com/user-attachments/assets/d6327e1e-b277-4313-9152-16fad4be916d"> Quotivation
 
Log 저장 MongoDB 서비스  

[https://quotivation.kr](https://quotivation.kr) 사이트 주소  
[https://api.quotivation.kr/api/quote](https://api.quotivation.kr/api/quote) API 함수 주소  
[https://github.com/kkjh9909/quotivation](https://github.com/kkjh9909/quotivation) Quotivation 프로젝트  

## 🛠️ 프로젝트 스택

- Node.js 18.1.0
- Apollo Server Express
- MongoDB Atlas

## 🚀 설치 및 실행 방법

### 1. 사전 요구사항
* Node.js 16.x 버전 이상
* MongoDB 설치 or MongoDB Atlas
* Docker 설치(선택사항)

### 2. 레포지토리 클론
```bash
git clone https://github.com/kkjh9909/quotivation-log-server.git
cd quotivation-log-server
```

### 3. 환경 설정
* .env 파일의 MongoDB 연결 URI 수정:
```bash
MONGO_URI={MONGO_SERVER_URL}
```

### 4. 빌드 및 실행
* 로컬 환경에서 실행:
```javascript
node server.js
```

* Docker를 사용한 배포:
```bash
docker-compose up -d 
```

### 5. 접속
* 브라우저에서 http://localhost:4000/graphql로 접속.

## 🌟 주요 기능
* MongoDB에 로그 저장 및 불러오기
* IP, Error, time 별 검색 기능
* uri별 검색 기능
* GraphQL을 통한 원하는 정보만 검색 가능

## 📂 파일 구조도
```bash
quotivation-log-server
├── graphql
│     ├─ resolvers
│     │       ├─mutationResolvers.js
│     │       ├─queryResolvers.js
│     │       └─index.js
│     ├─ types
│     │       ├─logTypeDefs.js
│     │       ├─mutationTypeDefs.js
│     │       ├─queryTypeDefs.js
│     │       └─index.js
│     └── index.js
├── models
├── .env
└── server.js
```

## 📄 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](https://github.com/kkjh9909/quotivation-log-server/blob/main/LICENSE) 파일을 참조하세요.