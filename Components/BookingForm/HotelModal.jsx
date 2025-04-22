import Modal from 'react-native-modal';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Redirect } from 'expo-router';

export default function HotelModal(props) {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const handleSave = async () => { 
       await AsyncStorage.setItem('hotel', JSON.stringify(props));
       alert('Hotel saved!');
       toggleModal();
    }

    return (
        <>
            <Button mode="contained"  onPress={toggleModal} title="View">View</Button>
            <View>
                <Modal isVisible={isModalVisible} style={styles.modalStyle} hasBackdrop={false}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={toggleModal}>
                            <MaterialCommunityIcons name="close" color="white" size={70} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <View style={styles.modalContainer}>

                            <Text style={styles.nameText}>{props.name}</Text>
                            <Image source={{ uri: props.image }} style={{ width: 350, height: 200 }} />
                            <Text style={styles.distanceText}>{props.distance}</Text>
                            <Text style={styles.priceText}>{props.price}</Text>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 5000,
    },
    modalText: {
        color: 'white',
    },
    nameText: {
        color: 'white',
        fontSize: 34,
        fontWeight: 'bold',
    },
    distanceText: {
        color: 'white',
        fontSize: 30
    },
    priceText: { 
        color: 'white',
        fontSize: 28,
    },
    modalContainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '100%',
        zIndex: 50000,
    },
    saveButton: { 
        backgroundColor: 'purple',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        color: 'white',
        zIndex: 5000,
    },
    saveText: { 
        color: 'white',
        fontSize: 28,
    }
});