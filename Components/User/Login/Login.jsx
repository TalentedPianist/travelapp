import GithubAuth from './GithubAuth';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput, HelperText, Button } from 'react-native-paper';
import * as Crypto from 'expo-crypto';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import useAuthStore from '../../../zustand/useAuthStore';
import { GetUser } from '../../../Helpers/user';

const getUser = async () => { 
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : [];
}

export default function Login() {
   const isLoggedIn = useAuthStore(state => state.isLoggedIn);
   const login = useAuthStore(state => state.login);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    
    const handleLogin = async () => {

        const password = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256, formData.password);

        try {
            let user = JSON.parse(await AsyncStorage.getItem('user')); // Declare user variable, parse JSON string received from AsyncStorage

            if (formData.email === user.email && password === user.password) {
                alert("User successfully authenticated!");
                login();
            } else {
                alert("Email and password combination not recognized!");
            }

        } catch (error) {
            console.error(error);
        }

    };
    
    useEffect(() => { 
        const user = async () => { 
            return await GetUser();
        }
        user();
    }, []);
       

    return (
        <>
            <View style={styles.containerStyles}>
                {isLoggedIn ? (
                    <>
                       
                    </>
                ) : (
                    <>
                    <View>
                        <Text style={styles.headerText}>Login</Text>

                        <TextInput
                            label="Email"
                            left={<TextInput.Icon icon="account" />}
                            style={styles.inputStyle}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                        />


                        <TextInput
                            label="Password"
                            left={<TextInput.Icon icon="eye" />}
                            style={styles.inputStyle}
                            onChangeText={(text) => setFormData({ ...formData, password: text })}
                            secureTextEntry={true}
                        />

                        <Button style={styles.buttonStyle} mode="contained" textColor="black" buttonColor="yellow" onPress={handleLogin}>Login</Button>
                        </View>
                    </>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    containerStyles: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 20,
        position: 'relative',
        zIndex: 5000,
        backgroundColor: 'beige',
        paddingLeft: 20,
        paddingTop: 20,
        height: '100%',
    },
    inputStyle: {
        width: '80%',
        marginBottom: 30,
    },
    textStyles: {
        fontSize: 28,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonStyle: {
        backgroundColor: 'lightblue',
        display: 'flex',
        alignSelf: 'flex-start',
        marginBottom: 50,
        marginTop: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        color: 'black',
    },
    buttonText: {
        fontSize: 24,

    }
});