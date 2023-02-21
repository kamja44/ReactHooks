# useInput

- input을 업데이트하는 기능

```js
import React, { useState } from "react";
import { ReactDOM } from "react";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const App = () => {
  const maxLen = (value) => value.length < 10;
  const name = useInput("Mr.", maxLen);
  return (
    <div>
      <h1>Hello</h1>
      <input placeholder="Name" {...name} />
    </div>
  );
};

export default App;
```

1. name 상수에 useInput 훅 전달

- 첫번째 arguement는 useState의 기본값
- 두 번째 arguement는 검증조건

2. useState(initialValue) <- 초기값 받음
3. onChange 함수 생성

- const{taret:{value}} = event를 이용하여 input의 value 받아옴
- willUpdate <- 업데이트 여부(true면 업데이트)
  - validator의 타입(검증조건의 타입이) 함수라면 validator(value)를 willUpdate에 전달하여 업데이트 여부를 확인한다.
    - input의 value의 길이가 10이하면 업데이트
  - willUpdate가 true이면 setValue(value)를 이용하여 value 업데이트

4. useInput 훅은 value와 onChange 이벤트를 반환한다.
5. App의 input에 {...name}을 사용하여 value와 onChange를 value에 적용한다.
   - {...name}은 배열 리터럴의 요소를 밖으로 꺼낸다.
