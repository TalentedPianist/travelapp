import { Stack, Slot } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MyMenu from './MyMenu';
import { SessionProvider } from './ctx';

export default function RootLayout() {
    return (
        <>
            <SessionProvider>    
                <Stack
                    screenOptions={{
                        header: () => (
                            <View style={styles.headerStyles}>
                                <FontAwesome5 name="home" size={70} color="black" />
                                <MyMenu />
                            </View>
                        ),
                    }}
                >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="about" />
                    <Stack.Screen name="login" />
                </Stack>
            </SessionProvider>
        </>
    );
}

const styles = StyleSheet.create({
    headerStyles: { 
        backgroundColor: 'lightblue',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 60,
        paddingBottom: 20,
    }
});