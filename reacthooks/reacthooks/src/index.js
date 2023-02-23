import React from "react";
import ReactDOM from "react-dom/client";
import UseInput from "./useInputHook";
import UseTabHooks from "./useTabHooks";
import UseEffectHooks from "./useEffect";
import UseTitle from "./useTitle";
import UseRef from "./useRef";
import UseClick from "./useClick";
import UseHover from "./useHover";
import UseConfirm from "./useConfirm";
import UsePreventLeave from "./usePreventLeave";
import UseBeforeLeave from "./useBeforeLeave";
import UseFadeIn from "./useFadeIn";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UseFadeIn />);
