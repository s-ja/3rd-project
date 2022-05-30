# 3rd-project
한울직업전문학교 스마트 ux/ui 디자인 세번째 프로젝트
- https://www.figma.com/file/ucMSEFRsezxEDvZ17ZCnuZ/Untitled?node-id=0%3A1

# 계획 수립
- 1st day : 주제선정 및 리서치/git setting 및 토의
- 2nd day : ui 설계 1원칙 설립, 디자인 테마 설정, 사용성(목적성) 재정의
- 3rd day : 디자인 스케치 완성, 부가기능들 추가(컬러테마설정기능), 페르소나/무드보드/디자인가이드 착수

# to do
- ~~주제 선정 및 리서치~~
- ~~데이터 수집 및 스케치~~
- ~~데이터 시각화(페르소나, 무드보드, 디자인 가이드)~~
- 디자인 설계와 제작, 응용 (디자인 시안, 스토리보드 작성) - 시안작업 생략, 스토리보드 구조는 커스텀
- 시안디자인 개발 심화(다른 컨셉의 디자인 시안 하나 더 작성) - 테마선택기능이 있으므로 생략
- 제작 및 구현(sass, 반응형 필수)(그누보드 및 호스팅은 선택) - 1페이지 구조, 구조및 역할분할을 어떻게 할 것인가?
- 결과 발표
- 수정보완(피드백을 통한 발전) - 서식제공 예정
- 완료보고 - 서식제공 예정
- 사후관리(서비스 배포 이후 as) - 서식 제공 예정

# 1st day
- 주제선정 : time timer 에서 착안한 to do list 결합형 알림 시스템
- referece search : https://www.todomate.net / https://todoist.com / https://vclock.kr/timer / https://pomofocus.io / https://time-timer.netlify.app / https://store.steampowered.com/app/1369320/Virtual_Cottage/ / https://rainymood.com/
- 기능 구체화 : 넣을 기능들 전부 나열 및 구성
- 구글 파이어베이스 활용 알아볼것.(https://firebase.google.com/?hl=ko)
- 채팅어플리케이션 기능 활용 방법중 하나 (https://socket.io)
-serviec name : checky

# 2nd day
- ui 인터페이스 1원칙 : 원형 타임타이머 인터페이스 화면 중앙 배치, 가리지 않는다
- 라이트모드, 다크모드 컬러칩 설정
- 서비스 심볼 로고 생성
- 메인폰트 설정
- 사용성(목적성, 사용환경, 사용상황) 재정의 및 구체화
- ->우선 인터페이스 뼈대부터 디자인, 이후 세부 기능을 어떻게 넣고 구현할 수 있을 것인지 고민할것.

# 3rd day
- 인터페이스 구성 방향 설정, 디자인 완성 목표(프로토타이핑 포함)
- 디자인 의도와는 다른 암시성 제거를 위한 컬러웨이 수정 / 타이머 재생,멈춤 버튼 추가 / 라이트,다크 토글 추가 / 테마버튼 추가
- 사용성 개선안 기록
- 추가할 부가기능 : 컬러테마 선택기능 추가 / 랜딩페이지에 시간에 관한 문구가 접속때마다 다른 것이 뜨게끔 설정(?)

# 4th day
- 평가 요소 중 기획 -> 아이디어 추출, 시장조사, 산업체 수요조사(마인드맵, 팀원과의 논의 사항) = 시각화 필요성, 그래픽 작업 기간 연장 필요
- 3일차 디자인 무드보드 이어서 완성, 기획된 페르소나 그래픽 작업, 할일 리스트 추가 사용법에 문제점 수정 필요
- 스토리 보드 작업, 사이트 맵, 자료구조
- 4일차 참고 사항및 메모 링크 : https://docs.google.com/document/d/1GoX1a0fpFOMm8_wSkHqsJh3VS0INFETxRWQOC6xp_gw/edit?usp=sharing

# 5th day
- 가장 기본은 입력과 출력
- 페르소나 작업 완료 후 스토리보드 구성 시작 / 모바일 페이지 추가작업 없을시 그래픽 작업은 이것으로 마무리 예상
- 기본구조 구현 작업 시작 참고 : https://www.jqueryscript.net/time-clock/SVG-Based-Circular-Timer-Plugin-For-jQuery-Circle-Timer.html
- ajax 활용 로컬스토리지에 할 일 목록 저장 및 삭제
- 로컬스토리지와 인덱스드 db
- 새로고침시에도 유지되어야 하는가?

# 6th day(22/05/30)
- 주말 작업 예정이었던 스토리보드 완성
- 스토리 보드 작업중 색깔 테마 선택 화면 디자인 안된 부분 발견 / 추가로 테마에 따른 라이트/다크 컬러웨이 구분 생각 못했음 -> 라이트/다크 전환 버튼을 없애고 그 기능을 테마선택 기능에 합침
- 컬러웨이에 따른 색깔 함수를 main_back/main_timer/fint_main/font_point/sub_point로 나눔
-

- 구현 단계 설정 : UI구현(입력과 UI에서의 반영) -> 브라우저 저장소(cookie, localStorage, indexedDB) 중간 경유 구현 / 새로고침해도 유지되게끔 -> 테마 선택기능과 스트리밍 기능 추가
- streaming : 유튜브 플레이리스트, 사운드클라우드 플레이리스트 등등 자체 음원 내포보다 좋은 방법으로 예상
- 자료구조가 크지 않으므로 AJAX비동기 기능 활용까지는 갈 필요가 없을것
- https://developer.mozilla.org/ko/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API (localStroage 사용법)
- Todo Timer - CodePen : https://codepen.io/BltzLcht/pen/gMBGBB