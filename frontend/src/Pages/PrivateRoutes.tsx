import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuth } from "../Utils/auth";

const PrivateRoutes = () => {
  const location = useLocation();

  if (!isAuth()) {
    return <Navigate to={"/login"} />;
  }

  if (location.pathname === "/") {
    return <Navigate to={"/dashboard"} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
