import { useDispatch } from "react-redux";
import { setImages } from "../features/canvas/canvasSlice";
import styled from "styled-components";
import { TfiGallery } from "react-icons/tfi";
import { GrYoga } from "react-icons/gr";

import { useRef } from "react";

const ImageInput = styled.input`
  display: none;
`;

const Icon = styled.div`
  opacity: 1;
  font-size: 5rem;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    filter: invert(1);
  }
`;

const StyledUpload = styled.div`
  height: 100%;
  width: 100%;
  background-color: #ffffffd9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Upload() {
  const dispatch = useDispatch();
  const inputRef = useRef();

  return (
    <StyledUpload>
      <Icon onClick={() => inputRef.current?.click()}>
        {/* <TfiGallery /> */}
        <svg width="6rem" height="6rem">
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="3%"
              markerHeight="3%"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>

          <rect
            x="5"
            y="5"
            width="75%"
            height="75%"
            stroke="black"
            strokeWidth="5"
            fill="none"
          />
          <line
            x1="86%"
            x2="93%"
            y1="22%"
            y2="22%"
            stroke="black"
            strokeWidth="4"
          />
          <line
            x1="91%"
            x2="91%"
            y1="20%"
            y2="80%"
            stroke="black"
            strokeWidth="4"
          />
          <line
            x1="20%"
            x2="82%"
            y1="95%"
            y2="95%"
            stroke="black"
            strokeWidth="4"
          />
          <line
            x1="91%"
            x2="91%"
            y1="100%"
            y2="89%"
            stroke="black"
            strokeWidth="4.5"
            markerEnd="url(#arrow)"
          />
          <line
            x1="20%"
            x2="20%"
            y1="89%"
            y2="97%"
            stroke="black"
            strokeWidth="4"
          />
          <GrYoga x="15%" y="15%" fontSize="70%" />
          <line
            x1="5%"
            x2="80%"
            y1="65%"
            y2="65%"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </Icon>

      <ImageInput
        ref={inputRef}
        type="file"
        name="myImage"
        multiple
        onChange={(e) => {
          const filesArray = Array.from(e.target.files).map((file, index) => ({
            id: index,
            path: URL.createObjectURL(file),
          }));

          dispatch(setImages(filesArray));
        }}
      />
    </StyledUpload>
  );
}

export default Upload;
