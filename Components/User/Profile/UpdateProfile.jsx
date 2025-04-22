import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CameraComponent from './CameraComponent';
import LocationComponent from './LocationComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';

export default function UpdateProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const loadUserInfo = async () => { 
        try { 
            const userInfo = await AsyncStorage.getItem('user');
            if (userInfo) { 
                const parsed = JSON.parse(userInfo);
                setName(parsed.name);
                setEmail(parsed.email);
            }
        } catch (e) { 
            console.log(e);
        }
    }

    const updateUser = async () => {
        try { 
            // Merge new data with existing data for update operation
            await AsyncStorage.mergeItem('user', JSON.stringify({ 
                name: name,
                email: email,
            }));
            alert('User updated successfully!');
        } catch (e) { 
            console.log(e);
        } 
    }
    
    useEffect(() => {
        (async () => { 
            await loadUserInfo();
        })(); // Call the async function here
        
    }, []);

    return (
        <>
            <View style={styles.container}>
                <TextInput 
                    label="name"
                    value={name}
                    onChangeText={name => setName(name)}
                    clearTextOnFocus={true}
                    onFocus={() => { 
                        setName('');
                    }}
                    onBlur={() => { 
                        setName(name);
                    }}
                />
                <TextInput 
                    label="Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                    clearTextOnFocus={true}
                    keyboardType="email-address"
                    onFocus={() => {
                        setEmail(''); 
                    }}
                />
                <Button mode="contained" style={styles.buttonStyle} onPress={() => updateUser()}>Update</Button>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'beige',
        gap: 50,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    headingText: {
        fontSize: 28,
        color: 'black', // Ensure text is visible
    },
    paragraphText: {
        fontSize: 22,
    },
    scrollView: {
        backgroundColor: 'yellow',


    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    textInput: { 
    },
    buttonStyle: { 
        alignSelf: 'flex-start',
    }
});