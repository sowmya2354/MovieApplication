import React from "react";
import { BrowserRouter } from "react-router-dom";
import Movies from "./components/Movies";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Movies />
      </div>
    </BrowserRouter>
  );
}

export default App;
