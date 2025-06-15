import { offset } from '@floating-ui/react-dom';
import { format } from "date-fns";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

export const CalendarPicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const datePickerRef = useRef<DatePicker | null>(null);

  const handleLabelClick = () => {
    datePickerRef.current?.setOpen(true);
  };

  return (
    <div className="calendar-picker">
      <div
        className="calendar-picker__label"
        onClick={handleLabelClick}
        style={{ cursor: "pointer" }}
      >
        Дата: {format(selectedDate, "dd.MM.yyyy")}
      </div>

      <DatePicker
        ref={datePickerRef}
        selected={selectedDate}
        onChange={(date) => date && setSelectedDate(date)}
        dateFormat="dd.MM.yyyy"
        calendarClassName="calendar-picker__calendar"
        popperPlacement="bottom-start"
        popperModifiers={[offset({ mainAxis: 5, crossAxis: -56 })]}
      />
    </div>
  );
};
