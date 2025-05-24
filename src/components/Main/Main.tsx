export const Main = () => (
  <div className="main">
    <h1 className="main__title">Знаходь. Відвідуй. Створюй.</h1>
    <div className="main__image-box">
      <img
        src="img/main-image.svg"
        alt="main-image"
        className="main__img"
      />
      <div className="main__buttons">
        <a href="/" className="main__button">
          <img
            src="img/icons/calendar.svg"
            alt="calendar"
            className="main__icon-calendar"
            />
        </a>
        <a href="/" className="main__button">
          <img
            src="img/icons/plus.svg"
            alt="create"
            className="main__icon-plus"
          />
        </a>
      </div>
    </div>
  </div>
)