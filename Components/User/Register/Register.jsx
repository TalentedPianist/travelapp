import GithubAuth from '../Login/GithubAuth';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useRef } from 'react';
import { TextInput, HelperText, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';
import { useAuth } from '../../../AuthContext';
import { ActivityIndicator } from 'react-native-paper';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default function Register() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isLoggedIn, login } = useAuth();

    const handleRegister = async () => {
        validateForm();
        if (isFormValid) {
            console.log('Submit button was clicked');
            // Form is valid, perform the submission logic
            try {
                const securePassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password); // Hash password using SHA256 with expo-crypto
                await AsyncStorage.setItem('user', JSON.stringify({ 'name': name, 'email': email, 'password': securePassword })); // Add new user to AsyncStorage
                setLoadingd(false);
                alert('User successfully registered');
                navigation.navigate('Login'); // Redirect to Profile screen
                
            } catch (e) {
                console.log(e);
            }

        } else {
            // Form is invalid, display error messages
            console.log('Form contains errors');
        }
    };

    const validateForm = () => {
        let errors = {};

        // Validate name field
        if (!name) {
            errors.name = 'Name is required';
        }

        // Validate email field
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        // Validate password field
        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }

        // Set the errors and update form validity
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    }

    return (
        <>
            <DismissKeyboard>
                <View style={styles.containerStyles}>
                    {loading && <ActivityIndicator size={large} animating={true} /> }
                    <Text style={styles.headerText}>Register</Text>

                    <TextInput
                        label="Name"
                        left={<TextInput.Icon icon="account" />}
                        style={styles.inputStyle}
                        name="name"
                        onChangeText={setName}
                    />
                    {errors.name && <Text>{errors.name}</Text>}

                    <TextInput
                        label="Email"
                        left={<TextInput.Icon icon="email" />}
                        style={styles.inputStyle}
                        name="email"
                        onChangeText={setEmail}
                        autoComplete="email"
                    />
                    {errors.email && <Text>{errors.email}</Text>}

                    <TextInput
                        label="Password"
                        left={<TextInput.Icon icon="eye" />}
                        style={styles.inputStyle}
                        secureTextEntry={true}
                        name="password"
                        onChangeText={setPassword}
                    />
                    {errors.password && <Text>{errors.password}</Text>}

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
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    buttonText: {
        fontSize: 24,

    }
});