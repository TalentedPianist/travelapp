import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '../ctx';

export default function AppLayout() { 
    const { session, isLoading } = useSession();
    
    if (isLoading) { 
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (secure) group and sign in again.
    if (!session) { 
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/login" />;
    }

    // This layout can be deferred because it's not the root layout.
    return <Stack />;
}