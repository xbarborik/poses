import { useDispatch } from "react-redux";
import { setImage } from "../features/canvas/canvasSlice";
import styled from "styled-components";
import { useRef } from "react";
import UploadIcon from "../assets/uploadIcon";
import { setShowStyling } from "../features/stylePanel/styleSlice";
import { idFromDate } from "../utils/helpers";
import { useNavigate } from "react-router";
import { BASE } from "../utils/constants";

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
  height: 30vh;
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

function Upload({ showText = true, setImageFile }) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const navigate = useNavigate();

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
          const newId = idFromDate();
          const file = e.target.files[0];

          setImageFile(file);
          dispatch(
            setImage({
              id: newId,
              objects: {},
              path: URL.createObjectURL(file),
            })
          );
          dispatch(setShowStyling(true));
          navigate(`${BASE}image/${newId}`);
        }}
      />
    </StyledUpload>
  );
}

export default Upload;
