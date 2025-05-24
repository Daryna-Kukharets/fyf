import classNames from "classnames";

type Props = {
  toggleLogin: () => void;
  loginOpen: boolean;
};

export const Login: React.FC<Props> = ({ toggleLogin, loginOpen }) => (
  <div className={classNames("login", { "login--open": loginOpen })}>
    <div className="login__box">
      <button className="login__icon" onClick={toggleLogin}>
        <img src="./img/icons/close.svg" alt="login close" />
      </button>
      <h1 className="login__title">Вхід</h1>
      <form action="#" method="get" className="login__form">
        <div className="login__input-box">
          <label htmlFor="input-email" className="login__label">
            Пошта
          </label>
          <input
            type="email"
            name="email"
            id="input-email"
            className="login__input"
            placeholder="hello@example.com"
            required
          />
        </div>
        <div className="login__input-box">
          <label htmlFor="input-password" className="login__label">
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="input-password"
            className="login__input"
            placeholder="··········"
            required
          />
        </div>
        <div className="login__row">
          <div className="login__input-box-check">
            <input
              type="checkbox"
              name="checkbox"
              id="input-checkbox"
              className="login__checkbox"
            />
            <label
              htmlFor="input-checkbox"
              className="login__label login__label--s"
            >
              Запам'ятати мене
            </label>
          </div>
          <a href="/" className="login__label login__label--s">
            Нагадати пароль
          </a>
        </div>
        <button type="submit" className="login__button login__button--login">
          Увійти
        </button>
        <p className="login__text">Або</p>
        <button className="login__button login__button--google">
          Увійти з Google
        </button>
        <button className="login__button login__button--create">
          Створити аккаунт
        </button>
      </form>
    </div>
  </div>
);
