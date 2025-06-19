import { Link, NavLink, useLocation } from "react-router-dom";
import { getClassHeader } from "../../utils/getLinkClass";
import { useEffect, useState } from "react";
import { Navigation } from "../Navigation/Navigation";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollWidth(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  console.log(scrollWidth);

  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__box">
            <img src="img/icons/logo.svg" alt="logo" className="header__logo" />
            <div className="header__block">
              <Navigation
                classForList={"nav__list--header"}
                classForLink={"nav__link--header"}
              />
              <div className="header__buttons">
                <button
                  type="button"
                  className="header__button header__button--regist"
                >
                  Реєстрація
                </button>
                <button className="header__button header__button--login">
                  Вхід
                </button>
              </div>
            </div>
            <div className="header__menu-container">
              <button type="button" className="header__icon" onClick={toggleMenu}>
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.33334 31.6617V29.8284H36.6667V31.6617H7.33334ZM7.33334 22.9167V21.0834H36.6667V22.9167H7.33334ZM7.33334 14.1717V12.3384H36.6667V14.1717H7.33334Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            className="header__scroll-progress"
            style={{ width: `${scrollWidth}%` }}
          />
        </div>
      </header>
      <BurgerMenu toggleMenu={toggleMenu} menuOpen={menuOpen} />
    </>
  );
};
