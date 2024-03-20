import { useDispatch } from "react-redux";
import { setImages } from "../features/canvas/canvasSlice";
import styled from "styled-components";
import { useRef } from "react";
import UploadIcon from "../assets/uploadIcon";
import { setShowStyling } from "../features/stylePanel/styleSlice";
import { idFromDate } from "../utils/helpers";

const ImageInput = styled.input`
  display: none;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Text = styled.h3`
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
`;

function Upload({ showText = true }) {
  const dispatch = useDispatch();
  const inputRef = useRef();

  return (
    <StyledUpload>
      <Icon onClick={() => inputRef.current?.click()}>
        {/* <TfiGallery /> */}
        <UploadIcon />
        {showText && <Text>Nahrát fotku</Text>}
      </Icon>

      <ImageInput
        ref={inputRef}
        type="file"
        name="myImage"
        onChange={(e) => {
          const filesArray = Array.from(e.target.files).map((file) => ({
            id: idFromDate(),
            objects: {},
            path: URL.createObjectURL(file),
            file: file,
          }));

          dispatch(setImages(filesArray));
          dispatch(setShowStyling(true));
        }}
      />
    </StyledUpload>
  );
}

export default Upload;
