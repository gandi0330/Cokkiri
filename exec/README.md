# 포팅 메뉴얼

## 1. 프로젝트 개요

코로나로 비대면 서비스의 필요성이 대두되었고, 이러한 흐름은 개발자도 피해 갈 수 없었습니다.
스터디 플랫폼도 많고 화상 채팅 프로그램도 많은데 왜 이러한 프로그램을 만드는 개발자들을 위한 화상 플랫폼은 없는지 한 번쯤 생각해 보지 않았나요?
없다면 직접 있었으면 하는 기능을 모아 만드는 게 바로 개발자 덕목이죠! 코끼리는 개발자로서 여러 화상 프로그램을 이용하며 느낀 필요한 기능을 넣고 불편한 점은 뺐답니다!

코끼리와 함께라면 개발자끼리 함께 모여 즐겁게 코딩을 할 수 있습니다!


## 2. 도구 및 개발환경

이슈 관리 : JIRA
형상 관리 : Gitlab
커뮤니케이션 : Notion, Mattermost
디자인 : Figma
UCC : 모바비

| 설치 목록    | version   |
| ------------ | --------- |
| Ubuntu       | 20.04 LTS |
| Docker       | 20.10.14  |
| Nginx        | 1.18.0    |
| Java openjdk | 11.0.15   |
| SpringBoot   | 2.6.6     |
| MySQL        | 8.0.29    |
| IntelliJ     | 11.0.16   |
| gradle       | 7.4.1     |
| JVM          | 16.0.1 (스프링은 11로 빌드) |
| React        | 18.2.0    |
| Node.js      | 16.16.0   |
| VS Code      | 1.70.0    |
|              |           |

## 3. 빌드 및 배포

### 빌드 및 배포 과정

#### 프론트엔드

깃 클론

```
git clone https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107.git
```

폴더 이동

```
cd frontend
```

빌드

```
npm install
```

실행

```
npm start
```


#### 백엔드

깃 클론

```
git clone https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107.git
```


Nginx 설정

```
```


### Port 및 DB 정보

- SpringBoot 기본 포트
  - 8080
- React 기본 포트
  - 3000
- MySQL 데이터베이스명
  - ssapilogue
- MySQL 계정이름
  - ssapilogue
- MongoDB 데이터베이스명
  - ssapilogue

- MongoDB 계정이름
  - ssapilogue


## 4. DB 덤프 파일

 [덤프파일]() 



## 5. 시연 시나리오

![메인페이지](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107/uploads/6b71cf37c9df856ba4cf8428e55a8e41/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80.gif)

메인페이지에는 핵심 기능 소개를 볼 수 있습니다.


![로그인](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107/uploads/1c1d105ecbd03ae6abb82d756dd4054a/%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif)


![공부기록](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107/uploads/9afdc28e31144fe5e5d95517c156ac7e/%EA%B3%B5%EB%B6%80%EA%B8%B0%EB%A1%9D_%ED%8E%98%EC%9D%B4%EC%A7%80.gif)

공부기록 페이지에서 오늘 공부한 시간, 주간 공부 시간, 누적 공부 시간을 확인할 수 있습니다.


![스터디룸 목록](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107/uploads/5ed2baa2bc984a6dbcd8391e90f4df56/%EC%8A%A4%ED%84%B0%EB%94%94%EB%A3%B8_%EB%AA%A9%EB%A1%9D_%ED%8E%98%EC%9D%B4%EC%A7%80.gif)

생성된 스터디룸들을 확인할 수 있다. (무한 스크롤 가능)
검색 바에 검색어를 입력해서 일치하는 스터디룸을 확인할 수 있다.
방만들기 버튼을 누르고 방 정보를 입력해서 스터디룸을 생성하고 입장할 수 있다.


![즐겨찾기](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107/uploads/72cd08aee7d535d951f202e71647cbac/%EC%A6%90%EA%B2%A8%EC%B0%BE%EA%B8%B0.gif)

최근 방문했던 스터디룸을 확인할 수 있고 토글해서 즐겨찾기에 저장 및 삭제할 수 있다.


![방 입장](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107/uploads/a4ae542c153d8a12f464f4c9116c2453/%EB%B0%A9_%EC%9E%85%EC%9E%A5.gif)

특정 스터디룸을 클릭해서 그 스터디룸에 입장할 수 있다.


![화면공유](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107/uploads/cc7534caac490e44dff15a79622ca587/%ED%99%94%EB%A9%B4%EA%B3%B5%EC%9C%A0_%EB%94%B0%EB%B4%89.gif)

화면 공유 버튼을 눌러 원하는 공유 화면을 클릭할 수 있다.


![사이렌](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107/uploads/8c16d10d7a343ecf71660bfcc644322b/%EC%82%AC%EC%9D%B4%EB%A0%8C.gif)

특정 상대방에게 사이렌 알림을 보낼 수 있다.


![타이머](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107/uploads/9a345b5a136b902efdd2be29c328624f/%ED%83%80%EC%9D%B4%EB%A8%B8.gif)

타이머가 끝나면 스터디룸에 있는 모든 사람에게 완료됐다는 모달창이 뜨고 타이머 종료음이 난다.


![채팅](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107/uploads/bda624131a52f20dd131e551f8902c55/%EC%B1%84%ED%8C%85.gif)

스터디룸 안에 있는 모든 사람들과 채팅을 할 수 있다.


![질문게시판](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107/uploads/87bf6e5b1a81729e25cb86b1339cf766/%EC%A7%88%EB%AC%B8%EA%B2%8C%EC%8B%9C%ED%8C%90.gif)

질문자가 코드리뷰를 위해 코드를 올렸다면, 따로 코드리뷰 버튼을 눌러서 수정해 줄 수 있다.
