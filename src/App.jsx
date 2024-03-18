import Canvas from "./features/canvas/Canvas";
import Palette from "./features/stylePanel/Palette";
import Toolbar from "./features/tools/Toolbar";
import AppLayout from "./ui/AppLayout";
import TopBar from "./ui/TopBar";
import Main from "./ui/Main";
import BottomBar from "./ui/BottomBar";
import UndoRedo from "./features/history/UndoRedo";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImagesCount, getIsLoading } from "./features/canvas/canvasSlice";
import Upload from "./ui/Upload";

import Menu from "./ui/Menu";
import Opacity from "./ui/Opacity";
import Focus from "./features/tools/Focus";
import CompleteMenu from "./ui/CompleteMenu";

function App() {
  const isImageSet = useSelector(getImagesCount);
  const isLoading = useSelector(getIsLoading);
  const stageRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  return (
    <AppLayout>
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
      <CompleteMenu />
    </AppLayout>
  );
}

export default App;
