import { BackPath } from "../components/BackPath/BackPath";
import { FadeIn } from "../components/FadeIn/FadeIn";

export const TermsOfUse = () => (
  <section className="info">
    <div className="info__box">
      <FadeIn direction="left" delay={0.2}>
        <BackPath />
      </FadeIn>
      <FadeIn direction="left" delay={0.4}>
        <h1 className="info__title">Умови використання</h1>
      </FadeIn>
      <FadeIn direction="left" delay={0.6}>
        <p className="info__text">
          Користуючись нашим сервісом, ви погоджуєтесь з такими умовами:
        </p>
      </FadeIn>
      <FadeIn direction="left" delay={0.8}>
        <div className="info__block-list">
          <ul className="info__list">
            <li className="info__item">
              Ви гарантуєте, що не будете створювати або поширювати події, які
              порушують закон чи права інших користувачів.
            </li>
            <li className="info__item">
              Ви несете відповідальність за інформацію, яку публікуєте.
            </li>
            <li className="info__item">
              Адміністрація FYF має право видаляти контент або акаунти, які
              порушують правила спільноти.
            </li>
            <li className="info__item">
              Ми не несемо відповідальності за зміст і проведення подій, які
              організовують користувачі.
            </li>
          </ul>
        </div>
      </FadeIn>
    </div>
  </section>
);
