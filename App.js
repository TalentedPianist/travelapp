import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MyMenu from './MyMenu';
import { useRef } from 'react';
import AboutUs from './Components/AboutUs';
import Login from './Components/User/Login/Login';
import Home from './Components/Home';
import { createContext, useContext } from 'react';
import { createStore, useStore } from 'react';
import { PaperProvider } from 'react-native-paper';
import Profile from './Components/User/Profile/Profile';
import Register from './Components/User/Register/Register';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

AsyncStorage.getAllKeys((err, keys) => { 
    AsyncStorage.multiGet(keys, (error, stores) => { 
        let asyncStorage = {}
        stores.map((result, i, store) => { 
            asyncStorage[store[i][0]] = store[i][1]
        });
        //console.log(asyncStorage);
    });
});


function HomeScreen() {
    return (

        <Home />

    );
}

function AboutScreen() {
    return (
        <AboutUs />
    );
}

function LoginScreen() {
    return (
        <>
            <Login />
        </>
    );
}

function ProfileScreen() {
    return (
        <>
            <Profile />
        </>
    );
}

function RegisterScreen() {
    return (
        <Register />
    );
}

const Stack = createNativeStackNavigator();

function RootStack() {


    return (
        <>
            <Stack.Navigator initialRouteName="Home"
                screenOptions={{
                    header: () => (
                        <View style={styles.headerStyles}>
                            <FontAwesome5 name="home" size={70} color="black" />
                            <MyMenu />
                        </View>
                    )
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'overview' }}
                />
                <Stack.Screen
                    name="About"
                    component={AboutScreen}
                    options={{ title: 'About Us' }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: 'Login' }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ title: 'Profile' }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ title: 'Register' }}
                />
            </Stack.Navigator>
        </>
    );
}


export default function App() {
    const navigationRef = useRef();
    const isReadyRef = useRef(false);


    return (
        <>
            <AutocompleteDropdownContextProvider>
                <PaperProvider>
                    <NavigationContainer
                        ref={navigationRef}
                        onReady={() => {
                            isReadyRef.current = true;
                        }}
                    >
                        <RootStack />
                    </NavigationContainer>
                </PaperProvider>
            </AutocompleteDropdownContextProvider>
        </>
    );
}

const styles = StyleSheet.create({
    headerStyles: {
        backgroundColor: 'lightblue',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 70,
        paddingBottom: 20,
    }
});