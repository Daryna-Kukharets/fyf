export const getDateLabel = (val: string): string => {
  if (!val) return "Всі дати";

  const today = new Date();
  const customDate = new Date(val);
  if (isNaN(customDate.getTime())) return val;

  const diff = Math.floor(
    (customDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff === 0) return "Сьогодні";
  if (diff === 1) return "Завтра";

  const day = String(customDate.getDate()).padStart(2, "0");
  const month = String(customDate.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
};
