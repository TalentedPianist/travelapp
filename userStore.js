import create from "zustand";
import { persist } from "zustand/middleware";

const useSessionStore = create((set) => ({ 
    user: null, 
    accessToken: null, 
    setUser: (user) => set({ user }),
    setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
    logout: () => set({ user: null, accessToken: null, refreshToken: null }),
}));

export default useSessionStore();