import { create } from 'zustand';

interface ActivityData {
  address: string;
  category: string;
  setAddress: (value: string) => void;
  setCategory: (value: string) => void;
}

export const useActivityStore = create<ActivityData>((set) => ({
  address: '',
  category: '',
  setAddress: (value) => set({ address: value }),
  setCategory: (value) => set({ category: value }),
}));
