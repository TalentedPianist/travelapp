import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Button, Text } from 'react-native';
import { useRouter, Link } from 'expo-router';
import Fontisto from '@expo/vector-icons/Fontisto';
import Modal from 'react-native-modal';



export default function MyMenu() {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => { 
        setModalVisible(!isModalVisible);
    }

    return (
        <>

            <Modal isVisible={isModalVisible} >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>Navigation Menu</Text>
                    <Link href="/about" style={styles.modalText}>About</Link>
                    <Link href="/login" style={styles.modalText}>Login</Link>
                    <Button title="Hide modal" onPress={toggleModal} />
                </View>
            </Modal>


            <TouchableOpacity onPress={toggleModal}>
                <MaterialCommunityIcons name="menu" size={70} color="black" />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 50,
        justifyContent: 'space-between',
    },
    modalText: {

        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    }
});