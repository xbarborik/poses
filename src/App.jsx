import "./App.css";
import Canvas from "./features/canvas/Canvas";
import Palette from "./features/colors/palette";
import Toolbar from "./features/tools/Toolbar";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <AppLayout>
      <Palette />
      <Canvas />
      <Toolbar />
    </AppLayout>
  );
}

export default App;
