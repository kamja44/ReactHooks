import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useFadeIn = (duration = 1, delay = 0) => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
};
const App = () => {
  const fadeInHi = useFadeIn(1, 2);
  const fadeInP = useFadeIn(5, 10);
  return (
    <div>
      <h1 {...fadeInHi}>Hi</h1>
      <p {...fadeInP}>lorem ipsum lol</p>
    </div>
  );
};
export default App;
