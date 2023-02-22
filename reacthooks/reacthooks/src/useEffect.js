import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const sayHello = () => console.log("hello");
  useEffect(() => {
    sayHello();
  });
  const [number, setNumber] = useState(0);
  const [aNumber, setAnumber] = useState(0);
  return (
    <div>
      <div>Hi</div>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber - 1)}>{aNumber}</button>
    </div>
  );
};

export default App;
