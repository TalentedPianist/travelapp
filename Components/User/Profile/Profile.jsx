import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useAuthStore from '../../../zustand/useAuthStore';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';


export default function Profile() { 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState('');
    const [index, setIndex] = useState(0);

    const user = useAuthStore(state => state.user);

    const Tab = createBottomTabNavigator();

    useEffect(() => { 
        async function getUser() { 
            let u = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(u);
            setName(parsed.name);
            setEmail(parsed.Email);
        }
        getUser();
    }, []);


    function ProfileScreenNew() { 
        return (
            <View style={{ display: 'flex', flexGrow: 1, minHeight: '100%' }}>
                <Text style={styles.headerText}>My Profile</Text>
                <Text style={styles.greetingText}>Hi {name}, welcome to your profile.</Text>
            </View>
        );
    }

    function UpdateProfileScreen() { 
        return (
            <View>
                <Text>Update Profile</Text>
            </View>
        );
    }

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'orange' }}>
               
                <Tab.Navigator style={styles.tabStyles}>
                    <Tab.Screen name="Profile" component={ProfileScreenNew} />
                    <Tab.Screen name="UpdateProfile" component={UpdateProfileScreen} />
                </Tab.Navigator>
            </ScrollView>

            
        </>
    );
}



const styles = StyleSheet.create({ 
    profileContainer: { 
        display: 'flex', 
        flexDirection: 'column',
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#ffa500',
        minHeight: '100%',
        height: '100%', 
        paddingTop: 20,
    },
    greetingText: { 
        fontSize: 30,
    },
    headerText: { 
        fontSize: 38,
        fontWeight: 'bold',
    },
    tabStyles: { 
        minHeight: '100%',
        
    },
});