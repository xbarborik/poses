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

function App() {
  return (
    <AppLayout>
      <TopBar>
        <StrokeWidthSlider
          defaultValue={10}
          minValue={4}
          maxValue={16}
          width="12rem"
        />
        <Palette />
      </TopBar>
      <Main>
        <Canvas />
        <Toolbar />
      </Main>
      <BottomBar>
        <Navigation />
      </BottomBar>
    </AppLayout>
  );
}

export default App;
