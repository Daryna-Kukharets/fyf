import { Link, NavLink } from "react-router-dom";
import { getClassHeader } from "../../utils/getLinkClass";
import { useEffect, useState } from "react";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { Login } from "../Login/Login";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleLogin = () => {
    setLoginOpen(!loginOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (loginOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [loginOpen]);

  return (
    <>
      <header className="header">
        <Link to="/">
          <picture>
            <source
              srcSet="./img/icons/logo-for-tablet.svg"
              media="(min-width: 1024px)"
            />
            <img src="./img/icons/logo-for-mobile.svg" alt="logo" />
          </picture>
        </Link>

        <div className="header__nav-list">
          <NavLink to="/" className={getClassHeader}>
            Головна
          </NavLink>
          <NavLink to="/about-us" className={getClassHeader}>
            Про нас
          </NavLink>

          <NavLink to="/activities" className={getClassHeader}>
            Активності
          </NavLink>

          <NavLink to="/reviews" className={getClassHeader}>
            Відгуки
          </NavLink>
        </div>
        <div className="header__icons">
          <button className="header__icon" onClick={toggleMenu}>
            <img
              src="./img/icons/menu.svg"
              alt="menu"
              className="header__menu"
            />
          </button>
          <button className="header__icon" onClick={toggleLogin}>
            <img
              src="./img/icons/account.svg"
              alt="account"
              className="header__account"
            />
          </button>
        </div>
      </header>
      <BurgerMenu toggleMenu={toggleMenu} menuOpen={menuOpen} />
      <Login toggleLogin={toggleLogin} loginOpen={loginOpen} />
    </>
  );
};
