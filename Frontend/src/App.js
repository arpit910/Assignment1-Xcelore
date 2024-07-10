import React from "react";
import Navbar from "./Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login.jsx";
import Home from "./Home/Home.jsx";
import AddPage from "./AddPage/AddPage.jsx";
import AdminPanel from "./AdminPanel/Panel.jsx";
import EditPage from "./AddPage/EditPage.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Routes>
          {user && <Route path="/" element={<Home />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/edit/:userId" element={<EditPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
