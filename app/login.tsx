import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { useSession } from './ctx';
import GithubAuth from './sociallogin/GithubAuth';
import GoogleAuth from './sociallogin/GoogleAuth';

export default function Login() {
    const { signIn } = useSession();
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <GoogleAuth />
            </View>

        );
    
}