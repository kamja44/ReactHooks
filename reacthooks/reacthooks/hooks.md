1. [useInput](#useinput)
2. [useTab](#usetab)

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

# useTab

- 선택한 section의 content만 보여주는 기능

```js
import React, { useState } from "react";
import ReactDOM from "react-dom";

const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1",
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2",
  },
];
const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
};
const App = () => {
  const { currentItem, changeItem } = useTabs(0, content);
  return (
    <div>
      {content.map((section, index) => (
        <button onClick={() => changeItem(index)}>{section.tab}</button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
};

export default App;
```

1. useTabs 함수에 초기값과 content 할당

```js
const [currentIndex, setCurrentIndex] = useState(initialTab);
```

2. content가 없거나 content가 배열이 아닌경우 함수 종료

```js
if (!allTabs || !Array.isArray(allTabs)) {
  return;
}
```

3. currentItem은 content[currentIndex]할당 , changeItem은 setCurrentIndex 할당
4. map함수를 이용하여 버튼 2개 생성

- 각 버튼에 click이벤트를 할당한다.
  -click 이벤트에 {() => changeItem(index)}를 할당한다.
  - changeItem에는 setCurrentIndex가 할당되어 있는데 setCurrentIndex는 currentIndex를 변경하는 역할을 한다.
    - 즉, 버튼을 누르면 currentIndex가 변경되어 currentItem이 반환하는 content가 달라진다.
      - 달라진 currentItem을 반환한다.

```js
const App = () => {
  const { currentItem, changeItem } = useTabs(0, content);
  return (
    <div>
      {content.map((section, index) => (
        <button onClick={() => changeItem(index)}>{section.tab}</button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
};
```

# useEffect

- componentDidMount(), componentDidUpdate(), componentWillUnmount() 의 역할을 한다.
- useEffect는 2개의 인자를 받는다.
  - 첫 번째 argument는 function으로써의 effect이다.
  - 두 번째 argument는 dependency이다.
    - 두 번째 argument 즉, dependency가 있다면 effect는 deps 리스트에 있는 값일 때만 값이 변하도록 활성화 된다.
    - component가 mount되었을때만 실행하고 나서 어떤 경우에도 실행시키고 싶지 않다면 두 번째 argument에 빈 배열([])을 전달한다.
      - 즉, component가 연결되었을 때 딱 한번만 실행된다.
    - 두 번째 argument에 아무 값도 전달하지 않았다면 component는 unmount이고 모든 변화를 감지한다.

```js
useEffect(sayHello, []);
// 배열에 어떤 값이 존재한다면, 그 값은 변하고 useEffect는 활성화된다.
useEffect(sayHello, [number]);
// number이 변할때만 sayHello를 실행시킨다.
```
