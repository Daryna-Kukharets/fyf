import { useEffect } from "react";
import "./App.scss";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";

export const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="App">
        <Header />
      <div className="App__main">
        <Outlet />
      </div>
      {isHomePage && <Footer />}
    </div>
  );
};
