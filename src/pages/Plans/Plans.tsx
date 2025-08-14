import { Link } from "react-router-dom";
import { BackPath } from "../../components/BackPath/BackPath";
import { ProfileTop } from "../../components/ProfileTop/ProfileTop";
import { ActivityCard } from "../../components/ActivityCard/ActivityCard";
import { useEffect, useState } from "react";
import { getMyActivities, refuseActivity } from "../../api/auth";
import { Loader } from "../../components/Loader/Loader";
import { SkeletonActivityCard } from "../../components/SkeletonAcivityCard/SkeletonActivityCard";
import { FadeIn } from "../../components/FadeIn/FadeIn";

export const Plans = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem("myActivities");
    if (cached) {
      setActivities(JSON.parse(cached));
      setLoading(false);
    }

    const fetchMyActivities = async () => {
      try {
        const response = await getMyActivities();
        const data = response?.content || [];
        setActivities(data);
        localStorage.setItem("myActivities", JSON.stringify(data));
      } catch (error: any) {
        console.error("Не вдалося отримати активності:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyActivities();
  }, []);

  const handleCancel = async (activityId: number) => {
    try {
      await refuseActivity(activityId);
      const updated = activities.filter((a) => a.id !== activityId);
      setActivities(updated);
      localStorage.setItem("myActivities", JSON.stringify(updated));
    } catch (err) {
      console.error("Не вдалося скасувати запис", err);
    }
  };

  return (
    <div className="plans">
      <FadeIn direction="left" delay={0.2}>
        <BackPath />
      </FadeIn>
      <FadeIn direction="left" delay={0.4}>
        <ProfileTop />
      </FadeIn>
      {loading ? (
        <SkeletonActivityCard />
      ) : activities.length === 0 ? (
        <p>Ви ще не записані на жодну активність.</p>
      ) : (
        <>
          <div className="plans__list">
            {activities.map((activity, index) => (
              <FadeIn
                key={activity.id}
                direction="left"
                delay={0.1 * index + 0.5}
              >
                <div className="plans__card">
                  <ActivityCard
                    activity={activity}
                    mode="plans"
                    onCancel={handleCancel}
                  />
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="right" delay={0.4}>
            <div className="plans__box">
              <Link to="/create-activity" className="plans__button">
                <picture>
                  <source
                    media="(min-width: 1440px)"
                    srcSet="img/icons/create-activity-desk.svg"
                  />
                  <img
                    className="plans__create"
                    src="img/icons/create-activity-mobile.svg"
                    alt="create activity"
                  />
                </picture>
              </Link>
                <p className="plans__text">Створити подію</p>
            </div>
          </FadeIn>
        </>
      )}
    </div>
  );
};
