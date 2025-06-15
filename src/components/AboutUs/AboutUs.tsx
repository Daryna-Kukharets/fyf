export const AboutUs = () => {
  return (
    <div id="aboutUs" className="aboutUs">
      <h1 className="aboutUs__title">Хто ми?</h1>
      <div className="aboutUs__container">
        <div className="aboutUs__block-wrapper">
          <div className="aboutUs__block-first">
            <p className="aboutUs__text aboutUs__text--1">
              Це платформа для тих, <br />
              хто хоче більше від життя.
            </p>
            <p className="aboutUs__text aboutUs__text--2">
              Більше руху, більше знайомств, більше <br />
              веселощів — і все це
              безкоштовно.
            </p>
            <img
              src="img/aboutUs-fyf.svg"
              alt="Find-Your-Fine"
              className="aboutUs__fyf"
            />
            <p className="aboutUs__text aboutUs__text--3">
              Творімо моменти <br />
              разом
            </p>
          
          </div>
            <button type="button" className="aboutUs__button">
              <a href="#" className="aboutUs__button-link">
                Переглянути події
              </a>
            </button>
        </div>
        <div className="aboutUs__block-second">
          <img 
            className="aboutUs__img aboutUs__img--1"
            src="img/about-us-1.png" 
            alt="about-us-1" 
          />
          <img 
            className="aboutUs__img aboutUs__img--2"
            src="img/about-us-2.png" 
            alt="about-us-2" 
          />
          <img 
            className="aboutUs__img aboutUs__img--3"
            src="img/about-us-3.png" 
            alt="about-us-3" 
          />
          <div className="aboutUs__box-logo">
            <img src="img/icons/logo.svg" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};
