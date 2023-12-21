import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getSelectedObject,
  getStagePos,
  getStageScale,
  updateWithObject,
} from "../features/canvas/canvasSlice";
import { useEffect, useRef, useState } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  // flex-grow: 0.8;
  position: relative;
`;

const Input = styled.textarea`
  display: block;
  position: absolute;
  top: ${(props) => `${props.y - 20}px`};
  left: ${(props) => `${props.x + 30}px`};
  width: 15rem;
  height: auto;
  padding: 5px;
  box-sizing: border-box;
  overflow: hidden;
  resize: none;
`;

function Main({ children }) {
  const dispatch = useDispatch();
  const object = useSelector(getSelectedObject);
  const offset = useSelector(getStagePos);
  const scale = useSelector(getStageScale);
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const inputRef = useRef();

  useAutosizeTextArea(inputRef, text, show);

  useEffect(() => {
    const element = inputRef.current;

    if (object?.type === "comment") {
      setText(object.text);
      element.focus();
      element.selectionStart = element.value.length;
    }
  }, [object]);

  useEffect(() => {
    setShow(object?.type === "comment");
  }, [object?.type]);

  function onChange(e) {
    const input_value = e.target.value;
    setText(input_value);
    dispatch(updateWithObject({ ...object, text: input_value }));
  }

  return (
    <StyledMain id="main">
      {children}
      {object?.type === "comment" && (
        <Input
          ref={inputRef}
          name="adjust"
          type="text"
          value={text}
          onChange={onChange}
          x={object.points[0]}
          y={object.points[1]}
          spellCheck="false"
        />
      )}
    </StyledMain>
  );
}

export default Main;
