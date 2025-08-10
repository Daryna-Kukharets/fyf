import { Link } from "react-router-dom";
import { BackPath } from "../../components/BackPath/BackPath";
import { ProfileTop } from "../../components/ProfileTop/ProfileTop";
import { ActivityCard } from "../../components/ActivityCard/ActivityCard";
import { useEffect, useState } from "react";
import { getMyActivities, refuseActivity } from "../../api/auth";
import { Loader } from "../../components/Loader/Loader";

export const Plans = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMyActivities = async () => {
      try {
        setIsLoading(true);
        const response = await getMyActivities();
        setActivities(response?.content || []);
      } catch (error: any) {
        console.error("Не вдалося отримати активності:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyActivities();
  }, []);

  const handleCancel = async (activityId: number) => {
    try {
      await refuseActivity(activityId);
      setActivities((prev) => prev.filter((a) => a.id !== activityId));
    } catch (err) {
      console.error("Не вдалося скасувати запис", err);
    }
  };

  return (
    <div className="plans">
      <BackPath />
      <ProfileTop />
      {!isLoading && activities.length === 0 && (
        <p>Ви ще не записані на жодну активність.</p>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              mode="plans"
              onCancel={handleCancel}
            />
          ))}
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
        </>
      )}

      
    </div>
  );
};
