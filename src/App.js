import React from "react";
import { ReactDOM } from "react";
import "./App.css";
import Sidebar from "./Component/Sidebar";
import Chat from "./Component/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Component/Login";
import { useStateValue } from "./StateProvider";
function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <>
      <div className="app">
        {!user ? (
          <Login />
        ) : (
          <div className="app_body">
            <Router>
              <Sidebar />
              <Routes>
                <Route path="/rooms/:roomId" element={<Chat />} />
              </Routes>
            </Router>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
