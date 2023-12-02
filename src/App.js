import React from "react";
import "./App.css";
import Home from "./HomePage/home";
import { Route, Routes } from "react-router-dom";
import ComparisonTool from "./ComparisonTool/comparisonTool";
import Welcome from "./WelcomePage/welcome";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/:id" element={<Home />} />
        <Route path="/comparisonTool/:str" element={<ComparisonTool />} />
      </Routes>
    </>
  );
};
export default App;
