import { create } from 'zustand';

const userStore = create((set) => ({ 
    user: null,
    isLoggedIn: false,
    removeUser: () => set({ user: null }),
    
}));


