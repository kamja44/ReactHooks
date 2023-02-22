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
  const sayHello = () => console.log("Hello");
  const title = useClick(sayHello);
  return (
    <div>
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

export default App;
