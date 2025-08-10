import { FadeIn } from "../FadeIn/FadeIn";

export const AboutUs = () => {
  return (
    <section id="aboutUs" className="aboutUs">
      <FadeIn direction="left" delay={0.2}>
        <h1 className="aboutUs__title">Хто ми?</h1>
      </FadeIn>
      <div className="aboutUs__container">
        <div className="aboutUs__block-first">
          <div className="aboutUs__empty"></div>
          <div className="aboutUs__block-wrapper">
            <FadeIn direction="left" delay={0.4}>
              <div
                style={{
                  transform: "rotate(-3deg)",
                }}
              >
                <p className="aboutUs__text aboutUs__text--1">
                  Це платформа для тих, <br />
                  хто хоче більше від життя.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.5}>
              <p className="aboutUs__text aboutUs__text--2">
                Більше руху, більше знайомств, більше <br />
                веселощів — і все це безкоштовно.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.6}>
              <img
                src="img/aboutUs-fyf.svg"
                alt="Find-Your-Fine"
                className="aboutUs__fyf"
              />
            </FadeIn>

            <FadeIn direction="up" delay={0.7}>
              <p className="aboutUs__text aboutUs__text--3">
                Творімо моменти <br />
                разом
              </p>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={0.4}>
            <a
              href="#activities"
              className="aboutUs__button aboutUs__button--1"
            >
              Переглянути події
            </a>
          </FadeIn>
        </div>
        <div className="aboutUs__block-second">
          <FadeIn direction="left" delay={0.4}>
            <picture>
              <source media="(min-width: 1440px)" srcSet="img/about-us-1.png" />
              <img
                className="aboutUs__img aboutUs__img--1"
                src="img/about-us-1-mobile.png"
                alt="about-us-1"
              />
            </picture>
          </FadeIn>

          <FadeIn direction="right" delay={0.5}>
            <picture>
              <source media="(min-width: 1440px)" srcSet="img/about-us-2.png" />
              <img
                className="aboutUs__img aboutUs__img--2"
                src="img/about-us-2-mobile.png"
                alt="about-us-2"
              />
            </picture>
          </FadeIn>

          <FadeIn direction="up" delay={0.6}>
            <picture>
              <source media="(min-width: 1440px)" srcSet="img/about-us-3.png" />
              <img
                className="aboutUs__img aboutUs__img--3"
                src="img/about-us-3-mobile.png"
                alt="about-us-3"
              />
            </picture>
          </FadeIn>
          <FadeIn direction="up" delay={0.8}>
            <div className="aboutUs__box-logo">
              <img
                src="img/icons/logo.svg"
                alt="logo"
                className="aboutUs__box-logo-img"
              />
            </div>
          </FadeIn>
        </div>
      </div>
      <FadeIn direction="up" delay={1.0}>
        <a href="#activities" className="aboutUs__button aboutUs__button--2">
          Переглянути події
        </a>
      </FadeIn>
    </section>
  );
};
