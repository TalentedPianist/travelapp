import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

async function getUser() {
    try { 
        const userData = await AsyncStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    } catch (error) { 
        console.error("Failed to load data", error);
    }
}

export default function User() { 
    const [user, setUser] = useState(null);

    useEffect(() => { 
        const fetchUser = async () => { 
            const userData = await getUser();
            setUser(userData);
        };
        fetchUser();
    }, []);

    return (
        <View style={styles.container}>
            <Text>
                { user ? `Welcome, ${user.email}` : "User not found" } 
            </Text>
        </View>
    );
}