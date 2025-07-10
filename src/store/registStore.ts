import { create } from "zustand";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string; 
}

interface AuthState {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
}

export const authStore = create<AuthState>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));
