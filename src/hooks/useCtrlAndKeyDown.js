import { useEffect } from "react";

function useCtrlAndKeyDown(watchedKey, callback) {
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === watchedKey && event.ctrlKey) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [callback, watchedKey]);
}

export default useCtrlAndKeyDown;
