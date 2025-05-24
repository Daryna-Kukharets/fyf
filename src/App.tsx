import React from "react";

import "./App.scss";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div className="App">
      <div className="App__header">
        <Header />
      </div>
      <div className="App__main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
