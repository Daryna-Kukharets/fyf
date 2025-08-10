import { Stars } from "../Stars/Stars";

type Props = {
  title: string;
  rate: number;
  comment: string;
  userName: string;
  dateTime: string;
};

export const ReviewCard: React.FC<Props> = ({
  title,
  rate,
  comment,
  userName,
  dateTime,
}) => {
    const formattedDate = new Date(dateTime).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="reviewCard">
      <h2 className="reiewCard__title">{title}</h2>
      <div className="reviewCard__stars">
        <Stars size={24} value={rate}/>
      </div>
      <h3 className="reviewCard__name">{userName}</h3>
      <p className="reviewCard__date">{formattedDate}</p>
      <p className="reviewCard__text">
        {comment}
      </p>
    </div>
  );
};
