import { Stars } from "../Stars/Stars";

export const ReviewCard = () => {
  return (
    <div className="reviewCard">
      <h2 className="reiewCard__title">Пляжний волейбол</h2>
      <div className="reviewCard__stars">
        <Stars size={24} />
      </div>
      <h3 className="reviewCard__name">Роман</h3>
      <p className="reviewCard__date">7 травня 2025</p>
      <p className="reviewCard__text">
        Чудовий колектив, Андрій який створив цю активність він часто збирає
        людей, тому все було чудово та классно підібране місце, рекомендую!
      </p>
    </div>
  );
};
