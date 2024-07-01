/**
 * File: useCtrlAndKeyDown.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    hook that calls function on specific key press after ctrl
 */

import { useEffect } from "react";

function useCtrlAndKeyDown(key, callback) {
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === key && event.ctrlKey) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [callback, key]);
}

export default useCtrlAndKeyDown;
