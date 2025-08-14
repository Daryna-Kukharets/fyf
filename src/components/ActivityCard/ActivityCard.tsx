import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { participateInActivity, refuseActivity } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";
import { PortalError } from "../PortalError/PortalError";
import { Loader } from "../Loader/Loader";

type Activity = {
  id: number;
  name: string;
  localDateTime: string;
  local: string;
  imgId: number;
  category: string;
  format: string;
  forWho: string;
  numberOfPeople: number;
  currentNumberOfPeople: number;
  author: {
    firstName: string;
    lastName: string;
  };
  participants: {
    email: "string";
    photoPath: "string";
  }[];
};

type Props = {
  mode: string;
  activity: Activity;
  onCancel?: (id: number) => void;
};

export const ActivityCard: React.FC<Props> = ({ mode, activity, onCancel }) => {
  const isActivity = mode === "activity";
  const tokenData = JSON.parse(localStorage.getItem("auth-storage") || "{}");
  const currentUserEmail = tokenData?.state?.user?.email;

  const [isLoading, setIsLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(() => {
    return activity.participants?.some((p) => p.email === currentUserEmail);
  });
  const [currentParticipantsCount, setCurrentParticipantsCount] = useState(
    activity.currentNumberOfPeople
  );
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = Boolean(token);

  const dateTime = new Date(activity.localDateTime);
  dateTime.setHours(dateTime.getHours() + 3);

  const formattedDate = dateTime.toLocaleString("uk-UA", {
    weekday: "short",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });


  const handleParticipate = async () => {
    if (!isAuthenticated) {
      setShowError(true);
      return;
    }

    try {
      setIsLoading(true);
      await participateInActivity(activity.id);
      setIsJoined(true);
      setCurrentParticipantsCount((prev) => prev + 1);
    } catch (error: any) {
      console.log("Не вдалося записатися: " + (error?.message || "помилка"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (location.pathname === "/plans") {
      const searchParams = new URLSearchParams();
      searchParams.set("activityId", activity.id.toString());

      navigate({
        pathname: "/participants",
        search: `?${searchParams.toString()}`,
      });
    }
  };

  const handleCancel = async () => {
    try {
      setIsLoading(true);
      await refuseActivity(activity.id);
      setIsJoined(false);
      setCurrentParticipantsCount((prev) => Math.max(prev - 1, 0)); // Зменшити кількість
      console.log("Запис скасовано!");
    } catch (error: any) {
      console.log(
        "Не вдалося скасувати запис: " + (error?.message || "помилка")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const img = new Image();

    img.src = `img/activity/activity-${activity.imgId}.png`;
    
    img.onload = () => {
      setIsLoading(true);
    }

    img.onerror = () => {
      setIsLoading(true);
    };
  }, [activity.imgId]);

  if(!isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className="activityCard">
        <div className="activityCard__img-box">
          <img
            className="activityCard__img"
            src={`img/activity/activity-${activity.imgId}.png`}
            alt={activity.name}
          />
          {isActivity && (
            <div className="activityCard__participants">
              {currentParticipantsCount} / {activity.numberOfPeople}
            </div>
          )}
        </div>
        <div className="activityCard__info-box">
          <h2 className="activityCard__subtitle">{activity.name}</h2>
          <div className="activityCard__info">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="activityCard__icon"
            >
              <path
                d="M8 13.885C7.79333 13.885 7.61333 13.8084 7.46 13.655C7.30667 13.5017 7.23 13.3217 7.23 13.115C7.23 12.9084 7.30667 12.7287 7.46 12.576C7.61333 12.4234 7.79333 12.3467 8 12.346C8.20667 12.3454 8.38667 12.422 8.54 12.576C8.69333 12.73 8.77 12.91 8.77 13.116C8.77 13.322 8.69333 13.5017 8.54 13.655C8.38667 13.8084 8.20667 13.885 8 13.885ZM12 13.885C11.7933 13.885 11.6133 13.8084 11.46 13.655C11.3067 13.5017 11.23 13.3217 11.23 13.115C11.23 12.9084 11.3067 12.7287 11.46 12.576C11.6133 12.4234 11.7933 12.3467 12 12.346C12.2067 12.3454 12.3867 12.422 12.54 12.576C12.6933 12.73 12.77 12.91 12.77 13.116C12.77 13.322 12.6933 13.5017 12.54 13.655C12.3867 13.8084 12.2067 13.885 12 13.885ZM16 13.885C15.7933 13.885 15.6133 13.8084 15.46 13.655C15.3067 13.5017 15.23 13.3217 15.23 13.115C15.23 12.9084 15.3067 12.7287 15.46 12.576C15.6133 12.4234 15.7933 12.3467 16 12.346C16.2067 12.3454 16.3867 12.422 16.54 12.576C16.6933 12.73 16.77 12.91 16.77 13.116C16.77 13.322 16.6933 13.5017 16.54 13.655C16.3867 13.8084 16.2067 13.885 16 13.885ZM5.616 21C5.15533 21 4.771 20.846 4.463 20.538C4.155 20.23 4.00067 19.8457 4 19.385V6.61502C4 6.15502 4.15433 5.77102 4.463 5.46302C4.77167 5.15502 5.156 5.00069 5.616 5.00002H7.385V2.77002H8.462V5.00002H15.616V2.77002H16.616V5.00002H18.385C18.845 5.00002 19.2293 5.15435 19.538 5.46302C19.8467 5.77169 20.0007 6.15602 20 6.61602V19.385C20 19.845 19.846 20.2294 19.538 20.538C19.23 20.8467 18.8453 21.0007 18.384 21H5.616ZM5.616 20H18.385C18.5383 20 18.6793 19.936 18.808 19.808C18.9367 19.68 19.0007 19.5387 19 19.384V10.616H5V19.385C5 19.5384 5.064 19.6794 5.192 19.808C5.32 19.9367 5.461 20.0007 5.615 20"
                fill="#979797"
              />
            </svg>
            <p className="activityCard__text activityCard__text--date">
              {formattedDate}
            </p>
          </div>
          {!isActivity && (
            <div
              className="activityCard__img-box activityCard__participants-box"
              onClick={handleClick}
            >
              {activity.participants.slice(0, 4).map((participant, index) => (
                <img
                  key={index}
                  src={participant.photoPath || "img/icons/take-photo.svg"}
                  alt={participant.email}
                  className="activityCard__person-img"
                />
              ))}
              {activity.participants.length > 4 && (
                <div className="activityCard__extra-participants">
                  +{activity.participants.length - 4}
                </div>
              )}
            </div>
          )}
          <div className="activityCard__info">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="activityCard__icon"
            >
              <path
                d="M12.004 11.73C12.4487 11.73 12.8287 11.5717 13.144 11.255C13.4593 10.9383 13.6167 10.5573 13.616 10.112C13.6153 9.66667 13.4567 9.28667 13.14 8.972C12.8233 8.65733 12.4423 8.5 11.997 8.5C11.5517 8.5 11.1717 8.65867 10.857 8.976C10.5423 9.29333 10.385 9.67433 10.385 10.119C10.385 10.5637 10.5433 10.9437 10.86 11.259C11.1767 11.5743 11.558 11.7317 12.004 11.731M12 21.019C9.64999 18.941 7.87999 17.003 6.68999 15.205C5.49933 13.407 4.90399 11.7707 4.90399 10.296C4.90399 8.18067 5.59266 6.436 6.96999 5.062C8.34799 3.68733 10.0247 3 12 3C13.9753 3 15.652 3.68733 17.03 5.062C18.4073 6.436 19.096 8.18067 19.096 10.296C19.096 11.7707 18.501 13.407 17.311 15.205C16.1203 17.003 14.35 18.941 12 21.019Z"
                fill="#110875"
              />
            </svg>
            <p className="activityCard__text activityCard__text--location">
              {activity.local || "Завантаження адреси..."}
            </p>
          </div>
        </div>
        {isActivity ? (
          <button
            type="button"
            className={`activityCard__button ${
              isJoined ? "activityCard__button--cancel" : ""
            }`}
            onClick={isJoined ? handleCancel : handleParticipate}
            disabled={isLoading}
            title={
              !isAuthenticated
                ? "Щоб створити активність, потрібно увійти"
                : undefined
            }
          >
            {isLoading
              ? "Завантаження..."
              : isJoined
              ? "Скасувати запис"
              : "Записатися"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onCancel?.(activity.id)}
            disabled={isLoading}
            className="activityCard__button activityCard__button--cancel"
          >
            {isLoading ? "Завантаження..." : "Скасувати запис"}
          </button>
        )}
      </div>

      {showError && <PortalError onClose={() => setShowError(false)} />}
    </>
  );
};
