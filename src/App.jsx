import { createBrowserRouter } from "react-router-dom";
import Tool from "./pages/Tool";
import AppLayout from "./ui/AppLayout";

import { RouterProvider } from "react-router";
import { BASE } from "./utils/constants";
import Gallery from "./pages/Gallery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter([
    {
      path: `${BASE}`,
      element: <AppLayout />,
      children: [
        { path: ":id", element: <Tool /> },
        { path: "gallery", element: <Gallery /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />

      <RouterProvider router={router} />
    </>
  );
}

export default App;
