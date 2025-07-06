import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

export const ProfileTop = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  return (
    <div className="profileTop__nav">
      <Link to="/profile" className={classNames("profileTop__title", { "profileTop__title--active": isProfilePage })}>
        Профіль
      </Link>
      <Link to="/plans" className={classNames("profileTop__title", { "profileTop__title--active": !isProfilePage })}>
        Записи
      </Link>
    </div>
  );
};