import "./style.css"
import Building from "./components/Building";
import Home from "./components/pages/Home";
import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <h1>Elevator Execrise</h1>
      <div className="conteiner">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/building" element={<Building />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
      
  );
}

export default App;


