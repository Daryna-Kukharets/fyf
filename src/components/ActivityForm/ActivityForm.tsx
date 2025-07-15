import { useState } from "react";
import { categories } from "../../types/Categories";
import { forWho } from "../../types/ForWho";
import { regime } from "../../types/Regime";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { ImageSelector } from "../ImageSelector/ImageSelector";
import { LocationPicker } from "../LocationPicker/LocationPicker";
import { useActivityStore } from "../../store/useActivityStore";

export const ActivityForm = () => {
  const { address, category } = useActivityStore();

  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedForWho, setSelectedForWho] = useState("");
  const [selectedRegime, setSelectedRegime] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [addressValue, setAddressValue] = useState(address);

  return (
    <div className="activityForm">
      <div className="activityForm__block-img">
        <ImageSelector />

        <form onClick={() => {}} className="activityForm__form">
          <label className="activityForm__label">
            Категорія
            <CustomSelect
              options={categories}
              classFor={"custom-select__activity"}
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
            />
          </label>
          <label className="activityForm__label">
            Для кого підходить
            <CustomSelect
              options={forWho}
              classFor={"custom-select__activity"}
              value={selectedForWho}
              onChange={(val) => setSelectedForWho(val)}
            />
          </label>
          <label className="activityForm__label">
            Формат участі
            <CustomSelect
              options={regime}
              classFor={"custom-select__activity"}
              value={selectedRegime}
              onChange={(val) => setSelectedRegime(val)}
            />
          </label>
          <label className="activityForm__label">
            Назва
            <input
              type="text"
              className="activityForm__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="activityForm__label">
            Дата та час
            <input
              type="datetime-local"
              className="activityForm__input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label className="activityForm__label">
            Локація
            <div className="activityForm__location">
              <LocationPicker
                value={addressValue}
                onChange={(val) => setAddressValue(val)}
                classFor="main__input--location-activity"
              />
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
          </label>

          <button type="button" className="activityForm__button">
            Створити
          </button>
        </form>
      </div>
    </div>
  );
};
