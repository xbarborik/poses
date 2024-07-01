/**
 * File: Upload.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Input for uploading images
 */

import { useDispatch } from "react-redux";
import { setImage } from "../features/canvas/canvasSlice";
import styled from "styled-components";
import { useRef } from "react";
import UploadIcon from "../assets/uploadIcon";
import { idFromDate } from "../utils/helpers";
import { useNavigate } from "react-router";
import { uploadImageAndPose } from "../utils/supabaseAPI";

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
  height: 40vh;
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
  const navigate = useNavigate();
  const inputRef = useRef();

  return (
    <StyledUpload>
      <Icon onClick={() => inputRef.current?.click()}>
        <UploadIcon width="5rem" height="5rem" />
        {showText && <Text>Nahrát fotku</Text>}
      </Icon>

      <ImageInput
        ref={inputRef}
        type="file"
        name="myImage"
        onChange={(e) => {
          const newId = idFromDate();
          const file = e.target.files[0];

          const image = {
            id: newId,
            objects: {},
            path: URL.createObjectURL(file),
          };

          setImageFile(file);
          dispatch(setImage(image));

          uploadImageAndPose(
            {
              ...image,
              originalSize: {
                stage: { width: 1, height: 1 },
                image: { width: 1, height: 1 },
              },
            },
            file
          );

          navigate(`image/${newId}`);
        }}
      />
    </StyledUpload>
  );
}

export default Upload;
