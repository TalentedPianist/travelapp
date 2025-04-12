import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef } from 'react';

async function getUser() { 
    try { 
        const userData = await AsyncStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    } catch (error) { 
        console.error("Failed to load data", error);
    }
}

const LoggedInView = async () => { 
    return (
        <>
            <View style={styles.profileContainer}>
                <Text>Welcome {await getUser().name}</Text>
            </View>
        </>
    );
}

const LoggedOutView = async () => { 
    return (
        <>
        </>
    );
}

export default function Profile() { 
    const user = undefined;
    // Conditional rendering on screen load
    
    useEffect(() => { 
        const fetchUser = async () => {
            user = await getUser();
        };
        fetchUser();
        console.log(fetchUser());
    }, []);

   return user ? <LoggedInView /> : <LoggedOutView />;
}

const styles = StyleSheet.create({ 
    profileContainer: { 
        display: 'flex', 
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'green',
        height: '100%',
    },
});