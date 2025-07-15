import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

type UserData = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  photoPath?: string;
};

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  user: UserData | null;
  setUser: (user: UserData) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: Cookies.get("token") || null,
      setToken: (token) => {
        Cookies.set("token", token, { expires: 7 });
        set({ token });
      },
      logout: () => {
        Cookies.remove("token");
        set({ token: null, user: null });
      },
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
    }
  )
);