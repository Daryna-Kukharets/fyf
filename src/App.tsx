import "./App.scss";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div className="App">
        <Header />
      <div className="App__main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
