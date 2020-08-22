import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
const Main = () => {
  return (
    <>
      <Router>
        <Header />
      </Router>
      <Sidebar />
      <Footer />
    </>
  );
};

export default Main;
