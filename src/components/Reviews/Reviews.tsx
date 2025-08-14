import { Link } from "react-router-dom";
import { ReviewCard } from "../ReviewCard/ReviewCard";
import { Stars } from "../Stars/Stars";
import { useEffect, useState } from "react";
import { getReview } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";
import { PortalError } from "../PortalError/PortalError";
import { FadeIn } from "../FadeIn/FadeIn";
import { SkeletonActivityCard } from "../SkeletonAcivityCard/SkeletonActivityCard";
import { SkeletonReviewCard } from "../SkeletonReviewCard/SkeletonReviewCard";

type Review = {
  id: number;
  title: string;
  rate: number;
  comment: string;
  user: {
    firstName: string;
  };
  dateTime: string;
};

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [showError, setShowError] = useState(false);

  const token = useAuthStore((state) => state.token);
  const isAuthenticated = Boolean(token);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rate, 0) / reviews.length
      : 0;

  useEffect(() => {
    const cached = localStorage.getItem("reviews");
    if (cached) {
      setReviews(JSON.parse(cached));
      setLoading(false);
    }

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await getReview();
        const data = response.content || [];
        localStorage.setItem("reviews", JSON.stringify(data));
        setReviews(response.content || []);
      } catch (err) {
        setError("Помилка завантаження відгуків");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleCreateClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowError(true);
    }
  };

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section id="reviews" className="reviews">
      <FadeIn direction="left" delay={0.2}>
        <h1 className="reviews__title">Відгуки користувачів</h1>
      </FadeIn>
      <div className="reviews__stars">
        <FadeIn direction="left" delay={0.4}>
          <Stars value={averageRating} />
        </FadeIn>
        <FadeIn direction="right" delay={0.4}>
          <p className="reviews__count">{`${reviews.length} відгуків`}</p>
        </FadeIn>
      </div>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <SkeletonReviewCard />
      ) : (
        <>
          <div className="reviews__list">
            {visibleReviews.map((review, index) => (
              <FadeIn direction="up" key={review.id} delay={index * 0.1}>
                <div className="reviews__card">
                  <ReviewCard
                    title={review.title}
                    rate={review.rate}
                    comment={review.comment}
                    userName={review.user.firstName}
                    dateTime={review.dateTime}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="reviews__buttons">
            <div className="reviews__empty"></div>
            {reviews.length > 3 && !loading && (
              <FadeIn direction="up" delay={0.2}>
                <button
                  type="button"
                  className="reviews__button"
                  onClick={() => setShowAll((prev) => !prev)}
                >
                  {showAll ? "Згорнути відгуки" : "Переглянути всі відгуки"}
                </button>
              </FadeIn>
            )}
            <FadeIn direction="right" delay={0.2}>
              <Link
                to={isAuthenticated ? "/reviews" : "#"}
                className="reviews__create"
                onClick={handleCreateClick}
                title={
                  !isAuthenticated
                    ? "Щоб створити активність, потрібно увійти"
                    : undefined
                }
              >
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
              </Link>
            </FadeIn>
          </div>
        </>
      )}

      {showError && <PortalError onClose={() => setShowError(false)} />}
    </section>
  );
};
