/**
 * File: Overlay.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *  Adds interactive elements like comment input and delete button to child
 */

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import {
  deselectObject,
  getIsDragging,
  getSelectedObject,
  getStagePos,
  getStageScale,
  getViewOnly,
  removeObject,
  updateWithObject,
} from "./canvasSlice";
import useAutosizeTextArea from "../../hooks/useAutosizeTextArea";
import { themes } from "../../utils/themes";
import SpeechToText from "../../ui/SpeechToText";
import { RiEdit2Fill } from "react-icons/ri";

const StyledOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
  background-color: ${themes.background};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
  gap: 0px;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  z-index: 999;
`;

const Input = styled.textarea`
  display: block;
  width: 200px;
  height: auto;
  padding: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  resize: none;
  overflow: hidden;
  fontsize: 1rem;
  transition: 0s;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  font-family: ${themes.font};

  &:disabled {
    background-color: #fff;
    opacity: 1;
  }
`;

const Button = styled.button`
  background-color: ${themes.primary};
  border: none;
  padding: 0.45rem;
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
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
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 5px;
  transition: 0s;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
`;

const OptionsButton = styled.button`
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  padding: 0.5rem;
  font-size: 1.1rem;
`;

function Overlay({ children, stageRef }) {
  const dispatch = useDispatch();
  const object = useSelector(getSelectedObject);
  const offset = useSelector(getStagePos);
  const scale = useSelector(getStageScale);
  const viewOnly = useSelector(getViewOnly);
  const isDragging = useSelector(getIsDragging);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [shapeOptionsPosition, setShapeOptionsPosition] = useState({
    x: 0,
    y: 0,
  });
  const [shapeSize, setShapeSize] = useState({
    width: 0,
    height: 0,
  });
  const inputRef = useRef();
  const shapeOptionsRef = useRef();
  const containerWidth = 300;

  useAutosizeTextArea(inputRef, text, object);

  useEffect(() => {
    const element = inputRef.current;

    if (element === null) return;

    if (object?.type === "comment") {
      setText(object.text);
      if (object.text.length === 0) element.focus();
    }
  }, [object]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  // calculates location of menu above objects on select based on Konva clientRect
  useEffect(() => {
    function setupOptionsMenu() {
      setIsLoading(true);

      if (
        stageRef?.current !== null &&
        shapeOptionsRef?.current !== null &&
        object
      ) {
        const shapeNode = stageRef.current.findOne(`#${object.id}`);
        const groupNode = shapeNode?.getParent();

        if (!groupNode) return;
        const boundingBox =
          groupNode.getClassName() === "Group"
            ? groupNode.getClientRect()
            : shapeNode.getClientRect();

        // no need to adjust, because clientRect already has scales applied
        const shapeOptionsWidth = shapeOptionsRef.current.offsetWidth;

        let x = boundingBox.x + boundingBox.width / 2 - shapeOptionsWidth / 2;
        const offset = 45;
        let y = boundingBox.y - offset;

        if (object?.type === "comment" && y < 25) {
          x = boundingBox.x + boundingBox.width / 2 + offset;
          y = boundingBox.y + boundingBox.width / 2 - shapeOptionsWidth / 2;
        } else if (y < 25) {
          y = boundingBox.y + boundingBox.height + offset / 2;
        }

        setShapeOptionsPosition({ x, y });
        setShapeSize({ width: boundingBox.width, height: boundingBox.height });
        setIsLoading(false);
      }
    }
    const debounceTimer = setTimeout(setupOptionsMenu, 0);

    return () => clearTimeout(debounceTimer);
  }, [object, offset, scale, stageRef, isDragging, isLoading]);

  function onChange(e) {
    const input_value = e.target.value;
    setText(input_value);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      setShapeOptionsPosition({ x: 0, y: 0 });
      dispatch(updateWithObject({ ...object, text: text }));
      dispatch(deselectObject());
    }
  }

  function adjustX() {
    let x = shapeOptionsPosition.x;
    x = x * scale + offset.x - containerWidth / 2;

    const windowWidth = window.innerWidth;

    // Ensure that window doesn't overflow
    if (x + containerWidth > windowWidth) {
      x = windowWidth - containerWidth;
    }

    if (x < 0) x = 0;

    return x;
  }

  function adjustY() {
    if (!shapeOptionsRef.current) return -1000;
    const shapeOptionsHeight = shapeOptionsRef.current.offsetHeight;
    const y =
      shapeOptionsPosition.y + shapeSize.height + shapeOptionsHeight + 10;
    return y;
  }

  function handleComplete() {
    dispatch(updateWithObject({ ...object, text: text }));
    dispatch(deselectObject());
    setIsEditing(false);
  }

  return (
    <StyledOverlay id="main">
      {children}
      {object?.type === "comment" && !isDragging && (
        <InputContainer x={adjustX()} y={adjustY()} $isVisible={!isLoading}>
          <Input
            ref={inputRef}
            name="adjust"
            type="text"
            value={text}
            onKeyDown={handleKeyPress}
            onChange={onChange}
            onFocus={() => setIsEditing(true)}
            spellCheck="false"
            $isVisible={!isLoading}
            disabled={viewOnly}
          />
          {!viewOnly && (
            <Button
              name="adjust"
              onClick={() => {
                isEditing ? handleComplete() : setIsEditing(true);
              }}
            >
              {isEditing ? (
                <FaCheck style={{ pointerEvents: "none" }} />
              ) : (
                <RiEdit2Fill style={{ pointerEvents: "none" }} />
              )}
            </Button>
          )}
          {isEditing && (
            <>
              <SpeechToText
                setText={(value) => setText(value)}
                resetCondition={object.id}
              />
            </>
          )}
        </InputContainer>
      )}

      {object?.id && !isDragging && (
        <>
          {!viewOnly && (
            <ShapeOptions
              x={shapeOptionsPosition.x}
              y={shapeOptionsPosition.y}
              ref={shapeOptionsRef}
              $isVisible={!isLoading}
            >
              <OptionsButton onClick={() => dispatch(removeObject(object.id))}>
                <FaRegTrashAlt />
              </OptionsButton>
            </ShapeOptions>
          )}
        </>
      )}
    </StyledOverlay>
  );
}

export default Overlay;
