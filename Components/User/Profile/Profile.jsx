import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import UpdateProfile from './UpdateProfile';
import LocationComponent from './LocationComponent';
import CameraComponent from './CameraComponent';
import DeleteProfile from './DeleteProfile';
import ProfileView from './ProfileView';

export default function Profile() { 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState('');


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
        return <ProfileView />;
    }

    function UpdateProfileScreen() { 
        return <UpdateProfile />;
    }

    function AddLocationScreen() { 
        return <LocationComponent />;

    }

    function DeleteProfileScreen() { 
        return <DeleteProfile />;
    }

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'orange' }}>
               
                <Tab.Navigator 
                    screenOptions={{
                        headerStyle: { 
                            backgroundColor: 'lime',
                            
                        },
                        tabBarStyle: { 
                            backgroundColor: 'yellow'
                        },
                        tabBarLabelStyle: {
                            color: 'black',
                            fontSize: 10,
                            fontWeight: 'bold',
                        }
                    }}
                    >
                    <Tab.Screen 
                        name="ViewProfile"
                        options={{ 
                            title: 'Profile',
                            tabBarIcon: () => <FontAwesome5 size={30} name="user" color="purple" />,
                        }}
                        component={ProfileScreenNew} 
                    />
                    <Tab.Screen
                        name="UpdateProfile"
                        options={{
                            title: "Update Profile",
                            tabBarIcon: () => 
                                <FontAwesome5 size={30} name="user-edit" color="purple" />
                        }}
                        component={UpdateProfileScreen}
                    />
                    <Tab.Screen 
                        name="ProfilePicture"
                        options={{ 
                            title: "Profile Picture",
                            tabBarIcon: () => 
                                <FontAwesome5 size={30} name="camera" color="purple" />
                        }}
                         component={CameraComponent} 
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
    },
    tabBarLabelStyle: { 
        fontSize: 22,
        color: 'black',
    },
    tabBarStyle: { 
        backgroundColor: 'yellow',
    }
});