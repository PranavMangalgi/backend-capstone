// import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Addjob from "./components/Addjob/Addjob";
import ProtectedRoutes from "./components/ProtectedRoute/ProtectedRoute";
import ViewJob from "./components/ViewJob/ViewJob";
import Error from "./components/Error404/Error";
import ConditionalRoute from "./components/ConditionalRoute/ConditionalRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ConditionalRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* /login and /register are only available if the user is not logged in */}
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/addjob" element={<Addjob />} />
          <Route path="/addjob/:id" element={<Addjob />} />
        </Route>
        <Route path="/job/:id" element={<ViewJob />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
