import { useEffect, useState } from "react";
import { Navigation } from "../Navigation/Navigation";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { Link, useLocation } from "react-router-dom";
import { Login } from "../Login/Login";
import { useAuthStore } from "../../store/authStore";
import { getProfile } from "../../api/auth";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, setUser, token } = useAuthStore();

  const location = useLocation();

  const isHomePage = location.pathname === "/" || location.pathname === "/fyf";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleLogin = () => {
    setLoginOpen(!loginOpen);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = loginOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [loginOpen]);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

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
  }, [isHomePage]);

  useEffect(() => {
    if (location.state && (location.state as any).openLoginModal) {
      setLoginOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (!token || user) {
      return;
    }

    getProfile()
      .then((userData) => {
        setUser(userData);
      })
      .catch((err) => {
        console.error("Не вдалося отримати профіль:", err);
      });
  }, [token, user]);

  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__box">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src="img/icons/logo.svg"
                alt="logo"
                className="header__logo"
              />
            </Link>
            <div className="header__block">
              <Navigation
                classForList={"nav__list--header"}
                classForLink={"nav__link--header"}
              />
              {user ? (
                <Link to="/profile">
                  <img
                    src={user.photoPath || "img/icons/take-photo.svg"}
                    alt="avatar"
                    className="header__avatar"
                  />
                </Link>
              ) : (
                <div className="header__buttons">
                  <Link
                    to="/registration"
                    className="header__button header__button--regist"
                  >
                    Реєстрація
                  </Link>
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="header__button header__button--login"
                  >
                    Вхід
                  </button>
                </div>
              )}
            </div>
            <div className="header__icons">
              <button
                type="button"
                className="header__icon"
                onClick={toggleMenu}
              >
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
              {user ? (
                <Link to="/profile">
                  <img
                    src={user.photoPath || "img/icons/take-photo.svg"}
                    alt="avatar"
                    className="header__avatar"
                  />
                </Link>
              ) : (
                <button
                  type="button"
                  className="header__icon"
                  onClick={() => setLoginOpen(true)}
                >
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.3593 32.0558C12.9177 30.9338 14.5713 30.0471 16.3203 29.3957C18.0681 28.743 19.9613 28.4167 22 28.4167C24.0387 28.4167 25.9319 28.743 27.6797 29.3957C29.4274 30.0483 31.0811 30.9344 32.6407 32.054C33.8507 30.8012 34.8242 29.3223 35.5612 27.6173C36.2982 25.9099 36.6667 24.0374 36.6667 22C36.6667 17.9361 35.2385 14.4754 32.3822 11.6178C29.5258 8.76028 26.0651 7.33211 22 7.33333C17.9349 7.33456 14.4742 8.76333 11.6178 11.6197C8.7615 14.476 7.33334 17.9361 7.33334 22C7.33334 24.0374 7.70184 25.9099 8.43884 27.6173C9.17584 29.3236 10.1493 30.8024 11.3593 32.054M22 22.9167C20.4563 22.9167 19.1534 22.3862 18.0913 21.3253C17.0292 20.2644 16.4988 18.9616 16.5 17.4167C16.5012 15.8718 17.0317 14.5689 18.0913 13.508C19.151 12.4471 20.4539 11.9167 22 11.9167C23.5461 11.9167 24.849 12.4471 25.9087 13.508C26.9683 14.5689 27.4988 15.8718 27.5 17.4167C27.5012 18.9616 26.9708 20.2644 25.9087 21.3253C24.8466 22.3862 23.5437 22.9167 22 22.9167ZM22 38.5C19.6986 38.5 17.5444 38.0716 15.5375 37.2148C13.5306 36.3581 11.7841 35.1872 10.2978 33.7022C8.81161 32.2172 7.64072 30.4706 6.78517 28.4625C5.92961 26.4544 5.50122 24.3002 5.5 22C5.49878 19.6998 5.92717 17.5456 6.78517 15.5375C7.64317 13.5294 8.81406 11.7828 10.2978 10.2978C11.7841 8.81283 13.5306 7.64194 15.5375 6.78517C17.5444 5.92839 19.6986 5.5 22 5.5C24.3014 5.5 26.4556 5.92839 28.4625 6.78517C30.4694 7.64194 32.2159 8.81283 33.7022 10.2978C35.1884 11.7828 36.3593 13.5294 37.2148 15.5375C38.0704 17.5456 38.4988 19.6998 38.5 22C38.5012 24.3002 38.0728 26.4544 37.2148 28.4625C36.3568 30.4706 35.1859 32.2172 33.7022 33.7022C32.2159 35.1872 30.4694 36.3581 28.4625 37.2148C26.4556 38.0716 24.3014 38.5 22 38.5Z"
                      fill="black"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          {isHomePage && (
            <div
              className="header__scroll-progress"
              style={{ width: `${scrollWidth}%` }}
            />
          )}
        </div>
      </header>
      <BurgerMenu toggleMenu={toggleMenu} menuOpen={menuOpen} />
      {loginOpen && <Login loginOpen={loginOpen} toggleLogin={toggleLogin} />}
    </>
  );
};
