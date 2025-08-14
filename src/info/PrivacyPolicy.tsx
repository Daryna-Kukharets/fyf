import { BackPath } from "../components/BackPath/BackPath";
import { FadeIn } from "../components/FadeIn/FadeIn";

export const PrivacyPolicy = () => (
  <section className="info">
    <div className="info__box">
      <FadeIn direction="left" delay={0.2}>
        <BackPath />
      </FadeIn>
      <FadeIn direction="left" delay={0.4}>
      <h1 className="info__title">Політика Конфіденційності</h1>
      </FadeIn>
      <FadeIn direction="left" delay={0.6}>
      <p className="info__text">
        Ми поважаємо вашу приватність і прагнемо захищати ваші персональні дані.
      </p>
      </FadeIn>
      <FadeIn direction="left" delay={0.8}>
      <div className="info__block-list">
        <h2 className="info__subtitle">Що ми збираємо:</h2>
        <ul className="info__list">
          <li className="info__item">
            дані, які ви надаєте під час реєстрації (ім’я, email,
            місцезнаходження тощо);
          </li>
          <li className="info__item">
            інформацію про ваші активності на платформі (створені події, участь
            у подіях);
          </li>
          <li className="info__item">
            технічну інформацію (cookies, IP-адреса, тип пристрою).
          </li>
        </ul>
      </div>
      </FadeIn>
      <FadeIn direction="left" delay={1.0}>
      <div className="info__block-list">
        <h2 className="info__subtitle">Як ми використовуємо ваші дані:</h2>
        <ul className="info__list">
          <li className="info__item">
            для надання та покращення наших послуг;
          </li>
          <li className="info__item">
            для комунікації з вами (оновлення, новини, сповіщення);
          </li>
          <li className="info__item">для аналітики і статистики.</li>
        </ul>
      </div>
      </FadeIn>
      <FadeIn direction="left" delay={1.2}>
      <div className="info__block-list">
        <h2 className="info__subtitle">Ваші права:</h2>
        <ul className="info__list">
          <li className="info__item">
            перегляд, редагування та видалення своїх даних;
          </li>
          <li className="info__item">відмова від розсилок у будь-який час.</li>
        </ul>
      </div>
      </FadeIn>
    </div>
  </section>
);
