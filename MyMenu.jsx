import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Button, Text } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';


export default function MyMenu() {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => { 
        setModalVisible(!isModalVisible);
    }

    return (
        <>

            <Modal isVisible={isModalVisible} >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('About')}>
                        <Text style={styles.modalText}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.modalText}>Login</Text>
                    </TouchableOpacity>
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