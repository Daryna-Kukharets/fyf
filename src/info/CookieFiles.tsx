import { BackPath } from "../components/BackPath/BackPath";
import { FadeIn } from "../components/FadeIn/FadeIn";

export const CookieFiles = () => (
  <section className="info">
    <div className="info__box">
      <FadeIn direction="left" delay={0.2}>
        <BackPath />
      </FadeIn>
      <FadeIn direction="left" delay={0.4}>
        <h1 className="info__title">Файли cookie</h1>
      </FadeIn>
      <FadeIn direction="left" delay={0.6}>
        <p className="info__text">
          Як і більшість сервісів, ми використовуємо cookie-файли для того, щоб:
        </p>
      </FadeIn>
      <FadeIn direction="left" delay={0.8}>
        <div className="info__block-list">
          <ul className="info__list">
            <li className="info__item">забезпечити коректну роботу сайту;</li>
            <li className="info__item">запам’ятовувати ваші налаштування;</li>
            <li className="info__item">
              збирати аналітику для покращення користувацького досвіду.
            </li>
          </ul>
        </div>
      </FadeIn>
    </div>
  </section>
);
