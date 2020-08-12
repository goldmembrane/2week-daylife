# SUL-server

[![npm Badge](https://img.shields.io/badge/npm-6.14.6-orange)](https://docs.npmjs.com/cli/version)
[![react-native Badge](https://img.shields.io/badge/react--native-0.63.1-blue)](https://reactnative.dev/versions)
[![react-navigation Badge](https://img.shields.io/badge/react--navigation-5.7.1-blueviolet)](https://reactnavigation.org/docs/getting-started)
[![redux Badge](https://img.shields.io/badge/redux-4.0.5-brightgreen)](https://github.com/reduxjs/redux)
<br/>
자신의 소송이 기각 될 확률을 구하는 웹 애플리케이션 서버 사이드입니다

# 💡소개<br />
세상을 살아가다 보면 다양한 상황과 문제에 부딪치게 되고, 그 문제를 해결하기 위해 여러가지 방법을 사용합니다.<br />
그 방법 중 하나로 소송을 제기해 문제를 해결하려고 하지만, 판단할 이유가 없다는 소위 '기각' 판정을 받으면, 결과적으로 소송을 준비하기 위한 시간과 재화를 낭비하게 되는 것입니다.<br />
저희 팀 AAA가 만든 SUL(Support Your Lawsuit)은 키워드를 통해 판례를 검색한 다음, 전체 판례 중에 얼마나 기각됬는지 분석하는 앱입니다.<br />
자신의 상황을 키워드로 입력하여 검색하면, 이 전의 비슷한 상황에서 얼마나 기각됬는지 비율을 계산해서 보여주는 서비스입니다.<br />

# 서비스 내용
### 로그인
1. 로그인, 회원가입(유효성 검사)
### 홈
1. 하단 탭 아이콘 화면이동
### 검색
1. 판례검색
2. 승인,기각 필터링: 판결문 제목 리스트
3. 판결문 조회: law.go.kr
4. 분석하기: 판결 확률 원그래프
### 지도
1. 주변 법률 사무소
2. 위치 확인
3. 위치 이동
### 마이페이지
1. 유저 정보 확인
2. 유저 정보 수정
3. 유저 검색 기록 확인
4. 로그아웃

# Flow Chart
<details>
<summary>UI 기능 플로우 펼쳐보기</summary>
<img width="551" alt="work" src="https://user-images.githubusercontent.com/53177533/89711843-caa8c980-d9c7-11ea-86eb-dc965e54abab.png">
</details>
<details>
<summary>Front-end Flow</summary>
<img width="551" alt="work" src="https://user-images.githubusercontent.com/53177533/89712046-3fc8ce80-d9c9-11ea-9f66-3ce52e355482.png">
</details>
<details>
<summary>Back-end Flow</summary>
<img width="551" alt="server" src="https://user-images.githubusercontent.com/49430407/89738949-a0ced000-dab7-11ea-85ed-ab82697b3c24.png">
</details>

# Server
## ⭐ API 문서
하단의 하이퍼링크를 클릭하시면 API 문서로 연결됩니다.<br />
 <a href ="https://app.gitbook.com/@sul/s/sul/">📝 SUL-server API 문서</a><br />
# Client
## ⭐ 기능<br />
홈 화면<br />
로그인, 회원가입<br />
판례 검색 및 조회<br />
지도 기능<br />
회원 정보 조회, 수정<br />
## 📚 주요 Library<br />
-Client <br />
React<br />
React-native<br />
React-navigation<br />
React-Hooks<br />
Redux<br />
React-native-maps<br />
React-native-cheerio<br />

-Server <br />
express <br />
axios <br />
jsonwebtoken <br />
mysql <br />
sequelize-cli <br />
crypto <br />
xml-js <br />
cheerio <br />
# :evergreen_tree: 팀 구성
## 팀장
#### 황병현
## 팀원
#### 김준섭, 조규창

# :people_holding_hands: Position
### 황병현 : full-stack <br />
📧 : extinctictworld@gmail.com
### 김준섭 : full-stack <br />
📧 : wnstjq616@gmail.com
### 조규창 : front-end <br />
📧 : codingc1@gmail.com
