import GoogleAuth from './GoogleAuth';
import GithubAuth from './Login/GithubAuth';
import { View, Text, StyleSheet } from 'react-native';


export default function Login() {
  
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