import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MyMenu from './MyMenu';
import { useRef, useEffect, useContext, createContext } from 'react';
import AboutUs from './Components/AboutUs';
import Login from './Components/User/Login/Login';
import Home from './Components/Home';
import { PaperProvider } from 'react-native-paper';
import Profile from './Components/User/Profile/Profile';
import Register from './Components/User/Register/Register';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


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
    const navigation = useNavigation();

    return (
        <>
            <Stack.Navigator initialRouteName="Home"
                screenOptions={{
                    header: () => (
                        <View style={styles.headerStyles}>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <FontAwesome5 name="home" size={70} color="black" />
                            </TouchableOpacity>
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

const getAllKeys = async () => {
    let keys = [];
    try {
        keys = await AsyncStorage.getAllKeys();
    } catch (e) {
        console.log(e);
    }
    console.log(keys);
}

const clearAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log(e);
    }
    console.log('Done.');

}

export default function App() {
    const navigationRef = useRef();
    const isReadyRef = useRef(false); // Sets navigation to ready otherwise we get an error

    useEffect(() => {
        //clearAll();
        getAllKeys();
    }, []);

    return (
        <>
   
            <NavigationContainer
                ref={navigationRef}
                onReady={() => {
                    isReadyRef.current = true;
                }}
            >
       

                    <AutocompleteDropdownContextProvider>
                        <PaperProvider>
                            <RootStack />
                        </PaperProvider>
                    </AutocompleteDropdownContextProvider>
            
            </NavigationContainer>
        
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