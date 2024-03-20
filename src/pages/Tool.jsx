import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getImagesCount,
  getIsLoading,
  setImages,
} from "../features/canvas/canvasSlice";
import Upload from "../ui/Upload";
import Menu from "../ui/Menu";
import Opacity from "../ui/Opacity";
import Focus from "../features/tools/Focus";
import Canvas from "../features/canvas/Canvas";
import Palette from "../features/stylePanel/Palette";
import Toolbar from "../features/tools/Toolbar";
import TopBar from "../ui/TopBar";
import Main from "../ui/Main";
import BottomBar from "../ui/BottomBar";
import UndoRedo from "../features/history/UndoRedo";
import { useParams } from "react-router";
import { setShowStyling } from "../features/stylePanel/styleSlice";
import { loadFromId } from "../utils/supabaseClient";

function Tool() {
  const isImageSet = useSelector(getImagesCount);
  const isLoading = useSelector(getIsLoading);
  const stageRef = useRef(null);
  const dispatch = useDispatch();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const { id } = useParams();

  useEffect(() => {
    async function load() {
      const pose = await loadFromId(id);
      if (pose === null) {
        console.log("failed");
        return;
      } else {
        dispatch(setImages(pose));
        dispatch(setShowStyling(true));
      }
    }

    if (id) load();
  }, [id, dispatch]);

  return (
    <>
      <TopBar>
        <Palette />
      </TopBar>

      <Main stageRef={stageRef}>
        {!isImageSet ? (
          <Upload />
        ) : (
          !isLoading && (
            <Canvas stageRef={stageRef} setImageSize={setImageSize} />
          )
        )}
        <Toolbar>
          <UndoRedo />
        </Toolbar>
      </Main>

      {isImageSet ? <BottomBar>{/* <Navigation /> */}</BottomBar> : null}
      <Menu stageRef={stageRef} imageSize={imageSize} />
      <Opacity />
      <Focus />
      {/* <CompleteMenu /> */}
    </>
  );
}

export default Tool;
