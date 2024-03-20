import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImagesCount, setImages } from "../features/canvas/canvasSlice";
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
import Loader from "../ui/Loader";

function Tool() {
  const isImageSet = useSelector(getImagesCount);
  const [isLoading, setIsLoading] = useState(false);
  const stageRef = useRef(null);
  const dispatch = useDispatch();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const { id } = useParams();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const pose = await loadFromId(id);
      if (pose === null) {
        console.log("failed");
      } else {
        dispatch(setImages(pose));
        dispatch(setShowStyling(true));
      }
      setIsLoading(false);
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
        ) : !isLoading ? (
          <Canvas stageRef={stageRef} setImageSize={setImageSize} />
        ) : (
          <Loader />
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
