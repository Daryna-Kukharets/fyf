import { useEffect, useState } from "react";
import { categories } from "../../types/Categories";
import { forWho } from "../../types/ForWho";
import { regime } from "../../types/Regime";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { ImageSelector } from "../ImageSelector/ImageSelector";
import { LocationPicker } from "../LocationPicker/LocationPicker";
import { useActivityStore } from "../../store/useActivityStore";
import { CalendarPicker } from "../CalendarPicker/CalendarPicker";
import { sendRequest } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const ActivityForm = () => {
  const { address, date: storedDate, category: storedCategory } = useActivityStore();
  const [selectedCategory, setSelectedCategory] = useState<string>(storedCategory || "");
  const [selectedForWho, setSelectedForWho] = useState<string>("");
  const [selectedRegime, setSelectedRegime] = useState<string>("");

  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [photoId, setPhotoId] = useState(0);

  const [addressValue, setAddressValue] = useState(() => {
    return address
      ? {
          address: address.address || "",
          lat: address.lat || 0,
          lng: address.lng || 0,
        }
      : {
          address: "",
          lat: 0,
          lng: 0,
        };
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
  console.log("🛬 Дата, що прийшла з Zustand:", storedDate);
  return storedDate || null;
});
  const [errors, setErrors] = useState({
    name: "",
    forWho: "",
    category: "",
    regime: "",
    count: "",
    date: "",
    address: "",
    photo: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newErrors = {
      name: name.trim() ? "" : "Назва обов'язкова",
      forWho: selectedForWho ? "" : "Оберіть для кого підходить",
      category: selectedCategory ? "" : "Оберіть категорію",
      regime: selectedRegime ? "" : "Оберіть формат участі",
      count:
        count !== "" && Number(count) > 0 ? "" : "Вкажіть кількість учасників",
      date: selectedDate ? "" : "Оберіть дату",
      address:
        addressValue.address.trim() && addressValue.lat && addressValue.lng
          ? ""
          : "Оберіть локацію",
      photo: photoId !== 0 ? "" : "Оберіть фото",
    };

    setErrors(newErrors);

     const hasErrors = Object.values(newErrors).some((error) => error !== "");
  if (hasErrors) {
    console.warn("Форма невалідна. Помилки:", newErrors);
    return;
  }
    const activityData = {
      name,
      forWho: selectedForWho,
      numberOfPeople: Number(count),
      category: selectedCategory,
      format: selectedRegime,
      lat: addressValue.lat,
      lng: addressValue.lng,
      imgId: photoId,
      localDateTime: selectedDate!.toISOString(),
    };

     console.log("Дані для створення активності:", activityData);

    try {
      const res = await sendRequest({
        endpoint: "activity/create",
        data: activityData,
      });
      console.log("Активність створено:", res);
      navigate("/plans");
    } catch (err) {
      console.error("Помилка при створенні:", err);
    }
  };

  return (
    <div className="activityForm">
      <div className="activityForm__block-img">
        <form className="activityForm__form">
          <div className="activityForm__label">
            <ImageSelector
              photoId={photoId}
              onSelect={(newPhotoId) => {
                setPhotoId(newPhotoId);
                setErrors((prev) => ({ ...prev, photo: "" }));
              }}
            />
            {errors.photo && (
              <p className="activityForm__error">{errors.photo}</p>
            )}
          </div>

          <div className="activityForm__gap">
            <label className="activityForm__label">
              Категорія
              <CustomSelect
                options={categories.slice(1)}
                classFor={"custom-select__activity"}
                value={selectedCategory}
                onChange={(val) => {
                  setSelectedCategory(val);
                  setErrors((prev) => ({ ...prev, category: "" }));
                }}
                placeholder="Зробіть вибір"
              />
              {errors.category && (
                <p className="activityForm__error">{errors.category}</p>
              )}
            </label>
            <label className="activityForm__label">
              Для кого підходить
              <CustomSelect
                options={forWho.slice(1)}
                classFor={"custom-select__activity"}
                value={selectedForWho}
                onChange={(val) => {
                  setSelectedForWho(val);
                  setErrors((prev) => ({ ...prev, forWho: "" }));
                }}
                placeholder="Зробіть вибір"
              />
              {errors.forWho && (
                <p className="activityForm__error">{errors.forWho}</p>
              )}
            </label>
            <label className="activityForm__label">
              Формат участі
              <CustomSelect
                options={regime.slice(1)}
                classFor={"custom-select__activity"}
                value={selectedRegime}
                onChange={(val) => {
                  setSelectedRegime(val);
                  setErrors((prev) => ({ ...prev, regime: "" }));
                }}
                placeholder="Зробіть вибір"
              />
              {errors.regime && (
                <p className="activityForm__error">{errors.regime}</p>
              )}
            </label>
            <label className="activityForm__label">
              Назва
              <input
                type="text"
                className="activityForm__input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
              />
              {errors.name && (
                <p className="activityForm__error">{errors.name}</p>
              )}
            </label>
            <label className="activityForm__label">
              Кількість учасників
              <input
                type="number"
                className="activityForm__input"
                value={count}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^[0-9]+$/.test(val)) {
                    setCount(val);
                    setErrors((prev) => ({ ...prev, count: "" }));
                  }
                }}
              />
              {errors.count && (
                <p className="activityForm__error">{errors.count}</p>
              )}
            </label>
            <div className="activityForm__date">
              <label className="activityForm__label">Дата та час</label>
              <div className="activityForm__date-box">
                <CalendarPicker
                  date={selectedDate}
                  setDate={(date) => {
                    setSelectedDate(date);
                    setErrors((prev) => ({ ...prev, date: "" }));
                  }}
                  classFor="calendar-picker__label--activity"
                />
                {errors.date && (
                  <p className="activityForm__error">{errors.date}</p>
                )}
              </div>
            </div>
            <div className="activityForm__location">
              <label
                htmlFor="location-input"
                className="activityForm__label activityForm__label--location"
              >
                Локація
              </label>
              <LocationPicker
                value={addressValue.address}
                onChange={(val) => {
                  setAddressValue(val);
                  setErrors((prev) => ({ ...prev, address: "" }));
                }}
                classFor="main__input--location-activity"
              />
              {errors.address && (
                <p className="activityForm__error">{errors.address}</p>
              )}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="activityForm__location-img"
              >
                <path
                  d="M12.0041 11.73C12.4487 11.73 12.8287 11.5717 13.1441 11.255C13.4594 10.9383 13.6167 10.5573 13.6161 10.112C13.6154 9.66667 13.4567 9.28667 13.1401 8.972C12.8234 8.65733 12.4424 8.5 11.9971 8.5C11.5517 8.5 11.1717 8.65867 10.8571 8.976C10.5424 9.29333 10.3851 9.67433 10.3851 10.119C10.3851 10.5637 10.5434 10.9437 10.8601 11.259C11.1767 11.5743 11.5581 11.7317 12.0041 11.731M12.0001 21.019C9.65005 18.941 7.88005 17.003 6.69005 15.205C5.49939 13.407 4.90405 11.7707 4.90405 10.296C4.90405 8.18067 5.59272 6.436 6.97005 5.062C8.34805 3.68733 10.0247 3 12.0001 3C13.9754 3 15.6521 3.68733 17.0301 5.062C18.4074 6.436 19.0961 8.18067 19.0961 10.296C19.0961 11.7707 18.5011 13.407 17.3111 15.205C16.1204 17.003 14.3501 18.941 12.0001 21.019Z"
                  fill="#110875"
                />
              </svg>
            </div>
          </div>

          <button
            type="button"
            className="activityForm__button"
            onClick={handleSubmit}
          >
            Створити
          </button>
        </form>
      </div>
    </div>
  );
};
