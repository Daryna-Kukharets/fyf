import { BackPath } from "../components/BackPath/BackPath";

export const CookieFiles = () => (
  <section className="info">
    <BackPath />
    <h1 className="info__title">Файли cookie</h1>
    <p className="info__text">
      Як і більшість сервісів, ми використовуємо cookie-файли для того, щоб:
    </p>
    <ul className="info__list">
      <li className="info__item">
        Ви гарантуєте, що не будете створювати або поширювати події, які порушують закон чи права інших користувачів.
      </li>
      <li className="info__item">
        Ви несете відповідальність за інформацію, яку публікуєте.
      </li>
      <li className="info__item">
        Адміністрація FYF має право видаляти контент або акаунти, які порушують правила спільноти.
      </li>
      <li className="info__item">
        Ми не несемо відповідальності за зміст і проведення подій, які організовують користувачі.
      </li>
    </ul>
  </section>
);
