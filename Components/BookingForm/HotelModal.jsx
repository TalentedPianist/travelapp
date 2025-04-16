import { useState } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

export default function HotelModal(props) {
    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => { 
        setModalVisible(!isModalVisible);
    }

    return (
        <>
            <TouchableOpacity style={styles.viewButton} onPress={toggleModal}>
                <Text>View</Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible}>
                <View  style={styles.modalStyle}>
                    <Text style={styles.textStyle}>Hello</Text>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({ 
    viewButton: { 
        backgroundColor: 'beige',
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingTop: 10, 
        paddingBottom: 10,
    },
    modalStyle: { 
        display: 'flex',
    }, 
    textStyle: { 
        color: 'white',
        fontSize: 28,
    }
});