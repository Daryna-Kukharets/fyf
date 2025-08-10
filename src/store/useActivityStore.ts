import { create } from "zustand";

interface Address {
  address: string;
  lat: number;
  lng: number;
}

interface ActivityData {
  address: Address | null;
  category: string;
  date: Date | null;
  setAddress: (value: Address) => void;
  setCategory: (value: string) => void;
  setDate: (date: Date | null) => void;
}

export const useActivityStore = create<ActivityData>((set) => ({
  address: null,
  category: "",
  date: null,
  setAddress: (value) => set({ address: value }),
  setCategory: (value) => set({ category: value }),
  setDate: (date) => {
    console.log("📦 Збереження дати в Zustand:", date);
    set({ date: date });
  }
}));
