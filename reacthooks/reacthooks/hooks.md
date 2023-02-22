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

# useTitle

- 문서의 제목을 업데이트 시켜주는hook
- react-helmet을 사용해도 된다.

```js
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};
const App = () => {
  const titleUpdater = useTitle("Loading...");
  setTimeout(() => titleUpdater("Home"), 5000);
  return (
    <div>
      <div>Hi</div>
    </div>
  );
};
export default App;
```

1. useTitle 훅 생성

- 파라미터로 initialTitle을 받고, title을 변경할 수 있는 useState를 사용한다.
- updateTitle함수를 생성한다.
  - htmlTitle로 title 태그를 받아오고 innerText를 이용하여 title의 값을 변경한다.
- useEffect를 사용하여 updateTitle 함수를 mount하고, title을 dependency로 설정하여 title이 변경될때마다 updateTitle 함수가 도작하도록 설정한다.
- return 값으로 setTitle을 반환한다.

2. App 함수

- titleUpdater 상수에 useTitle 함수를 할당한다.
  - 초기값으로 Loading...을 전달한다.
- setTimeout 함수안에 titleUpdater함수를 사용한다.
  - 5초후 title의 값이 Loading에서 Home으로 변경된다.

# reference

- useRef();
- component의 어떤 부분을 선택할 수 있는 방법이다.
- react에 있는 모든 component는 reference element(reference prop)를 갖고 있다.
  - 즉, input을 참조하고 있는 potato는 const potato이다.
  - 즉, ref를 이용하여 element에 접근할 수 있다.

```js
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const potato = useRef();
  console.log(potato);
  return (
    <div>
      <div>Hi</div>
      <input ref={potato} placeholder="kamja" />
    </div>
  );
};

export default App;
```

- console.log의 결과에는 element가 반환된다.
  - 즉, getElementById()와 결과가 같다.

# useClick

```js
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useClick = (onClick) => {
  const element = useRef();
  console.log(element);
  useEffect(() => {
    if (typeof onClick !== "function") {
      return;
    }
    // useEffect가 mount 되었을 때 click 이벤트를 추가한다.
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []); // dependency가 없기에 mount시에만 딱 한번 실행된다.
  return typeof onClick === "function" ? element : undefined;
};
const App = () => {
  const title = useClick();
  return (
    <div>
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

export default App;
```

1. useClick을 사용하여 useRef() 생성

- useClick에서 useRef를 return한다.

2. return한 useRef를 title 상수에 할당한다.
3. useRef를 할당받은 title 상수를 h1의 ref와 연결한다.

function을 return받았다면, componentWillUnMount로 부터 호출된것이다.

# useHover

- useClick훅과 내용 동일
