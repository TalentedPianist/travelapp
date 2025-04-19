import GithubAuth from '../Login/GithubAuth';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useRef } from 'react';
import { TextInput, HelperText, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default function Register() {
    const navigation = useNavigation(); // This was in the wrong place, causing a silent crash every time the button is clicked.

    const getAllKeys = async () => {
        let keys = [];
        try {
            keys = await AsyncStorage.getAllKeys();
        } catch (e) {
            console.log(e);
        }
        console.log(keys);
    }

    const getUser = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            console.log(user);
        } catch (e) {
            console.error(e);
        }
    };


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const handleRegister = async () => {

        console.log('Register button clicked');
        const validationErrors = validateForm(formData);
        if (Object.keys(errors).length === 0) {
            console.log('Submit button pressed');
            const password = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256, formData.password); // Encrypt password using expo-crypto

            let user = await AsyncStorage.getItem('user');
            try {
                if (user !== null) {
                    alert("User already exists!");
                } else {
                    await AsyncStorage.setItem('user', JSON.stringify({ 'name': formData.name, 'email': formData.email, 'password': password }));
                    alert('User registration successful!');
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.error(error);
            }

        } else {
            setErrors(validationErrors);
        }

    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.name || data.name.trim() === "") {
            errors.name = "Name is required";
        }
        if (!data.email || data.email.trim() === "") {
            errors.email = "Email is required";
        } else if (!isValidEmail(data.email)) {
            errors.email = "Invalid email format";
        }
        if (!data.password || data.password.trim() === "") {
            errors.password = "Password is required";
        }
        return errors;
    }

    const isValidEmail = (email) => {
        // basic email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }


    // https://static.enapter.com/rn/icons/material-community.html
    // https://medium.com/@rutikpanchal121/building-a-robust-form-in-react-native-with-react-hook-form-and-zod-for-validation-7583678970c3
    return (
        <>
            <DismissKeyboard>
                <View style={styles.containerStyles}>

                    <Text style={styles.headerText}>Register</Text>

                    <TextInput
                        label="Name"
                        left={<TextInput.Icon icon="account" />}
                        style={styles.inputStyle}
                        name="name"
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                    />
                    <View>{errors.name && <Text>{errors.name}</Text>}</View>

                    <TextInput
                        label="Email"
                        left={<TextInput.Icon icon="email" />}
                        style={styles.inputStyle}
                        name="email"
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                        autoComplete="email"
                    />
                    <View>{errors.email && <Text>{errors.email}</Text>}</View>

                    <TextInput
                        label="Password"
                        left={<TextInput.Icon icon="eye" />}
                        style={styles.inputStyle}
                        secureTextEntry={true}
                        name="password"
                        onChangeText={(text) => setFormData({ ...formData, password: text })}
                    />
                    <View>{errors.password && <Text>{errors.password}</Text>}</View>

                    <TouchableOpacity style={styles.buttonStyle} onPress={handleRegister}>
                        <View><Text style={styles.textStyles}>Register</Text></View>
                    </TouchableOpacity>
                </View>
            </DismissKeyboard>
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
        backgroundColor: 'orange',
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
    },
    buttonText: {
        fontSize: 24,

    }
});