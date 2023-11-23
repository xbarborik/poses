import "./App.css";
import Canvas from "./features/canvas/Canvas";
import Palette from "./features/colors/palette";
import Toolbar from "./features/tools/Toolbar";
import AppLayout from "./ui/AppLayout";
import TopBar from "./ui/TopBar";
import Main from "./ui/Main";
import BottomBar from "./ui/BottomBar";
import Navigation from "./features/navigation/Navigation";
import StrokeWidthSlider from "./features/stroke-width-slider/StrokeWidthSlider";
import UndoRedo from "./features/history/UndoRedo";
import { useEffect, useState } from "react";

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/poses/images.json");
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching or parsing JSON:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppLayout>
      <TopBar>
        <UndoRedo />
        <StrokeWidthSlider defaultValue={8} minValue={4} maxValue={16} />
        <Palette />
      </TopBar>
      <Main>
        <Canvas image={images[currentImageIndex]} />
        <Toolbar />
      </Main>
      <BottomBar>
        <Navigation
          index={currentImageIndex}
          setIndex={setCurrentImageIndex}
          maxIndex={1}
        />
      </BottomBar>
    </AppLayout>
  );
}

export default App;
