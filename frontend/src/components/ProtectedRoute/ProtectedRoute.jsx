// import { Navigate } from "react-router-dom";
// import PropTypes from "prop-types";
// function ProtectedRoutes({ component: Component }) {
//   return localStorage.getItem("token") ? (
//     <Component />
//   ) : (
//     <Navigate to="/login" />
//   );
// }

// ProtectedRoutes.propTypes = {
//   component: PropTypes.element.isRequired,
// };

// export default ProtectedRoutes;

import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  return localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}



export default ProtectedRoutes;

