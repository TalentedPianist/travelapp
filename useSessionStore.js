import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSessionStore = create(
    persist(
        (set) => ({ 
            user: null,
            accessToken: null,
            refreshToken: null,
            setUser: (user) => set({ user }),
            setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
            logout: () => set({ user: null, accessToken: null, refreshToken: null })
        }),
        {
            name: 'session-storage',
        }
    )
);