import Home from "./components/Home"
import React from "react";
import AddTasks from "./components/AddTasks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/AddTasks" element={<AddTasks/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
