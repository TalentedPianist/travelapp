import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({ 
            isLoggedIn: false,
            login: () => set({ isLoggedIn: true }),
            logout: () => set({ isLoggedIn: false }),
            user: [],
            
        }),
       
    )
)
export default useAuthStore;