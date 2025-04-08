import GoogleLogin from './Components/Login/GoogleLogin';
import GithubLogin from './Components/Login/GithubLogin';
import { View, StyleSheet } from 'react-native';

export default function Login() {
    return (
        <>
            <View style={styles.loginContainer}>
                <GoogleLogin />
            
                <GithubLogin />
            </View>
        </>
    ); 
}

const styles = StyleSheet.create({ 
    loginContainer: { 
        display: 'flex',
        flexDirection: 'column',
        height: 200,
    
    },
    loginButtons: { 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    }
});