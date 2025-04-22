import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const navigation = useNavigation();

    const getUser = async () => {
        const u = await AsyncStorage.getItem('user');
        const parsed = JSON.parse(u);
        return parsed;
    }

    const login = async (data) => {
        
        try {
             const user = await getUser();
             if (!user || !user.password || !data.password) { 
                console.log('Invalid user or missing password.');
                return;
             }

            if (user.email === data.email && user.password === data.password) {
                setLoggedIn(true);
                setUser(user);
                navigation.navigate('Profile');
            } else { 
                console.log('Invalid credentials');
            }
        } catch (e) {
            console.log(e);
        }
    }
    const logout = () => {
      setLoggedIn(false);
      navigation.navigate('Login');
    }

    useEffect(() => {
        (async() => {
            await AsyncStorage.getItem('user')
                .then((result) => { 
                    const parsed = JSON.parse(result);
                    console.log(parsed);
                }).catch((error) => console.log(error)); 
        }); 
    });

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);