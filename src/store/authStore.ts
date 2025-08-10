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
  setToken: (token: string | null) => void;
  logout: () => void;
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  clearAuthState: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => {
      const clearAuthState = () => {
        Cookies.remove("token");
        set({ token: null, user: null });
        localStorage.removeItem("auth-storage");
      };

      return {
        token: null,
        user: null,
        setToken: (token) => set({ token }),
        setUser: (user) => set({ user }),
        clearAuthState,
        logout: clearAuthState, // <- реалізація функції logout
      };
    },
    {
      name: "auth-storage",
      merge: (persistedState: any, currentState) => {
        // Якщо токена немає — видаляємо користувача
        if (!persistedState?.token) {
          return {
            ...currentState,
            token: null,
            user: null,
          };
        }

        return {
          ...currentState,
          ...persistedState,
        };
      },
    }
  )
);
