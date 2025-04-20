import Modal from 'react-native-modal';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useState } from 'react';

export default function HotelModal(props) {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    return (
        <>
            <Button onPress={toggleModal} title="View">View</Button>
            <View>
                <Modal isVisible={false}>
                    <View style={{ flex: 1 }}>
                    </View>
                </Modal>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
});