import { useState } from "react";

type StarsProps = {
  size?: number;
  value?: number;
  onSelect?: (value: number) => void;
  interactive?: boolean; // додаємо проп
};

export const Stars: React.FC<StarsProps> = ({
  size = 24,
  value = 0,
  onSelect,
  interactive = false,
}) => {
  const starsCount = 5;
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | null>(
    interactive ? value || null : null
  );

  const handleClick = (index: number) => {
    if (!interactive) return; // якщо не інтерактивні — ігноруємо клік
    const rating = index + 1;
    setSelectedStar(rating);
    onSelect?.(rating);
  };

  return (
    <div className="stars__box">
      <div className="stars__container">
        {Array.from({ length: starsCount }).map((_, index) => {
          const current = index + 1;

          let fillColor = "#D0D5DD"; // сіра

          if (interactive && hoveredStar !== null) {
            // ховер тільки якщо інтерактивно
            fillColor = current <= hoveredStar ? "#FE7062" : "#D0D5DD";
          } else {
            // якщо не інтерактивно — показуємо рейтинг по value з частковими зірками
            if (value && current <= Math.floor(value)) {
              fillColor = "#FE7062";
            } else if (value && current - value < 1 && current - value > 0) {
              fillColor = "url(#partialFill)";
            }
          }

          return (
            <svg
              key={index}
              width={size}
              height={size}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="stars__star"
              style={{ cursor: interactive ? "pointer" : "default" }}
              onMouseEnter={() => interactive && setHoveredStar(current)}
              onMouseLeave={() => interactive && setHoveredStar(null)}
              onClick={() => handleClick(index)}
            >
              <defs>
                <linearGradient id="partialFill">
                  <stop
                    offset={`${(value - Math.floor(value)) * 100}%`}
                    stopColor="#FE7062"
                  />
                  <stop
                    offset={`${(value - Math.floor(value)) * 100}%`}
                    stopColor="#D0D5DD"
                  />
                </linearGradient>
              </defs>
              <path
                d="M14.43 9.99977L12.96 5.15977C12.67 4.20977 11.33 4.20977 11.05 5.15977L9.57 9.99977H5.12C4.15 9.99977 3.75 11.2498 4.54 11.8098L8.18001 14.4098L6.75 19.0198C6.46 19.9498 7.54001 20.6998 8.31001 20.1098L12 17.3098L15.69 20.1198C16.46 20.7098 17.54 19.9598 17.25 19.0298L15.82 14.4198L19.46 11.8198C20.25 11.2498 19.85 10.0098 18.88 10.0098H14.43V9.99977Z"
                fill={fillColor}
              />
            </svg>
          );
        })}
      </div>
    </div>
  );
};
