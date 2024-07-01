/**
 * File: useClickOutsideContainer.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    hook that calls a function if the target is outside
 */

import { useEffect } from "react";

function useClickOutsideContainer(ref, callback, exception) {
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !e.target?.getAttribute("name")?.includes(exception)
      ) {
        callback();
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [ref, callback, exception]);
}

export default useClickOutsideContainer;
