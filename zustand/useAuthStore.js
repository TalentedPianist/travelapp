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
            fetchUser: async () => {
                let u = await AsyncStorage.getItemAsync('user');
                let parse = JSON.parse(u);
                set({ user: parse }); 
                
            }
        })
    )
)
export default useAuthStore;