import GoogleAuth from './GoogleAuth';
import { View, Text, StyleSheet } from 'react-native';


export default function Login() {
  
   return (
    <>
        <View style={styles.containerStyles}>
            <GoogleAuth />
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
        position: 'relative',
        zIndex: 5000,
        backgroundColor: 'orange',
        height: '100%',
    }
});