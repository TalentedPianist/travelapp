import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Button, Text, TouchableWithoutFeedback } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getUser() {
    try {
        const userData = await AsyncStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error("Failed to load data", error);
    }
}


const LoggedInModal = () => {
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const handleLogout = async () => { 
        try { 
            //await AsyncStorage.removeItem("user");
        } catch (error) { 
            console.error("Error removing user: ", error);
        }
    }

    return (
        <>
            <Modal isVisible={isModalVisible}
                style={styles.modalContainer}
                customBackdrop={
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={{ flex: 1, zIndex: 50000 }} />
                    </TouchableWithoutFeedback>
                }
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.modalText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Text style={styles.modalText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLogout()}>
                        <Text style={styles.modalText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

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
            <Modal isVisible={isModalVisible}
                style={styles.modalContainer}
                customBackdrop={
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={{ flex: 1, zIndex: 50000 }} />
                    </TouchableWithoutFeedback>
                }
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.modalText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('About')}>
                        <Text style={styles.modalText}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.modalText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.modalText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                        <Text>Hide Modal</Text>
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
    const [user, setUser] = useState(null);

    // useEffect hook solves the problem of the component rendering multiple times (yesterday)
    useEffect(() => {
        const fetchUser = async () => { 
            try { 
                const storedUser = await AsyncStorage.getItem("user");
                setUser(storedUser ? JSON.parse(storedUser) : null);
            } catch (error)  {
                console.error(error);
            }
        }
        fetchUser();
        
    }, []);

    return user ? <LoggedInModal /> : <LoggedOutModal />;
}



const styles = StyleSheet.create({
    modalContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalText: {
        color: 'white',
        fontSize: 32,
        textDecorationLine: 'underline',

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

