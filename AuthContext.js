import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const login = async () => {
        setIsLoggedIn(true);
        await user();
    };
    const logout = async () => {
        setIsLoggedIn(false);
        
    }

    const user = async () => {
        return await AsyncStorage.getItem('user');
    }

    useEffect(() => { 
    }, [login,logout, isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };