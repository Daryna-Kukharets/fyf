type DateOption = {
  value: string;
  label: string;
};

export const getDateOptions = (): DateOption[] => {
  const options: DateOption[] = [];

  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const value = date.toISOString().split('T')[0];
    let label = '';

    if (i === 0) {
      label = 'Сьогодні';
    } else if (i === 1) {
      label = 'Завтра';
    } else {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      label = `${day}.${month}`;
    }

    options.push({ value, label });
  }

  return options;
}