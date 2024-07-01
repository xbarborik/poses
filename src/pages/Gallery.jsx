/**
 * File:Gallery.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Page used in router, view of gallery
 */

import styled from "styled-components";
import GalleryList from "../features/gallery/GalleryList";
import Upload from "../ui/Upload";
import { themes } from "../utils/themes";

const GalleryContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${themes.canvasBackground};
`;

function Gallery({ setImageFile }) {
  return (
    <GalleryContainer>
      <Upload setImageFile={setImageFile} />
      <GalleryList />
    </GalleryContainer>
  );
}

export default Gallery;
