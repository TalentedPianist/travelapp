import { View, Text, StyleSheet } from 'react-native';
import {  NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MyMenu from './MyMenu';
import { useRef } from 'react';
import AboutUs from './Components/AboutUs';
import Login from './Components/Login';
import GoogleAuth from './Components/GoogleAuth';

function HomeScreen() { 
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}

function AboutScreen() { 
    return(
        <AboutUs />
    );
}

function LoginScreen() { 
    return (
        <>
            <View>
                <GoogleAuth />
            </View>
        </>
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
        </Stack.Navigator>
        </>
    );
}


export default function App() {
    const navigationRef = useRef();
    const isReadyRef = useRef(false);


    return (
        <>
            <NavigationContainer 
                ref={navigationRef}
                onReady={() => { 
                    isReadyRef.current = true;
                }}
            >
                <RootStack />
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