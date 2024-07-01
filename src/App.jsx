/**
 * File:App.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    App component with routing
 */

import "regenerator-runtime/runtime"; // Required for speech to text
import { createHashRouter } from "react-router-dom";
import Tool from "./pages/Tool";
import AppLayout from "./ui/AppLayout";
import { RouterProvider } from "react-router";
import Gallery from "./pages/Gallery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function App() {
  const [imageFile, setImageFile] = useState();

  const router = createHashRouter([
    {
      path: `/`,
      element: <AppLayout />,
      children: [
        { index: true, element: <Gallery setImageFile={setImageFile} /> }, //
        {
          path: "image/:id?",
          element: <Tool imageFile={imageFile} setImageFile={setImageFile} />,
        },
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
