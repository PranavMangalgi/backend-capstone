// import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Addjob from "./components/Addjob/Addjob";
import ProtectedRoutes from "./components/ProtectedRoute/ProtectedRoute";
import ViewJob from "./components/ViewJob/ViewJob";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/addjob" element={<Addjob />} />
          <Route path="/addjob/:id" element={<Addjob />} />
        </Route>
        <Route path="/job/:id" element={<ViewJob />} />
      </Routes>
    </>
  );
}

export default App;
