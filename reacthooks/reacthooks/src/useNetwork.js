import React, { useState, useEffect } from "react";

const useNetwork = (onChange) => {
  const [status, setStatue] = useState(navigator.onLine);
  console.log(navigator.onLine);
  const handleChagne = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStatue(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleChagne);
    window.addEventListener("offline", handleChagne);
    return () => {
      window.removeEventListener("online", handleChagne);
      window.removeEventListener("offline", handleChagne);
    };
  }, []);
  return status;
};

const App = () => {
  const handleNetworkChange = (online) => {
    console.log(online ? "weJust went online" : "We are offline");
  };
  const onLine = useNetwork(handleNetworkChange);
  return (
    <div>
      <div>{onLine ? "Online" : "Offline"}</div>
    </div>
  );
};
export default App;
