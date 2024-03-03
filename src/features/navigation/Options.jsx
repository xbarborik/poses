import styled from "styled-components";
import Button from "../../ui/Button";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { FaRegSave } from "react-icons/fa";

import {
  getCurrentImageIndx,
  getImagesCount,
  setCurrentImageIndx,
  setImages,
} from "../canvas/canvasSlice";
import Upload from "../../ui/Upload";
import UploadIcon from "../../assets/uploadIcon";
import { useRef } from "react";

const StyledNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  width: 80%;
  padding: 0.4rem;
  margin: auto;
  box-sizing: border-box;
`;

const ImageInput = styled.input`
  display: none;
`;

function Options() {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const filesArray = Array.from(e.target.files).map((file, index) => ({
      id: index,
      path: URL.createObjectURL(file),
    }));

    dispatch(setImages(filesArray));
  };

  return (
    <StyledNavigation>
      <ImageInput
        ref={inputRef}
        type="file"
        name="myImage"
        onChange={handleImageUpload}
        multiple
      />

      <Button onClick={handleButtonClick} size={"small"}>
        <UploadIcon size={2} />
      </Button>

      <Button onClick={null} size={"small"}>
        <FaRegSave />
      </Button>
    </StyledNavigation>
  );
}

export default Options;
