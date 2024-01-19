import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import CustomNavbar from "./header";
//import About from "./components/about";
import Blocks from "./components/block";
import Script from "./components/script";
import RoboticArm from "./components/RoboticArm";
//import RobotLayout from "./components/RobotLayout";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <BrowserRouter>
          <CustomNavbar />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/script" element={<Script />} />
              <Route path="/block" element={<Blocks />} />
            </Routes>
          </div>
        </BrowserRouter>
        <RoboticArm />
      </div>
    );
  }
}

export default App;
