import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export async function getUser() { 
    try { 
        const userData = await AsyncStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    } catch (error) { 
        console.error("Failed to load data", error);
    }
}

export default function Home() { 
    // async operations should always be inside useEffect hook
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
                { user ? `Welcome, ${user.email}` : "User not found"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: { 
        fontSize: 24, 
        marginBottom: 20,
    }
});
