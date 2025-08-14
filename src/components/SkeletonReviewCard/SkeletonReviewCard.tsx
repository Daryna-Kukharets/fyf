export const SkeletonReviewCard = () => {
    return (
    <div className="skeletonReviewCard__list">
      {[1, 2, 3].map((n) => (
        <div className="skeletonReviewCard__card" key={n}>
          <div className="skeletonReviewCard__title skeletonActivityCard__animation"></div>
          <div className="skeletonReviewCard__stars skeletonActivityCard__animation"></div>
          <div className="skeletonReviewCard__name skeletonActivityCard__animation"></div>
          <div className="skeletonReviewCard__date skeletonActivityCard__animation"></div>
          <div className="skeletonReviewCard__review skeletonActivityCard__animation"></div>
        </div>
      ))}
    </div>
  );
}