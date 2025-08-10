type ForWho =
  | ''
  | 'Для всіх'
  | 'Для студентів'
  | 'Для дітей'
  | 'Для родин'
;

  export const forWho: { value: ForWho; label: string }[] = [
  { value: '', label: 'Всі категорії' },
  { value: 'Для всіх', label: 'Для всіх' },
  { value: 'Для студентів', label: 'Для студентів' },
  { value: 'Для дітей', label: 'Для дітей' },
  { value: 'Для родин', label: 'Для родин' },
];