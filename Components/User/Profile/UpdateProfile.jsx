import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import CameraComponent from './CameraComponent';
import LocationComponent from './LocationComponent';


export default function UpdateProfile() {
    return (
        <>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <CameraComponent />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
       
    },
    headingText: {
        fontSize: 28,
        color: 'black', // Ensure text is visible
    },
    paragraphText: {
        fontSize: 22,
    },
    scrollView: {
        backgroundColor: 'yellow',
   
       
    },
    contentContainer: { 
        justifyContent: 'center',
        alignItems: 'center',
      
    }
});