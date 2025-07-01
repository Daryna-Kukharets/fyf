import { ReviewCard } from "../ReviewCard/ReviewCard";
import { Stars } from "../Stars/Stars";

export const Reviews = () => {
  return (
    <section id="reviews" className="reviews">
      <h1 className="reviews__title">Відгуки користувачів</h1>
      <div className="reviews__stars">
        <Stars />
        <p className="reviews__count">14 відгуків</p>
      </div>
      <ReviewCard />
      <div className="reviews__buttons">
        <div className="reviews__empty"></div>
        <button type="button" className="reviews__button">
          Переглянути всі відгуки
        </button>
        <button type="button" className="reviews__create">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 9.14286H9.14286V16H6.85714V9.14286H0V6.85714H6.85714V0H9.14286V6.85714H16V9.14286Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};
