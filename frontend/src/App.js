import Home from "./components/Home"
import React from "react";
import AddTasks from "./components/AddTasks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTask from "./components/EditTask"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddTasks" element={<AddTasks />} />
        <Route path="/edit/:id" element={<EditTask />} />

      </Routes>
    </Router>
  );
}

export default App;
