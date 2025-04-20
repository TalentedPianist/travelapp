import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useAuthStore from '../../../zustand/useAuthStore';
import FontAwesome5 from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import UpdateProfile from './UpdateProfile';
import LocationComponent from './LocationComponent';


export default function Profile() { 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState('');

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
            <View style={styles.profileContainer}>
                <Text style={styles.headerText}>My Profile</Text>
                <Text style={styles.greetingText}>Hi {name}, welcome to your profile.</Text>
            </View>
        );
    }

    function UpdateProfileScreen() { 
        return <UpdateProfile />;
    }

    function AddLocationScreen() { 
        return <LocationComponent />;

    }

    function DeleteProfileScreen() { 
        return (
            <View>
                <Text>Delete Profile</Text>
            </View>
        );
    }

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'orange' }}>
               
                <Tab.Navigator style={styles.tabStyles} sceneContainerStyle={{ backgroundColor: 'yellow'}}>
                    <Tab.Screen 
                        name="Profile"
                        options={{ 
                            title: 'Profile',
                            tabBarIcon: () => <FontAwesome5 size={30} name="user" color="purple" />,
                        }} 
                        component={ProfileScreenNew} 
                    />
                    <Tab.Screen 
                        name="ProfilePicture"
                        options={{ 
                            title: "Profile Picture",
                            tabBarIcon: () => 
                                <FontAwesome5 size={30} name="camera" color="purple" />
                        }}
                         component={UpdateProfileScreen} 
                    />
                    <Tab.Screen 
                        name="AddLocationScreen"
                        options={{
                            title: "Add Location",
                            tabBarIcon: () => 
                                <FontAwesome5 size={30} name="map" color="purple" />
                        }}
                        component={AddLocationScreen}
                    />
                    <Tab.Screen 
                        name="DeleteProfileScreen"
                        options={{ 
                            title: "Delete Profile",
                            tabBarIcon: () => <FontAwesome5 name="user-times" color="purple" size={30} />
                        }}
                        component={DeleteProfileScreen} 
                    />
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
        paddingLeft: 20,
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
        backgroundColor: 'lightgreen',
    },
    updateProfileContainer: { 
        backgroundColor: 'yellow',
        minHeight: '100%',
        paddingLeft: 20,
        paddingTop: 20,
    },
    updateProfileText: { 
        fontSize: 26,
    }
});