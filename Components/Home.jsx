import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import BookingForm from './Booking/Form/BookingForm';

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
        const removeUser = async () => { 
            await AsyncStorage.clear();
        }
        
    }, []);

    return (
        <View style={styles.container}>
            <BookingForm />
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
    },
    countText: { 
        fontSize: 24, 
        marginBottom: 20,
    }
});
