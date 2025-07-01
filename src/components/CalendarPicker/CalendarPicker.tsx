import { format } from "date-fns";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";

export const CalendarPicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<DatePicker | null>(null);

  const handleLabelClick = () => {
    setIsOpen((prev) => !prev);
    datePickerRef.current?.setOpen(true);
  };

  return (
    <div className="calendar-picker">
      <div
        className={`calendar-picker__label ${
          isOpen ? "calendar-picker__label--rotated" : ""
        }`}
        onClick={handleLabelClick}
        style={{ cursor: "pointer" }}
      >
        Дата: {format(selectedDate, "dd.MM.yyyy")}
      </div>

      <DatePicker
        ref={datePickerRef}
        selected={selectedDate}
        onChange={(date) => {
          if (date) {
            setSelectedDate(date);
            setIsOpen(false);
          }
        }}
        onClickOutside={() => setIsOpen(false)}
        onCalendarClose={() => setIsOpen(false)}
        onCalendarOpen={() => setIsOpen(true)}
        dateFormat="dd.MM.yyyy"
        calendarClassName="calendar-picker__calendar"
        popperPlacement="bottom-start"
        // popperModifiers={[offset({ mainAxis: 5, crossAxis: -56 })]}
        wrapperClassName="calendar-picker__wrapper"
      />
    </div>
  );
};
