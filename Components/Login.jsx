import GoogleAuth from './GoogleAuth';
import GithubAuth from './Login/GithubAuth';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Login() {
    const [user, setUser] = useState(null);

   return (
    <>
        <View style={styles.containerStyles}>
            <GithubAuth />
        </View>
    </>
   );
}

const styles = StyleSheet.create({
    containerStyles: { 
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'relative',
        zIndex: 5000,
        backgroundColor: 'orange',
        height: '100%',
        paddingLeft: 20,
        paddingTop: 20,
    }
});