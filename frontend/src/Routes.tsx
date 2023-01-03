import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoutes from "./Pages/PrivateRoutes";
import Layout from "./Layouts";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "",
            element: <div>Home</div>,
          },
          {
            path: "/words",
            element: <div>Words</div>,
          },
          {
            path: "/settings",
            element: <div>Settings</div>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
