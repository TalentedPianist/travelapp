import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

import Camera from './Camera';
import LocationComponent from './LocationComponent';


export default function UpdateProfile() {
    return (
        <>
        <View style={styles.container}>
            <Text style={styles.headingText}>Update Profile</Text>
            <Text style={styles.paragraphText}>Here you can add a profile picture using your camera.</Text>
            
            <Text style={styles.paragraphText}>You can also add your location to your profile.</Text>
            <LocationComponent />
        </View>
      
        </>
    ); 
}

const styles = StyleSheet.create({ 
    container: { 
        backgroundColor: 'yellow',
        minHeight: '100%',
        height: '100%',
        paddingLeft: 20,
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        flexGrow: 1,
    },
    headingText: { 
        fontSize: 28,
        color: 'black', // Ensure text is visible
    },
    paragraphText: { 
        fontSize: 22,
    }
});