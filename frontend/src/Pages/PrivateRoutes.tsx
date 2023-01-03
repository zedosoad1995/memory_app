import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../Utils/auth";

const PrivateRoutes = () => {
  if (!isAuth()) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
