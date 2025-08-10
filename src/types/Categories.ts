type Categories =
  | ''
  | 'Творчість'
  | 'Освіта'
  | 'Спорт'
  | 'Для дітей'
  | 'Культурні події'
  | 'Зустрічі'
  | 'Волонтерство';

  export const categories: { value: Categories; label: string }[] = [
  { value: '', label: 'Всі категорії' },
  { value: 'Творчість', label: 'Творчість' },
  { value: 'Освіта', label: 'Освіта' },
  { value: 'Спорт', label: 'Спорт' },
  { value: 'Для дітей', label: 'Для дітей' },
  { value: 'Культурні події', label: 'Культурні події' },
  { value: 'Зустрічі', label: 'Зустрічі' },
  { value: 'Волонтерство', label: 'Волонтерство' },
];