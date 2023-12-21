import { useEffect } from "react";

// https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (textAreaRef, value, show) => {
  useEffect(() => {
    const element = textAreaRef.current;

    if (element) {
      const minHeight = "2em";
      element.style.height = minHeight;
      const scrollHeight = element.scrollHeight;

      element.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value, show]);
};

export default useAutosizeTextArea;
