import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getIsDragging,
  getSelectedObject,
  getStagePos,
  getStageScale,
  removeObject,
  updateWithObject,
} from "../features/canvas/canvasSlice";
import { useEffect, useRef, useState } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import { FaRegTrashAlt } from "react-icons/fa";

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  // flex-grow: 0.8;
  position: relative;
`;

const Input = styled.textarea`
  display: block;
  position: absolute;
  top: ${(props) => `${props.y + 32}px`};
  left: ${(props) => `${props.x - 100}px`};
  width: 200px;
  height: auto;
  padding: 5px;
  box-sizing: border-box;
  overflow: hidden;
  resize: none;
  fontsize: 0.8rem;
  transition: 0s;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
`;

const ShapeOptions = styled.div`
  position: absolute;
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
  height: auto;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20%;
  transition: 0s;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
`;

const OptionsContainer = styled.div``;

const OptionsButton = styled.button`
  font-size: 0.9rem;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  padding: 0.5rem;
`;

function Main({ children, stageRef }) {
  const dispatch = useDispatch();
  const object = useSelector(getSelectedObject);
  const offset = useSelector(getStagePos);
  const scale = useSelector(getStageScale);
  const isDragging = useSelector(getIsDragging);
  const [text, setText] = useState("");
  const [showText, setShowText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shapeOptionsPosition, setShapeOptionsPosition] = useState({
    x: null,
    y: null,
  });
  const inputRef = useRef();
  const shapeOptionsRef = useRef();

  useAutosizeTextArea(inputRef, text, showText);

  useEffect(() => {
    const element = inputRef.current;

    if (object?.type === "comment") {
      setText(object.text);
      element.focus();
      element.selectionStart = element.value.length;
    }

    if (stageRef.current !== null && object) {
      const shapeNode = stageRef.current.findOne(`#${object.id}`);
      const groupNode = shapeNode.getParent();

      const boundingBox =
        groupNode.getClassName() === "Group"
          ? groupNode.getClientRect()
          : shapeNode.getClientRect();

      // no need to adjust, because clientRect already has scales applied
      const shapeOptionsWidth = shapeOptionsRef.current.offsetWidth;

      const x = boundingBox.x + boundingBox.width / 2 - shapeOptionsWidth / 2;
      const offset = 50;
      let y = boundingBox.y - offset;

      if (y < 25) {
        y = boundingBox.y + boundingBox.height + offset / 2;
      }

      setShapeOptionsPosition({ x, y });
    }

    setIsLoading(false);
  }, [object, offset, scale, stageRef]);

  // useEffect(() => {
  //   setIsLoading(true);
  // }, [object?.id]);

  useEffect(() => {
    if (isDragging) setIsLoading(true);
  }, [isDragging]);

  useEffect(() => {
    setShowText(object?.type === "comment");
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
          x={object?.points[0] * scale + offset.x}
          y={object?.points[1] * scale + offset.y}
          spellCheck="false"
          $isVisible={!isLoading}
        />
      )}

      {object?.id && (
        <ShapeOptions
          x={shapeOptionsPosition.x}
          y={shapeOptionsPosition.y}
          ref={shapeOptionsRef}
          $isVisible={!isLoading}
        >
          <OptionsButton onClick={() => dispatch(removeObject(object.id))}>
            <FaRegTrashAlt />
          </OptionsButton>
          {/* <OptionsButton
            onClick={() => dispatch(removeObject(object.id))}
          ></OptionsButton> */}
        </ShapeOptions>
      )}
    </StyledMain>
  );
}

export default Main;
