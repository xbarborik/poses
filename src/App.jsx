import Canvas from "./features/canvas/Canvas";
import Palette from "./features/stylePanel/Palette";
import Toolbar from "./features/tools/Toolbar";
import AppLayout from "./ui/AppLayout";
import TopBar from "./ui/TopBar";
import Main from "./ui/Main";
import BottomBar from "./ui/BottomBar";
import Navigation from "./features/navigation/Navigation";
import UndoRedo from "./features/history/UndoRedo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, setImages } from "./features/canvas/canvasSlice";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/poses/images.json");
        const data = await response.json();
        dispatch(setImages(data));
      } catch (error) {
        console.error("Error fetching or parsing JSON:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <AppLayout>
      <TopBar>
        <Palette />
      </TopBar>

      <Main>
        {!isLoading && <Canvas />}
        <Toolbar>
          <UndoRedo />
        </Toolbar>
      </Main>
      <BottomBar>
        <Navigation />
      </BottomBar>
    </AppLayout>
  );
}

export default App;
