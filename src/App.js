import "./style.css"
import Building from "./components/Building";
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Elevator Execrise</h1>
      <div className='container'>
        <Building></Building>
      </div>
    </div>
  );
}

export default App;
