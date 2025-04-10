import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import { TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useRouter, Link } from 'expo-router';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function MyMenu() {
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    }

    const hideModal = () => {
        setVisible(false);
    }



    return (
        <>

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}

                >
                    <Pressable onPress={hideModal}>
                        <Fontisto name="close-a" size={70} color="white" />
                    </Pressable>
                    <Pressable>
                        <Link href="/about" style={styles.modalText}>About</Link>
                    </Pressable>
                    <Pressable>
                        <Link href="/login" style={styles.modalText}>Login</Link>
                    </Pressable>
                </Modal>
            </Portal>


            <TouchableOpacity onPress={showModal}>
                <MaterialCommunityIcons name="menu" size={70} color="black" />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
       
      
    },
    modalText: {

        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 40,
    }, 
    closeIcon: { 
        color: 'white', 
        fontSize: 32,
    }
});