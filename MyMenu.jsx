import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useEffect, useContext, Image, Platform } from 'react';
import { TouchableOpacity, StyleSheet, View, Button, Text, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import ProfilePicture from './Components/User/ProfilePicture';

const LoggedInModal = () => {
    const { user, logout, isLoggedIn } = useAuth();
 
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const handleLogout = () => {
        console.log('Logging out...');
        logout();
    }

    function handleNavigate(name) { 
        navigation.navigate(name);
        toggleModal();
    }

    return (
        <>
            <View>
                <Modal isVisible={isModalVisible}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={toggleModal}>
                            <MaterialCommunityIcons name="close" color="white" size={70} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <ProfilePicture />
                        <TouchableOpacity onPress={() => handleNavigate('Profile')}>
                            <View>
                                <Text style={styles.modalText}>Profile</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout}>
                            <View>
                                <Text style={styles.modalText}>Logout</Text>
                            </View>
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

    function handleNavigate(name) { 
        navigation.navigate(name);
        toggleModal();
    }

    return (
        <>
            <Modal isVisible={isModalVisible} animationIn="slideInUp">

                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={toggleModal}>
                        <MaterialCommunityIcons name="close" size={70} color="white" style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleNavigate('Home')}>
                        <View>
                            <Text style={styles.modalText}>Home</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleNavigate('About')}>
                        <View>
                            <Text style={styles.modalText}>About</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleNavigate('Register')}>
                        <View>
                            <Text style={styles.modalText}>Register</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleNavigate('Login')}>
                        <View>
                            <Text style={styles.modalText}>Login</Text>
                        </View>
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
    const { user, logout, isLoggedIn } = useAuth();

    useEffect(() => {
        (async() => {
            await AsyncStorage.getItem('user')
                .then((result) => { 
                    console.log(result);
                }).catch((error) => console.log(error)); 
        }); 
    }, []);

    return (
        <>
            <View>
                {isLoggedIn ?
                    <LoggedInModal />
                    :
                    <LoggedOutModal />
                }
            </View>
        </>
    );
}



const styles = StyleSheet.create({
    modalContainer: {
        width:'100%',
        flexDirection: 'column',
        flex: 1,
        flexGrow: 1,
        alignItems: 'center',
        alignSelf: 'center',
        minHeight: '100%',
        gap: 20,
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
    },
    menuIcon: { 
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
    }
});

