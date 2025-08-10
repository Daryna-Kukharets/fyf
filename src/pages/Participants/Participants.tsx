import { useEffect, useState } from "react";
import { BackPath } from "../../components/BackPath/BackPath";
import { getMyActivities } from "../../api/auth";
import { useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

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

  // Витягуємо activityId з URL
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

  // Учасники для відображення (якщо немає активності — порожній масив)
  const participants = currentActivity?.participants || [];
  const authorId = currentActivity?.author?.id;
  return (
    <div className="participants">
      <BackPath />
      <h1 className="participants__title">Список учасників</h1>
      {isLoading ? (
        <Loader />
      ) : (
        participants.map((participant) => {
          const isAuthor = participant.id === authorId;
          return (
            <div className="participants__card" key={participant.id}>
              {isAuthor && <div className="participants__main"></div>}
              <img
                src={participant.photoPath || "img/icons/take-photo.svg"}
                alt="photo"
                className="participants__img"
              />
              <div className="participants__info">
                <h3 className="participants__name">{participant.firstName}</h3>
                <p className="participants__phone">{participant.phoneNumber}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
