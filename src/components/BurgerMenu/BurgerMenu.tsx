import classNames from "classnames";

type Props = {
  toggleMenu: () => void;
  menuOpen: boolean;
};

export const BurgerMenu: React.FC<Props> = ({ toggleMenu, menuOpen }) => {
  return (
    <div className={classNames("menu", { "menu--open": menuOpen })}>
      <header className="header__box">
        <img src="img/icons/logo.svg" alt="logo" className="header__logo" />
        <button type="button" className="menu__close" onClick={toggleMenu}>
          <img src="img/icons/close.svg" alt="close" />
        </button>
      </header>
    </div>
  );
};
