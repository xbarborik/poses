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
