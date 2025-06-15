type StarsProps = {
  size?: number;
};

export const Stars: React.FC<StarsProps> = ({ size = 44 }) => {
  const starsCount = 5;

  return (
    <div className="stars__box">
      <div className="stars__container">
        {Array.from({ length: starsCount }).map((_, index) => (
        <svg
          key={index}
          width={size}
          height={size}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.455 18.3334L23.76 9.46006C23.2283 7.71839 20.7717 7.71839 20.2583 9.46006L17.545 18.3334H9.38667C7.60834 18.3334 6.87501 20.6251 8.32334 21.6517L14.9967 26.4184L12.375 34.8701C11.8433 36.5751 13.8233 37.9501 15.235 36.8684L22 31.7351L28.765 36.8867C30.1767 37.9684 32.1567 36.5934 31.625 34.8884L29.0033 26.4367L35.6767 21.6701C37.125 20.6251 36.3917 18.3517 34.6133 18.3517H26.455V18.3334Z"
            fill="#FE7062"
          />
        </svg>
        ))}
      </div>
    </div>
  );
};
