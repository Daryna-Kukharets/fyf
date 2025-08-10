import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useLocation } from "react-router-dom";
import { uk } from "date-fns/locale";

type Props = {
  date: Date | null;
  setDate: (date: Date) => void;
  classFor?: string;
};

export const CalendarPicker: React.FC<Props> = ({
  classFor,
  date,
  setDate,
}) => {
  const { pathname } = useLocation();
  const isCreateActivityPage = pathname.includes("/create-activity");

  const [selectedDate, setSelectedDate] = useState<Date | null>(date ?? null);
  const [pickerStage, setPickerStage] = useState<"date" | "time" | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setPickerStage(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onChange = (newVal: Date | null) => {
    if (!newVal) return;

    if (pickerStage === "date") {
      const newDate = new Date(newVal);
      newDate.setHours(12); // Базовий час (можеш змінити)
      newDate.setMinutes(0);
      setSelectedDate(newDate);
      setDate?.(newDate);
      if (isCreateActivityPage) setPickerStage("time");
      else setPickerStage(null);
    }

    if (pickerStage === "time") {
      if (!selectedDate) return;
      const newDate = new Date(selectedDate);
      newDate.setHours(newVal.getHours());
      newDate.setMinutes(newVal.getMinutes());
      setSelectedDate(newDate);
      setDate?.(newDate);
      setPickerStage(null);
    }
  };

  const handleLabelClick = () => {
      setPickerStage("date");
  };

  return (
    <div className="calendar-picker" ref={ref}>
      <div
          className={`calendar-picker__label ${classFor} ${pickerStage ? "calendar-picker__label--rotated" : ""
        } ${
          !selectedDate ? "calendar-picker__placeholder" : ""
        }`}
        onClick={handleLabelClick}
      >
        {isCreateActivityPage ? (
          <span>
            {date ? format(date, "dd.MM.yyyy, HH:mm") : "Оберіть дату та час"}
          </span>
        ) : (
          <span>
            {date ? `Дата: ${format(date, "dd.MM.yyyy")}` : "Оберіть дату"}
          </span>
        )}
      </div>

      {pickerStage && (
        <DatePicker
          selected={pickerStage === "time" ? date : selectedDate}
          onChange={onChange}
         open={pickerStage !== null}
        onClickOutside={() => setPickerStage(null)}
        showTimeSelect={pickerStage === "time" && isCreateActivityPage}
        showTimeSelectOnly={pickerStage === "time" && isCreateActivityPage}
          timeIntervals={30}
          timeCaption="Час"
          dateFormat={pickerStage === "time" ? "HH:mm" : "dd.MM.yyyy"}
          locale={uk}
          minDate={new Date()}
          calendarClassName={
            pickerStage === "time"
              ? "calendar-picker__time"
              : "calendar-picker__calendar"
          }
          popperPlacement="bottom-start"
          wrapperClassName="calendar-picker__wrapper"
        />
      )}
    </div>
  );
};