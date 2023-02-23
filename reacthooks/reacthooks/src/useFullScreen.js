import React, { useState, useEffect, useRef } from "react";

const useFullscreen = (callback) => {
  const element = useRef();
  console.log(element);
  const triggerFull = () => {
    if (element.current) {
      element.requestFullscreen();
      if (callback && typeof callback === "function") {
        callback(true);
      }
    }
  };
  const exitFull = () => {
    document.exitFullscreen();
    if (callback && typeof callback === "function") {
      callback(false);
    }
  };
  return { element, triggerFull, exitFull };
};

const App = () => {
  const onFullS = (isFull) => {
    console.log(isFull ? "We are full" : "We are small");
  };
  const { element, triggerFull, exitFull } = useFullscreen(onFullS);
  return (
    <div>
      <div ref={element}>
        <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODA5MjZfMTM4%2FMDAxNTM3OTEwMTAxMjQ0.h0H7__qIMZf4797Aqr_Oz_dv6sw2F0z98EF07mEZ0OIg.wcv2nk4eF0vv_kstjtaJjN5_fgqy2XFWQGAkeBtkQ94g.PNG.crow_magpie%2F%25B8%25DE%25C0%25CC%25C7%25C3_%25B7%25CE%25B0%25ED.png&type=a340" />
        <button onClick={exitFull}>Exit FullScreen</button>
      </div>
      <button onClick={triggerFull}>Make FullScreen</button>
    </div>
  );
};

export default App;
