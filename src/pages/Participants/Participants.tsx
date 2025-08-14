import { useEffect, useState } from "react";
import { BackPath } from "../../components/BackPath/BackPath";
import { getMyActivities } from "../../api/auth";
import { useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { FadeIn } from "../../components/FadeIn/FadeIn";

type Participant = {
  id: number;
  firstName: string;
  phoneNumber: string;
  photoPath: string;
};

type Activity = {
  id: number;
  name: string;
  participants: Participant[];
  author?: {
    id: number;
  };
};

export const Participants = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const activityId = searchParams.get("activityId");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setIsLoading(true);
        const response = await getMyActivities();
        const allActivities: Activity[] = response?.content || [];
        setActivities(allActivities);
      } catch (error) {
        console.error("Не вдалося отримати учасників:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const currentActivity = activities.find(
    (activity) => activity.id === Number(activityId)
  );

  const participants = currentActivity?.participants || [];
  const authorId = currentActivity?.author?.id;

  return (
    <div className="participants">
      <FadeIn direction="left" delay={0.2}>
        <BackPath />
      </FadeIn>
      <FadeIn direction="left" delay={0.4}>
        <h1 className="participants__title">Список учасників</h1>
      </FadeIn>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="participants__list">
          {participants.map((participant, index) => {
            const isAuthor = participant.id === authorId;
            return (
              <FadeIn
                key={participant.id}
                direction="left"
                delay={0.1 * index + 0.5}
              >
                <div className="participants__card">
                  {isAuthor && <div className="participants__main"></div>}
                  <img
                    src={participant.photoPath || "img/icons/take-photo.svg"}
                    alt="photo"
                    className="participants__img"
                  />
                  <div className="participants__info">
                    <h3 className="participants__name">
                      {participant.firstName}
                    </h3>
                    <p className="participants__phone">
                      {participant.phoneNumber}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      )}
    </div>
  );
};
