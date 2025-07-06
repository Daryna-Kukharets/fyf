import { Link } from "react-router-dom";
import { BackPath } from "../../components/BackPath/BackPath";
import { ProfileTop } from "../../components/ProfileTop/ProfileTop";
import { ActivityCard } from "../../components/ActivityCard/ActivityCard";

export const Plans = () => {
  return (
    <div className="plans">
      <BackPath />
      <ProfileTop />
      <ActivityCard mode="plans" />
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
    </div>
  );
};
