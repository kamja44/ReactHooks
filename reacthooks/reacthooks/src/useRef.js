import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const potato = useRef();
  console.log(potato);
  setTimeout(() => potato.current.focus(), 5000);
  return (
    <div>
      <div>Hi</div>
      <input ref={potato} placeholder="kamja" />
    </div>
  );
};

export default App;
