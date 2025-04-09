import { Stack, Link } from 'expo-router';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { NavigationContainer } from '@react-navigation/native';
import MyMenu from './MyMenu';
import { PaperProvider } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RootLayout() {
    return (
        <>
            <PaperProvider theme={theme}>
            <Stack
                initialRouteName='index'
            screenOptions={{
                header: () => (
                    <View style={styles.headerStyles}>
                        <Link href="/"><Ionicons name="home-sharp" size={70} color="black" /></Link>
                        <MyMenu />
                    </View>
                )
            }}
            >
            <Stack.Screen name="index" />
            <Stack.Screen name="about" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
        </Stack >
            </PaperProvider>
        </>
    );
}

const styles = StyleSheet.create({
    headerStyles: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: 'lightblue',
    }
});

const theme = {
    colors: { 
        backdrop: 'transparent',
    },
}

