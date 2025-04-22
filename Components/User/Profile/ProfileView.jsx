import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-paper';
import React, { useState, useEffect } from 'react';

export default function ProfileView() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState();

    async function getUser() {
        await AsyncStorage.getItem('user')
            .then((result) => {
                const parsed = JSON.parse(result);
                setName(parsed.name);
                setEmail(parsed.email);
                setPassword(parsed.password);
            })
            .catch((error) => {
                // console.error(error);
            })
    }

    async function getPicture() {
        await AsyncStorage.getItem('picture')
            .then((result) => { 
                if (result === null) { 
                    console.log('No picture implemented yet.');
                } else { 
                   const parsed = JSON.parse(result);
                   setPicture(parsed.uri);
                }
            }).catch((error) => { 
                console.log(error);
            }); 
    }

    useEffect(() => {
        getUser();
        getPicture();
    }, []);


    return (
        <View style={styles.container}>
            <Text variant="displayMedium">Your Profile</Text>
            <View style={styles.firstRow}>
                <Text style={styles.headingText} variant="titleLarge">Name:</Text>
                <Text variant="bodyLarge">{name}</Text>
            </View>
            <View style={styles.secondRow}>
                <Text style={styles.headingText} variant="titleLarge">Email:</Text>
                <Text variant="bodyLarge">{email}</Text>
            </View>
            <View style={styles.thirdRow}>
                <Text style={styles.headingText} variant="titleLarge">Password:</Text>
                <Text variant="bodyLarge">{password}</Text>
            </View>
            <View style={styles.fourthRow}>
                <Text style={styles.headingText} variant="titleLarge">Profile Picture:</Text>
                <Image 
                    style={styles.profilePicture}
                    source={{
                        uri: picture
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffa500',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 20,
        height: '100%',
    }, 
    firstRow: { 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    secondRow: { 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }, 
    thirdRow: { 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    fourthRow: { 
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '100%',
    
    },
    headingText: { 
        fontWeight: 'bold',
    },
    profilePicture: { 
        width: 300,
        height: 200,
        marginLeft: 20,
        marginTop: 20,
    }
});
