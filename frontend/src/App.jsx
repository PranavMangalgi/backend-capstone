// import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
