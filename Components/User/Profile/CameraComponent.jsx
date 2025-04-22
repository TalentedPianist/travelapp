import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert, ScrollView, Platform } from 'react-native';
import { CameraView } from 'expo-camera';
import { CameraType } from 'expo-camera';
import { useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function CameraComponent() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef();
    const navigation = useNavigation();

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>We need your permission to show the camera.</Text>
                <Button onPress={requestPermission} title="Grant permission" style={styles.buttonStyle} />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    // https://github.com/expo/expo/issues/26971
    // Above code works after trying things and takePictureAsync() not working.
    const handleTakePicture = async () => {
        if (cameraRef.current) {
            cameraRef.current.takePictureAsync({
                skipProcessing: true,
            })
                .then((photoData) => {
                    Alert.alert('Profile', 'Add photo to profile?', [
                        {
                            text: 'Yes',
                            onPress: async () => {
                               const pic = JSON.stringify(photoData);
                               await AsyncStorage.setItem('picture', pic);
                               //const lastInsertedPic = await AsyncStorage.getItem('picture');
                               //const parsed = JSON.parse(lastInsertedPic);
                               navigation.navigate('Profile');
                            },
                        },
                        { 
                            text: 'No',
                            onPress: () => console.log('Cancel pressed')
                        },
                    ]
                    );
                });
        }

    }

    return (

        <View style={styles.container}>
            <Text style={styles.paragraphText}>Here you can add a profile picture using your camera.</Text>

            <CameraView facing={facing} style={styles.camera} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={toggleCameraFacing} style={styles.button}>
                        <Text
                            style={styles.cameraButtonText}
                        >Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
            <TouchableOpacity onPress={() => handleTakePicture()} style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Take Picture</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        minHeight: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#9fe2bf',
        paddingTop: 20,
        paddingLeft: 20,
        marginRightBottom: 20,
        gap: 30,
    },
    message: {
        textAlign: 'center',

    },
    camera: {
        flex: 0,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        minHeight: 50,
        width: 350,
        position: 'relative',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.6);',
        color: 'white',
        margin: 100,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        position: 'relative',
        zIndex: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end',

    },
    paragraphText: {
        fontSize: 24,
        color: 'black',
    },
    headingText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    cameraButtonText: {
        color: 'white',
        fontSize: 22,
    },
    textStyle: { 
        fontSize: 24,
    },
    buttonStyle: { 
        alignSelf: 'flex-start',
        backgroundColor: 'lightblue',
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        paddingRight: 20,
        marginTop: 20,
    },
    buttonText: { 
        fontSize: 22,
    }
});