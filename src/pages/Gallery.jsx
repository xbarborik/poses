import styled from "styled-components";
import GalleryList from "../features/gallery/GalleryList";
import Upload from "../ui/Upload";
import { themes } from "../utils/themes";

const GalleryContainer = styled.div`
  overflow-y: auto;
  height: 100%;
  background-color: ${themes.background};
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
