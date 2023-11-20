import "./App.css";
import Canvas from "./features/canvas/Canvas";
import Palette from "./features/colors/palette";
import Toolbar from "./features/tools/Toolbar";
import AppLayout from "./ui/AppLayout";
import TopBar from "./ui/TopBar";
import Main from "./ui/Main";

import warrior from "/images/warrior.png";

function App() {
  return (
    <AppLayout>
      <TopBar>
        <Palette />
      </TopBar>
      <Main>
        <img src={warrior} />
        <img src={"/images/warrior.png"} />
        <Canvas />
        <Toolbar />
      </Main>
    </AppLayout>
  );
}

export default App;
