import { Navigate, Outlet } from "react-router-dom";

const ConditionalRoute = () => {
  return !localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
};

export default ConditionalRoute;
