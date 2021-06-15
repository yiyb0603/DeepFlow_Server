## DeepFlow_Server (개인 프로젝트)

## 프로젝트 개발 동기

대구소프트웨어고등학교 학생들은 **자신이 공부를 하다가 잘 모르는 정보 혹은 제대로 알고 싶은 전공 지식이 있다면 검색을 통해서 알아보거나 혹은 오프라인이나 메신저를 이용하여 친구 또는 선배들에게 물어보고 정보를 얻을 수 있습니다.**

하지만 자주 물어보러 다니는 것이 **번거롭거나 상황이 애매하여 질문하기 어려울 때** 등, 이를 간편하게 온라인화하여 웹 서비스를 제공하기로 했습니다.

## Language, Technologies

<table>
  <tr>
    <th>Platform</th>
    <th>Web</th>
    <th>Server</th>
  </tr>
  <tr>
    <th>Name</td>
    <th>권용빈</th>
    <th>권용빈</th>
  </tr>
  <tr>
    <th>Language</th>
    <th>TypeScript</th>
    <th>TypeScript</th>
  </tr>
  <tr>
    <th>Framework, Library</th>
    <th>React.js, Recoil, Scss, FCM Notification</th>
    <th>Nest.js, TypeORM, PostgreSQL, FCM Notification</th>
  </tr>
  <tr>
    <th>Develop Tools</th>
    <th>Visual Studio Code</th>
    <th>Visual Studio Code, pgAdmin5</th>
  </tr>
</table>

## 기능명세서

https://vo.la/RLtk1

## 기능 소개

### 1. 로그인, 회원가입 페이지

- 회원가입 과정에서 Github OAuth를 이용한 회원가입을 진행합니다.
- 추가적인 사항은 직접 입력 받습니다.

![회원가입](https://user-images.githubusercontent.com/50941453/121973508-63faf600-cdb8-11eb-990c-f6a36189780c.PNG)

### 2. 메인 페이지

- 최근에 올라온 질문 글들을 조회 할 수 있습니다.
- 최근에 가입한 유저 목록을 조회 할 수 있습니다.
- 오른쪽 사이드바에는 인기 질문글, 유저를 조회 할 수 있습니다.

![홈 화면](https://user-images.githubusercontent.com/50941453/121973425-28602c00-cdb8-11eb-97fd-612dbdde3810.PNG)

### 3. 글 목록 조회 페이지

- 유저들이 올렸던 전체 질문 글을 조회할 수 있습니다.
- **최신순 / 인기순** 카테고리에 따라 볼 수 있습니다.
- **그리드 / 리스트** 뷰 보기를 제공합니다.

![글 목록 조회](https://user-images.githubusercontent.com/50941453/121974242-f18b1580-cdb9-11eb-99fb-635e0254e10c.PNG)

### 4. 글 페이지, 댓글 / 답글

- 마크다운 렌더링을 이용하여 글을 보여줍니다.
- 좋아요를 눌러 공감할 수 있습니다.

![글 조회](https://user-images.githubusercontent.com/50941453/121973941-4ed29700-cdb9-11eb-80f7-7b1d63d10208.PNG)

![글 조회2](https://user-images.githubusercontent.com/50941453/121974357-272ffe80-cdba-11eb-8ddf-b7a7ac8c43cf.PNG)

- 댓글, 답글을 추가 / 수정 / 삭제를 할 수 있습니다.
- 코드에 관한 질문들을 예상하여 댓글, 답글도 **마크다운 작성 및 프리뷰**를 제공하였습니다.
- <a href="https://github.com/facebook/react/issues/21500" target="_blank">Github Issue</a>의 기능을 참고하여 댓글에 **이모지 공감**을 달수 있도록 했습니다.

![댓글, 답글](https://user-images.githubusercontent.com/50941453/121973943-5134f100-cdb9-11eb-95a8-b4ec6af72742.PNG)

### 5. 글 작성 페이지

- **마크다운 문법**을 이용하여 작성하고, **프리뷰** 기능을 제공합니다.
- 글과 관련된 **태그**를 자유롭게 추가할 수 있습니다.

![글 작성](https://user-images.githubusercontent.com/50941453/121974024-7e819f00-cdb9-11eb-9dbf-b42c9a7978fd.PNG)

- **소개글과 썸네일**을 설정할 수 있습니다.

![글 작성 모달](https://user-images.githubusercontent.com/50941453/121974022-7de90880-cdb9-11eb-90e9-43ddcd79ff8e.PNG)

### 6. 글 검색 페이지

- 키워드를 검색하여 질문글을 검색 할 수 있습니다.
- 검색내역을 제공합니다.

![글 검색](https://user-images.githubusercontent.com/50941453/121974109-ab35b680-cdb9-11eb-9d62-5863827d24c4.PNG)

### 7. 유저 목록 페이지

- 가입된 유저 목록을 조회합니다.
- 학교 기수별 / 인기순으로 정렬해서 볼 수 있습니다.
- 유저 이름을 검색하여 조회 할 수 있습니다.

![유저 목록](https://user-images.githubusercontent.com/50941453/121974400-3f078280-cdba-11eb-8d21-a1cf674171b5.PNG)

### 8. 유저 페이지

- 유저의 정보를 가져옵니다.
- 유저가 작성한 글 / 댓글을 작성한 글을 선택하여 볼 수 있습니다.

![유저 조회](https://user-images.githubusercontent.com/50941453/121974165-cd2f3900-cdb9-11eb-8d08-6463faaa7b14.PNG)

- 자신이 정보를 수정하고 싶다면 수정할 수 있습니다.

![유저 수정](https://user-images.githubusercontent.com/50941453/121974163-cbfe0c00-cdb9-11eb-8512-71a7a0594599.PNG)

### 9. 유저 추천 페이지

- 만약 해당 유저가 자신에게 많은 도움이 되었다면 추천 사유를 자유롭게 작성하여 유저를 추천 할 수 있습니다.

![추천](https://user-images.githubusercontent.com/50941453/121974205-e2a46300-cdb9-11eb-92de-ac30ce1e131c.PNG)

### 10. 태그 목록, 조회 페이지

- 유저들이 질문을 작성할 때 같이 썼던 태그 목록을 조회할 수 있습니다.
- 태그 이름, 설명, 사용된 질문의 개수를 보여줍니다.
- 인기순 / 이름순으로 조회 할 수 있습니다.

![태그 목록](https://user-images.githubusercontent.com/50941453/121974297-0ebfe400-cdba-11eb-9806-8e0bb5530215.PNG)

- 태그의 정보, 그리고 태그가 사용된 질문글들을 조회 할 수 있습니다.

![태그 글 목록](https://user-images.githubusercontent.com/50941453/121974300-0f587a80-cdba-11eb-9d09-9e4a2c68ebd8.PNG)

### 11. 공지사항 페이지

- 관리자가 작성한 공지사항 목록들을 조회 할 수 있습니다.
- 작성 과정또한 **마크다운 문법**을 이용하여 작성합니다.

![공지사항](https://user-images.githubusercontent.com/50941453/121974427-4d559e80-cdba-11eb-962e-952add947e5e.PNG)

## 더 많은 정보

https://yiyb0603.github.io/my_portfolio/projects

## 프로젝트 개발 기록

### 1주차 ~ 4주차 진행 및 느낀점

https://velog.io/@yiyb0603/DeepFlow-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-1%EC%A3%BC%EC%B0%A8-4%EC%A3%BC%EC%B0%A8

### 5주차 ~ 8주차 진행 및 느낀점

https://velog.io/@yiyb0603/DeepFlow-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-5%EC%A3%BC%EC%B0%A8-8%EC%A3%BC%EC%B0%A8

### 9주차 ~ 12주차 진행 및 느낀점

https://velog.io/@yiyb0603/DeepFlow-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-9%EC%A3%BC%EC%B0%A8-12%EC%A3%BC%EC%B0%A8
