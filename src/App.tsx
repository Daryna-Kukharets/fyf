import { useEffect } from "react";
import "./App.scss";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { getProfile } from "./api/auth";

export const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const { clearAuthState } = useAuthStore.getState();
  
  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("auth-storage") || "{}");
    const token = tokenData?.state?.token;
    if (token) {
      setToken(token);
      getProfile()
        .then(setUser)
        .catch(() => {
         clearAuthState();
        });
    } else {
 clearAuthState();
    }
  }, []);

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
