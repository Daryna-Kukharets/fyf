import { Navigation } from "../Navigation/Navigation";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__box-bg">
        <div className="footer__box">
          <img 
            src="img/icons/logo.svg" 
            alt="logo" 
            className="footer__img"
          />
          <div className="footer__nav-box">
            <div className="footer__block">
              <Navigation
                classForList={"nav__list--footer"}
                classForLink={"nav__link--footer"}
              />
            </div>
            <div className="footer__block">
              <nav className="footer__nav">
                <ul className="nav__list nav__list--footer">
                  <li className="nav__nav-item">
                    <p className="nav__link nav__link--footer nav__link--bold">
                      Юридична інформація
                    </p>
                  </li>
                  <li className="footer__nav-item">
                    <a href="#" className="nav__link nav__link--footer">
                      Політика Конфіденційності
                    </a>
                  </li>
                  <li className="footer__nav-item">
                    <a href="#" className="nav__link nav__link--footer">
                      Умови використання
                    </a>
                  </li>
                  <li className="footer__nav-item">
                    <a href="#" className="nav__link nav__link--footer">
                      Файли cookie
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="footer__block footer__block--break">
              <nav className="footer__nav">
                <ul className="nav__list nav__list--footer">
                  <li className="nav__nav-item">
                    <p className="nav__link nav__link--footer nav__link--bold">
                      Зв'язатися
                    </p>
                  </li>
                  <li className="footer__nav-item">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.54 5C6.6 5.89 6.75 6.76 6.99 7.59L5.79 8.79C5.38 7.59 5.12 6.32 5.03 5H6.54ZM16.4 17.02C17.25 17.26 18.12 17.41 19 17.47V18.96C17.68 18.87 16.41 18.61 15.2 18.21L16.4 17.02ZM7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.51C21 15.96 20.55 15.51 20 15.51C18.76 15.51 17.55 15.31 16.43 14.94C16.331 14.903 16.2256 14.886 16.12 14.89C15.86 14.89 15.61 14.99 15.41 15.18L13.21 17.38C10.3755 15.9303 8.06966 13.6245 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.69132 6.41789 8.4989 5.21274 8.5 4C8.5 3.45 8.05 3 7.5 3Z"
                        fill="black"
                      />
                    </svg>
                    <a
                      href="tel:+ 380 (95) 455 38 40"
                      className="nav__link nav__link--footer"
                    >
                      + 380 (95) 455 38 40
                    </a>
                  </li>
                  <li className="footer__nav-item">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                        fill="black"
                      />
                    </svg>
                    <a href="mailto:findyourfun@gmail.com" className="nav__link nav__link--footer">
                      findyourfun@gmail.com
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <p className="footer__text-down">
          FindYourFun Design. All rights reserved
        </p>
      </div>
    </div>
  );
};
