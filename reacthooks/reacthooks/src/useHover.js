import { useEffect, useRef } from "react";

const useHover = (onHover) => {
  const element = useRef();
  useEffect(() => {
    if (typeof onHover !== "function") {
      return;
    }
    if (element.current) {
      element.current.addEventListener("mouseenter", onHover);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("mouseenter", onHover);
      }
    };
  }, []);
  return typeof onHover === "function" ? element : undefined;
};
const App = () => {
  const sayHello = () => console.log("Hover");
  const Hover = useHover(sayHello);
  return (
    <div>
      <h1 ref={Hover}>Hover</h1>
    </div>
  );
};
export default App;
