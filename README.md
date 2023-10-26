# NestJS API Learn

영화 정보 데이터 API

### 기능

- 영화 정보 검색, 추가, 삭제, 수정 API.
- *SRP(Single-Responsibility Principle)을 따라 기능을 구현한다.
  <br>(*하나의 모듈, 클래스, 함수는 하나의 기능은 꼭 책임져야한다.)

### 기술 스택

Typescript
NestJS

- mapped-types: 부분 타입(PartialType)을 위해 사용. DTO를 변환시키는 것을 돕는다.
  <br>(DTO: 쿼리에 대해 유효성을 검사할 수 있게 해준다. + 코드를 간결하게 만들어준다.)

- validation pipe - 라우터 또는 컨트롤러에 도달하기 전에 요청 JSON Body를 클래스의 인스턴스로 변환 후 검증할 수 있다.

  - class transformer(Library): typescript
  - class Validator(Library):

Jest: 테스팅 프레임워크.
