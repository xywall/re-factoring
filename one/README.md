# 리팩터링 2판
###### 저: 마틴 파울러
[리팩터링2판_전자책](https://books.google.co.kr/books/about/%EB%A6%AC%ED%8C%A9%ED%84%B0%EB%A7%81_2%ED%8C%90.html?id=2EHoDwAAQBAJ&printsec=frontcover&source=kp_read_button&redir_esc=y#v=onepage&q&f=false)

### 01 리팩터링 : 첫번째 예시

##### 1-1
###### 코드를 작성,수정할 땐 먼저 프로그램의 작동 방식을 생각하자

##### 1-2
###### 수백줄짜리 코드를 수정할 땐, 작동방식을 쉽게 파악할 수 있도록 코드를 여러 함수와 프로그램 요소로 재구성한다.
- 프로그램이 새로운 기능을 추가하기에 편한 구조가 아니라면, 먼저 기능을 추가하기 쉬운 형태로 리팩터링하고 나서 원하는 기능을 추가한다.

##### 1-3
###### 리팩터링의 첫 단계는 항상 똑같다.
######  - 성공/실패 자가진단이 가능한 **테스트 코드** 마련 : 
- 몇 가지 테스팅 용 코드를 단축키 하나로 실행할 수 있도록 >> 해당 코드가 버그 검출기 역할을 해준다. ( 디버깅 시간 단축 )

##### 1-4 함수 쪼개기 : 
- 코드를 분석해서 얻은 정보를 토대로 코드 조각을 별도 함수로 추출한다. ( 추출한 함수에는 코드가 하는 일을 설명하는 이름을 지어준다. )
###### 별도 함수로 빼냈을 때 새 함수에서 곧바로 사용할 수 없는 변수가 있는지 확인한다.
- 값을 변경할 필요가 없는 변수는 매개변수로 전달하면 된다.
- 함수 안에서 값이 바뀌는 변수를 유의하자.

###### **리팩터링 후에는 항상 테스트**를 하는 습관이 중요하다.
###### 리팩터링은 프로그램 수정을 **작은 단계**로 나눠 진행한다. 그래서 중간에 실수하더라도 버그를 쉽게 찾을 수 있다.
###### 해당 변경사항을 **로컬 버전관리시스템에 커밋**한다. 
- ( 혹시 모를 롤백 위해 )

##### 변수명을 타입 또는 역할이 드러나게  바꾸기
###### 리턴값을 담을 변수는 result로 하면 보다 직관적으로 이해할 수 있다.
###### 매개변수에 접두어로 타입이름을 적는걸 추천한다.
- 역할이 뚜렷하지 않을 때는 부정 관사(a/an)을 붙여보자.

##### 불필요한 변수 제거하기
###### 지역변수를 제거해서 얻는 가장 큰 장점은 추출 작업이 훨씬 쉬워진다는 것이다.


> /* 각 단계마다 컴파일-테스트-커밋은 필수 ! */
>>// 01. 함수 쪼개기
>>// 02. 문장 슬라이드 하기 ( 변수 선언 을 반복문 또는 함수 바로 앞으로 배치 )
>>// 03. 임시변수를 함수로 추출하기 
>>// 04. 변수 인라인