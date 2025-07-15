import classNames from "classnames";
import { Navigation } from "../Navigation/Navigation";
import { Link } from "react-router-dom";

type Props = {
  toggleMenu: () => void;
  menuOpen: boolean;
};

export const BurgerMenu: React.FC<Props> = ({ toggleMenu, menuOpen }) => {
  return (
    <div className={classNames("menu", { "menu--open": menuOpen })}>
      <header className="header__box">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            toggleMenu();
          }}
        >
          <img src="img/icons/logo.svg" alt="logo" className="header__logo" />
        </Link>
        <button type="button" className="menu__close" onClick={toggleMenu}>
          <img src="img/icons/close.svg" alt="close" />
        </button>
      </header>
      <Navigation
        classForList={"nav__list--menu"}
        classForLink={"nav__link--menu"}
        onLinkClick={toggleMenu}
      />
    </div>
  );
};
