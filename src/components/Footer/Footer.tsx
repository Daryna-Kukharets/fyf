import { Link } from "react-router-dom";

export const Footer = () => (
  <div className="footer">
    <div className="footer__box">
      <div className="footer__block-first">
        <Link to="/">
          <img
            src="./img/icons/logo-for-footer.svg"
            alt="logo"
            className="footer__logo"
          />
        </Link>
        <div className="footer__nav-list">
          <Link to="/about-us" className="footer__nav-link">
            Про нас
          </Link>
          <Link to="/activities" className="footer__nav-link">
            Активності
          </Link>
          <Link to="/reviews" className="footer__nav-link">
            Відгуки
          </Link>
        </div>
        <ul className="footer__nav-list">
          <li className="nav__item">
            <a href="/" className="footer__nav-link">
              Політика Конфіденційності
            </a>
          </li>
          <li className="nav__item">
            <a href="/" className="footer__nav-link">
              Умови використання
            </a>
          </li>
          <li className="nav__item">
            <a href="/" className="footer__nav-link">
              Файли cookie
            </a>
          </li>
        </ul>
        <ul className="footer__nav-list">
          <li className="nav__item" style={{ fontWeight: 700 }}>
            <p className="footer__nav-link">Зв'язатися:</p>
          </li>
          <li className="nav__item">
            <a
              href="tel:+ 380 (95) 455 38 40"
              className="footer__nav-link footer__connection"
            >
              <img src="./img/icons/phone.svg" alt="phone" />
              {"+ 380 (95) 455 38 40"}
            </a>
          </li>
          <li className="nav__item">
            <a
              href="mailto:findyourfun@gmail.com"
              className="footer__nav-link footer__connection"
            >
              <img src="./img/icons/post.svg" alt="post" />
              findyourfun@gmail.com
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__block-second">
        <p className="footer__text">FindYourFun Design. All rights reserved</p>
      </div>
    </div>
  </div>
);
