import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Main = () => {
  return (
    <>
      <Router>
        <Header />
        <Sidebar />
      </Router>
    </>
  );
};

export default Main;
