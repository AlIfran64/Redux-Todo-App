import { createBrowserRouter } from "react-router";
import RootLayout from "../Pages/RootLayout/RootLayout";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      }
    ]
  },
]);