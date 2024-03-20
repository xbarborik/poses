import { createBrowserRouter } from "react-router-dom";
import Tool from "./pages/Tool";
import AppLayout from "./ui/AppLayout";

import { RouterProvider } from "react-router";
import { BASE } from "./utils/constants";
import Gallery from "./pages/Gallery";

function App() {
  const router = createBrowserRouter([
    {
      path: `${BASE}:id?`,
      element: <Tool />,
      children: [{ path: `gallery`, element: <Gallery /> }],
    },
  ]);
  return (
    <AppLayout>
      <RouterProvider router={router} />
    </AppLayout>
  );
}

export default App;
