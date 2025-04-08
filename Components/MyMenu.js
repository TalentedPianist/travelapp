import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, Pressable, TouchableWithoutFeedback, StyleSheet, Modal, Text, Button } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { createStaticNavigation, useNavigationContainerRef, createNavigationContainerRef, NavigationContainer, useNavigation } from '@react-navigation/native';
import { Tabs, router, Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createStackNavigator, createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Home';
import About from '../Components/About';

const MenuIcon = () => {
    return (
        <Svg width="66" height="44" viewBox="0 0 66 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M0 44V36.6667H66V44H0ZM0 25.6667V18.3333H66V25.6667H0ZM0 7.33333V0H66V7.33333H0Z" fill="black" />
        </Svg>
    )
}

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screens: {
        Home: {
            screen: HomeScreen,
            options: {
                title: 'Booking Form',
            },
        },
    },
});

export default function MyMenu() {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const navigation = useNavigation();

    function navigate(name) {
        console.log(navigation.navigate(name));
        setVisible(false);
    }

    return (
        <>
            <TouchableOpacity onPress={showModal}>
                <MenuIcon />
            </TouchableOpacity>

            <TouchableWithoutFeedback>

                <Modal visible={visible} transparent animationType="fade"
                    onStartShouldSetResponder={() => {
                        console.log('You pressed the backdrop');
                    }
                    }
                >
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <View style={styles.overlay}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity onPress={() => navigate('about')}>
                                    <Text style={styles.modalText }>About</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigate('login')}>
                                    <Text style={styles.modalText }>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>

            </TouchableWithoutFeedback>

        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        position: 'absolute',
        top: 100,
        left: '10%',
        width: 300,
        height: 100,
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: '#fffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 20,
    },
    modalText: {
        color: '#ffffff',
        fontSize: 30,
    },
    modalButtons: {
        fontSize: 28,
    }
});
