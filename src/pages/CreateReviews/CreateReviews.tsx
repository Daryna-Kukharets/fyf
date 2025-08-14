import { useState } from "react";
import { BackPath } from "../../components/BackPath/BackPath";
import { Stars } from "../../components/Stars/Stars";
import { useAuthStore } from "../../store/authStore";
import { sendReview } from "../../api/auth";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { FadeIn } from "../../components/FadeIn/FadeIn";

export const CreateReviews = () => {
  const user = useAuthStore((state) => state.user);
  const [activity, setActivity] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    activity?: string;
    review?: string;
    rating?: string;
  }>({});

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: typeof formErrors = {};

    if (!activity.trim()) {
      errors.activity = "Введіть назву активності";
    }

    if (!review.trim()) {
      errors.review = "Напишіть відгук";
    }

    if (rating === 0) {
      errors.rating = "Оцініть активність";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const payload = { title: activity, rate: rating, comment: review };

    try {
      setLoading(true);

      await sendReview(payload);

      setActivity("");
      setReview("");
      setRating(0);
      navigate("/#reviews");
    } catch (err: any) {
      setFormErrors({
        ...formErrors,
        activity: "Щось пішло не так. Спробуйте ще раз.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="createReviews">
      <FadeIn direction="left" delay={0.2}>
        <BackPath />
      </FadeIn>
      <FadeIn direction="left" delay={0.4}>
        <h1 className="createReviews__title">Залишити відгук</h1>
      </FadeIn>
      {loading && <Loader />}

      <FadeIn direction="left" delay={0.6}>
        <div className="createReviews__stars">
          <Stars
            value={rating}
            onSelect={(val) => {
              setRating(val);
              if (formErrors.rating) {
                setFormErrors((prev) => ({ ...prev, rating: undefined }));
              }
            }}
            interactive={true}
          />
          {formErrors.rating && (
            <p className="createReviews__error createReviews__error--stars">
              {formErrors.rating}
            </p>
          )}
        </div>
      </FadeIn>
      <FadeIn direction="left" delay={0.8}>
        <form className="createReviews__form" onSubmit={handleSubmit}>
          <label className="createReviews__label">
            Ім'я
            <input
              type="text"
              className="createReviews__input"
              value={user?.firstName || ""}
              readOnly
            />
          </label>
          <label className="createReviews__label">
            Назва активності
            <input
              type="text"
              className={`createReviews__input ${formErrors.activity && "createReviews__input--error"}`}
              value={activity}
              onChange={(e) => {
                setActivity(e.target.value);
                if (formErrors.activity) {
                  setFormErrors((prev) => ({ ...prev, activity: undefined }));
                }
              }}
            />
            {formErrors.activity && (
              <p className="createReviews__error">{formErrors.activity}</p>
            )}
          </label>
          <label className="createReviews__label">
            Відгук
            <textarea
              className={`createReviews__textarea ${formErrors.review && "createReviews__textarea--error"}`}
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
                if (formErrors.review) {
                  setFormErrors((prev) => ({ ...prev, review: undefined }));
                }
              }}
              placeholder="Ваші враження від активності..."
              rows={5}
            ></textarea>
            {formErrors.review && (
              <p className="createReviews__error">{formErrors.review}</p>
            )}
          </label>

          <button type="submit" className="createReviews__button">
            Відправити
          </button>
        </form>
      </FadeIn>
    </section>
  );
};
