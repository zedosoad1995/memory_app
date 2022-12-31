import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const location = useLocation();

  if (false) {
    return <Navigate to={"/login"} />;
  }

  if (location.pathname === "/") {
    return <Navigate to={"/dashboard"} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
