type DateOption = {
  value: string;
  label: string;
};

export const getDateOptions = (includeDate?: string): DateOption[] => {
  const options: DateOption[] = [
    { value: "", label: "Всі дати" }, // додали "всі дати"
  ];

  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const value = `${year}-${month}-${day}`;

    let label = "";

      if (i === 0) {
      label = 'Сьогодні';
    } else if (i === 1) {
      label = 'Завтра';
    } else {
      label = `${day}.${month}`;
    }

    options.push({ value, label });
  }

  return options;
};
