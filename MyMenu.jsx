import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, StyleSheet, View, Button, Text, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthStore from './zustand/useAuthStore';

const LoggedInModal = () => {
    const logout = useAuthStore(state => state.logout);

    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const handleLogout = () => {
        console.log('Logging out...');
        logout(); // Logout user
        navigation.navigate('Login');
    }

    return (
        <>
            <View>
                <Modal isVisible={isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={toggleModal}>
                            <MaterialCommunityIcons name="close" color="white" size={70} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <Text style={styles.modalText}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.modalText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>

            <TouchableOpacity onPress={toggleModal}>
                <MaterialCommunityIcons name="menu" size={70} color="black" />
            </TouchableOpacity>
        </>
    );
}

const LoggedOutModal = () => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    return (
        <>
            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={toggleModal}>
                        <MaterialCommunityIcons name="close" size={70} color="white" style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.modalText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPess={() => navigation.navigate('About')}>
                        <Text style={styles.modalText}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.modalText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.modalText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <TouchableOpacity onPress={toggleModal}>
                <MaterialCommunityIcons name="menu" size={70} color="black" />
            </TouchableOpacity>

        </>
    );
}

export default function MyMenu() {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);

    return (
        <>
            <View>
                {isLoggedIn ?
                    <LoggedInModal />
                    :
                    <LoggedOutModal />
                };
            </View>
        </>
    );
}



const styles = StyleSheet.create({
    modalContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        minHeight: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalText: {
        color: 'white',
        fontSize: 32,
        textDecorationLine: 'underline',
        alignSelf: 'center',
    },
    modalHeader: {
        fontSize: 38,
        color: 'white',
    },
    closeIcon: {
        color: 'white',
        fontSize: 32,
    },
    closeButton: {
        backgroundColor: 'lightblue',
        display: 'flex',
        alignSelf: 'flex-start',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        marginTop: 20,
    }
});

