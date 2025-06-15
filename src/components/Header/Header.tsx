import { Link, NavLink, useLocation } from "react-router-dom";
import { getClassHeader } from "../../utils/getLinkClass";
import { useEffect, useState } from "react";
import { Navigation } from "../Navigation/Navigation";

export const Header = () => {
  return (
    <header className="header">
      <img
        src="img/icons/logo.svg"
        alt="logo"
        className="header__logo"
      />
      <div className="header__block">
          <Navigation
          classForList={'nav__list--header'}
          classForLink={'nav__link--header'}
        />
        <div className="header__buttons">
          <button type="button" className="header__button header__button--regist">
            Реєстрація
          </button>
          <button className="header__button header__button--login">
            Вхід
          </button>
        </div>
      </div>
    </header>
  );
};
