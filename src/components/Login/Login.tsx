import classNames from "classnames";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  toggleLogin: () => void;
  loginOpen: boolean;
};

export const Login: React.FC<Props> = ({ toggleLogin, loginOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <div className={classNames("login", { "login--open": loginOpen })}>
      <div className="login__box">
        <button className="login__close" onClick={toggleLogin}>
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="44" height="44" rx="22" fill="#E4E7EB" />
            <path
              d="M30 15.6114L28.3886 14L22 20.3886L15.6114 14L14 15.6114L20.3886 22L14 28.3886L15.6114 30L22 23.6114L28.3886 30L30 28.3886L23.6114 22L30 15.6114Z"
              fill="#0F0E0E"
            />
          </svg>
        </button>
        <h1 className="login__title">Вхід</h1>
        <form action="#" method="get" className="login__form">
          <div className="login__inputs">
            <div className="login__input-block">
              <label htmlFor="login-email" className="login__label">
                Пошта
              </label>
              <input
                type="email"
                className="login__input custom-input"
                id="regist-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login__input-block">
              <label htmlFor="login-password" className="login__label">
                Пароль
              </label>
              <div className="login__input-password">
                <input
                  type="password"
                  className="login__input custom-input"
                  id="regist-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="login__eye"
                >
                  <path
                    d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                    fill="#999DA3"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="login__password-block">
            <div className="login__check-block">
              <input
                type="checkbox"
                checked={checked}
                className="login__check"
                onChange={(e) => setChecked(e.target.checked)}
                id="login-check"
                required
              />
              <label htmlFor="login-check" className="login__remember">
                Запам'ятати мене
              </label>
            </div>
            <a href="/" className="login__remember">
              Нагадати пароль
            </a>
          </div>
          <div className="login__buttons">
            <button
              type="button"
              className="login__button login__button--login"
            >
              Увійти
            </button>
            <p className="login__or">Або</p>
            <button
              type="button"
              className="login__button login__button--google"
            >
              <img
                src="img/icons/google.svg"
                alt="google"
                className="login__google-img"
              />
              Увійти з Google
            </button>
          </div>
        </form>
        <button
          type="button"
          className="login__button login__button--reg"
          onClick={toggleLogin}
        >
          <Link to="/registration">Створити аккаунт</Link>
        </button>
      </div>
    </div>
  );
};
