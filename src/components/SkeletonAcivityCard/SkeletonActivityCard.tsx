export const SkeletonActivityCard = () => {
  return (
    <div className="skeletonActivityCard__list">
      {[1, 2, 3].map((n) => (
        <div className="skeletonActivityCard__card" key={n}>
          <div className="skeletonActivityCard__img skeletonActivityCard__animation"></div>
          <div className="skeletonActivityCard__title skeletonActivityCard__animation"></div>
          <div className="skeletonActivityCard__date skeletonActivityCard__animation"></div>
          <div className="skeletonActivityCard__location skeletonActivityCard__animation"></div>
          <div className="skeletonActivityCard__button skeletonActivityCard__animation"></div>
        </div>
      ))}
    </div>
  );
};
