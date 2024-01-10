import Canvas from "./features/canvas/Canvas";
import Palette from "./features/stylePanel/Palette";
import Toolbar from "./features/tools/Toolbar";
import AppLayout from "./ui/AppLayout";
import TopBar from "./ui/TopBar";
import Main from "./ui/Main";
import BottomBar from "./ui/BottomBar";
import Navigation from "./features/navigation/Navigation";
import UndoRedo from "./features/history/UndoRedo";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentImage,
  getImagesCount,
  getIsLoading,
  setImages,
} from "./features/canvas/canvasSlice";
import Upload from "./ui/Upload";
import Button from "./ui/Button";

function App() {
  const dispatch = useDispatch();
  const isImageSet = useSelector(getImagesCount);
  const isLoading = useSelector(getIsLoading);
  const stageRef = useRef(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/poses/images.json");
  //       const data = await response.json();
  //       dispatch(setImages(data));
  //     } catch (error) {
  //       console.error("Error fetching or parsing JSON:", error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch]);

  // if (!isImageSet) return
  return (
    <AppLayout>
      <TopBar>
        <Palette />
        {/* <Button>Options</Button> */}
      </TopBar>

      <Main stageRef={stageRef}>
        {!isImageSet ? (
          <Upload />
        ) : (
          <>{!isLoading && <Canvas stageRef={stageRef} />}</>
        )}
        <Toolbar>
          <UndoRedo />
        </Toolbar>
      </Main>

      {/* <BottomBar>
        <Navigation />
      </BottomBar> */}
    </AppLayout>
  );
}

export default App;
