type Regime =
  | ''
  | 'Офлайн'
  | 'Онлайн'
;

  export const regime: { value: Regime; label: string }[] = [
  { value: '', label: 'Всі формати' },
  { value: 'Офлайн', label: 'Офлайн' },
  { value: 'Онлайн', label: 'Онлайн' },
];