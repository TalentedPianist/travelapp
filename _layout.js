import { Stack } from 'expo-router';

export default function RootLayout() { 
    return (
        <Stack
            screenOptions={{
                headerStyle: { 
                    backgroundColor: 'orange',
                },
                headerTintColor: 'white',
                headerTitleStyle: { 
                    fontWeight: 'bold',
                },
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="about" />
            </Stack>
    );
}