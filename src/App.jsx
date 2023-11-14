import "./App.css";
import Canvas from "./features/canvas/Canvas";
import Palette from "./features/colors/palette";
import Toolbar from "./features/tools/Toolbar";
import AppLayout from "./ui/AppLayout";
import TopBar from "./ui/TopBar";
import Main from "./ui/Main";

function App() {
  return (
    <AppLayout>
      <TopBar>
        <Palette />
      </TopBar>
      <Main>
        <Canvas />
        <Toolbar />
      </Main>
    </AppLayout>
  );
}

export default App;
