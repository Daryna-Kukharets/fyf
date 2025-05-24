import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { getClassHeader } from "../../utils/getLinkClass";

type Props = {
  toggleMenu: () => void;
  menuOpen: boolean;
};

export const BurgerMenu: React.FC<Props> = ({ toggleMenu, menuOpen }) => (
  <div className={classNames("menu", { "menu--open": menuOpen })}>
    <button className="menu__icon" onClick={toggleMenu}>
      <img src="img/icons/close.svg" alt="menu close" />
    </button>
    <div className="menu__nav-list">
      <NavLink to="/" className={getClassHeader} onClick={toggleMenu}>
        Головна
      </NavLink>
      <NavLink to="/about-us" className={getClassHeader} onClick={toggleMenu}>
        Про нас
      </NavLink>

      <NavLink to="/activities" className={getClassHeader} onClick={toggleMenu}>
        Активності
      </NavLink>

      <NavLink to="/reviews" className={getClassHeader} onClick={toggleMenu}>
        Відгуки
      </NavLink>
    </div>
  </div>
);
