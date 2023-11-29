import { useEffect } from "react";

function useClickOutsideContainer(ref, callback) {
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [ref, callback]);
}

export default useClickOutsideContainer;
