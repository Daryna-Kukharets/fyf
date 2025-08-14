import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { categories } from "../../types/Categories";
import { CalendarPicker } from "../CalendarPicker/CalendarPicker";
import { LocationPicker } from "../LocationPicker/LocationPicker";
import { FadeIn } from "../FadeIn/FadeIn";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { useActivityStore } from "../../store/useActivityStore";
import { KyivDistrict, kyivDistricts } from "../../types/KyivDistrict";
import { useAuthStore } from "../../store/authStore";
import { PortalError } from "../PortalError/PortalError";

export const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { setAddress, setCategory, setDate } = useActivityStore();
  const navigate = useNavigate();

  const category = searchParams.get("category") || "";
  const locationFromParams = searchParams.get("location") || "";
  const dateFromParams = searchParams.get("date") || "";

  const [location, setLocation] = useState({
    address: locationFromParams,
    lat: 0,
    lng: 0,
  });

  const [localDate, setLocalDate] = useState<Date | null>(
    dateFromParams ? new Date(dateFromParams) : null
  );

  const [showError, setShowError] = useState(false);

  const token = useAuthStore((state) => state.token);
  const isAuthenticated = Boolean(token);

  const extractDistrict = (address: string): KyivDistrict => {
    const found = kyivDistricts.find((district) => {
      if (!district.value) {
        return false;
      }

      const includes = address.includes(district.value);

      return includes;
    });
    return found?.value || "";
  };

  const [openSelect, setOpenSelect] = useState<string | null>(null);
  const toggleSelect = (key: string) => {
    setOpenSelect((prev) => (prev === key ? null : key));
  };
  const handleChangeAndClose = (key: string, value: string) => {
    handleFilterChange(key, value);
    setOpenSelect(null);
  };

  const handleCreate = () => {
    if (!isAuthenticated) {
      setShowError(true);
      return;
    }

    setAddress(location);
    setCategory(category);
    setDate(localDate);
    navigate("/create-activity");
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  };

  return (
    <section id="home" className="main">
      <div className="main__box">
        <div className="main__blocks">
          <div className="main__block-first">
            <FadeIn direction="left" delay={0.4}>
              <h1 className="main__title">Поїхали!</h1>
            </FadeIn>
            <FadeIn direction="left" delay={0.6}>
              <p className="main__text">
                Створюй, або шукай активності в своєму місті
              </p>
            </FadeIn>
            <FadeIn direction="left" delay={0.8}>
              <form className="main__form">
                <div className="main__input-container">
                  <div className="main__input-box">
                    <LocationPicker
                      value={location.address}
                      onChange={(newLocation) => {
                        setLocation(newLocation);

                        const district = extractDistrict(newLocation.address);
                        handleFilterChange("location", district);
                      }}
                    />
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="main__input-img"
                    >
                      <path
                        d="M12.004 12.23C12.4487 12.23 12.8287 12.0717 13.144 11.755C13.4593 11.4383 13.6167 11.0573 13.616 10.612C13.6153 10.1667 13.4567 9.78667 13.14 9.472C12.8233 9.15733 12.4423 9 11.997 9C11.5517 9 11.1717 9.15867 10.857 9.476C10.5423 9.79333 10.385 10.1743 10.385 10.619C10.385 11.0637 10.5433 11.4437 10.86 11.759C11.1767 12.0743 11.558 12.2317 12.004 12.231M12 21.519C9.64999 19.441 7.87999 17.503 6.68999 15.705C5.49933 13.907 4.90399 12.2707 4.90399 10.796C4.90399 8.68067 5.59266 6.936 6.96999 5.562C8.34799 4.18733 10.0247 3.5 12 3.5C13.9753 3.5 15.652 4.18733 17.03 5.562C18.4073 6.936 19.096 8.68067 19.096 10.796C19.096 12.2707 18.501 13.907 17.311 15.705C16.1203 17.503 14.35 19.441 12 21.519Z"
                        fill="#4D4FFA"
                      />
                    </svg>
                  </div>
                  <div className="main__input-box">
                    <CustomSelect
                      options={categories.slice(1)}
                      onChange={(val) => {
                        setCategory(val);
                        handleChangeAndClose("category", val);
                      }}
                      value={category}
                      classFor={"custom-select__header"}
                      placeholder="Активність:"
                      place="main"
                        isOpen={openSelect === "category"}
                      onToggle={() => toggleSelect("category")}
                    />
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="main__input-img"
                    >
                      <path
                        d="M20.812 10.604L12.5 5.70599V3.51199C14.55 3.62199 16.334 4.33432 17.852 5.64899C19.37 6.96365 20.3566 8.61532 20.812 10.604ZM6.88396 14.9V5.11499C7.54729 4.64165 8.24696 4.27699 8.98296 4.02099C9.71829 3.76432 10.5593 3.59432 11.506 3.51099V12.213L6.88396 14.9ZM3.95796 16.567C3.63196 15.947 3.38762 15.2943 3.22496 14.609C3.06229 13.9237 2.98096 13.2207 2.98096 12.5C2.98096 11.2427 3.22362 10.052 3.70896 8.92799C4.19562 7.80399 4.92062 6.80099 5.88396 5.91899V15.467L3.95796 16.567ZM8.14596 20.627C7.36929 20.255 6.67196 19.8063 6.05396 19.281C5.43596 18.755 4.90396 18.137 4.45796 17.427L12.006 13.073L16.646 15.76L8.14596 20.627ZM12.006 21.5C11.546 21.5 11.0933 21.4727 10.648 21.418C10.2033 21.364 9.77196 21.255 9.35396 21.091L17.646 16.333L19.554 17.415C18.7066 18.6897 17.6216 19.689 16.299 20.413C14.9763 21.137 13.5453 21.4993 12.006 21.5ZM20.029 16.542L12.5 12.214V6.84599L20.98 11.841C21.0193 12.6583 20.966 13.466 20.82 14.264C20.6733 15.0613 20.4096 15.8207 20.029 16.542Z"
                        fill="#4D4FFA"
                      />
                    </svg>
                  </div>
                  <div className="main__input-box">
                    <CalendarPicker
                      date={localDate}
                      setDate={(date) => {
                        setLocalDate(date);
                        handleFilterChange(
                          "date",
                          date?.toISOString().split("T")[0] || ""
                        );
                      }}
                    />
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="main__input-img"
                    >
                      <path
                        d="M8 14.385C7.79333 14.385 7.61333 14.3084 7.46 14.155C7.30667 14.0017 7.23 13.8217 7.23 13.615C7.23 13.4084 7.30667 13.2287 7.46 13.076C7.61333 12.9234 7.79333 12.8467 8 12.846C8.20667 12.8454 8.38667 12.922 8.54 13.076C8.69333 13.23 8.77 13.41 8.77 13.616C8.77 13.822 8.69333 14.0017 8.54 14.155C8.38667 14.3084 8.20667 14.385 8 14.385ZM12 14.385C11.7933 14.385 11.6133 14.3084 11.46 14.155C11.3067 14.0017 11.23 13.8217 11.23 13.615C11.23 13.4084 11.3067 13.2287 11.46 13.076C11.6133 12.9234 11.7933 12.8467 12 12.846C12.2067 12.8454 12.3867 12.922 12.54 13.076C12.6933 13.23 12.77 13.41 12.77 13.616C12.77 13.822 12.6933 14.0017 12.54 14.155C12.3867 14.3084 12.2067 14.385 12 14.385ZM16 14.385C15.7933 14.385 15.6133 14.3084 15.46 14.155C15.3067 14.0017 15.23 13.8217 15.23 13.615C15.23 13.4084 15.3067 13.2287 15.46 13.076C15.6133 12.9234 15.7933 12.8467 16 12.846C16.2067 12.8454 16.3867 12.922 16.54 13.076C16.6933 13.23 16.77 13.41 16.77 13.616C16.77 13.822 16.6933 14.0017 16.54 14.155C16.3867 14.3084 16.2067 14.385 16 14.385ZM5.616 21.5C5.15533 21.5 4.771 21.346 4.463 21.038C4.155 20.73 4.00067 20.3457 4 19.885V7.11502C4 6.65502 4.15433 6.27102 4.463 5.96302C4.77167 5.65502 5.156 5.50069 5.616 5.50002H7.385V3.27002H8.462V5.50002H15.616V3.27002H16.616V5.50002H18.385C18.845 5.50002 19.2293 5.65435 19.538 5.96302C19.8467 6.27169 20.0007 6.65602 20 7.11602V19.885C20 20.345 19.846 20.7294 19.538 21.038C19.23 21.3467 18.8453 21.5007 18.384 21.5H5.616ZM5.616 20.5H18.385C18.5383 20.5 18.6793 20.436 18.808 20.308C18.9367 20.18 19.0007 20.0387 19 19.884V11.116H5V19.885C5 20.0384 5.064 20.1794 5.192 20.308C5.32 20.4367 5.461 20.5007 5.615 20.5"
                        fill="#4D4FFA"
                      />
                    </svg>
                  </div>
                </div>
                <div className="main__buttons">
                  <a
                    href="#activities"
                    className="main__button main__button--activity"
                  >
                    Події
                  </a>
                  <button
                    type="button"
                    onClick={handleCreate}
                    className="main__button main__button--create"
                    title={
                      !isAuthenticated
                        ? "Щоб створити активність, потрібно увійти"
                        : undefined
                    }
                  >
                    Створити
                  </button>

                  {showError && (
                    <PortalError onClose={() => setShowError(false)} />
                  )}
                </div>
              </form>
            </FadeIn>
          </div>
          <FadeIn direction="right" delay={0.6}>
            <div className="main__block-second">
              <img src="img/main.svg" alt="main" className="main__img" />
            </div>
          </FadeIn>
        </div>
        <FadeIn direction="up" delay={0.6}>
          <div className="main__arrow">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="main__arrow-icon"
            >
              <path
                d="M21.0927 31.3116L21.0927 10.0834C21.0927 9.82309 21.18 9.60493 21.3548 9.42893C21.5296 9.25293 21.7478 9.16554 22.0093 9.16676C22.2709 9.16798 22.489 9.25537 22.6638 9.42893C22.8386 9.60248 22.926 9.82065 22.926 10.0834L22.926 31.3116L32.8957 21.3401C33.0741 21.1604 33.2849 21.0669 33.5282 21.0596C33.7714 21.0523 33.9932 21.1488 34.1937 21.3493C34.3892 21.5509 34.4888 21.7673 34.4925 21.9983C34.4949 22.2293 34.3953 22.4456 34.1937 22.6473L23.047 33.7939C22.8857 33.954 22.7219 34.0665 22.5557 34.1313C22.3882 34.196 22.2061 34.2284 22.0093 34.2284C21.8125 34.2284 21.6304 34.196 21.463 34.1313C21.2955 34.0677 21.1318 33.9559 20.9717 33.7958L9.82499 22.6473C9.65388 22.4761 9.56222 22.2678 9.54999 22.0221C9.53777 21.7752 9.62944 21.5509 9.82499 21.3493C10.0267 21.1476 10.2442 21.0468 10.4777 21.0468C10.7123 21.0468 10.9305 21.1476 11.1322 21.3493L21.0927 31.3116Z"
                fill="black"
              />
            </svg>
            <svg
              viewBox="0 0 100 100"
              width="100"
              height="100"
              className="main__circle-text"
            >
              <defs>
                <path
                  id="textCircle"
                  d="M50,50 m-37.5,0 a37.5,37.5 0 1,1 75,0 a37.5,37.5 0 1,1 -75,0"
                />
              </defs>
              <text>
                <textPath href="#textCircle" startOffset="0%">
                  гортати вниз гортати вниз
                </textPath>
              </text>
            </svg>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
