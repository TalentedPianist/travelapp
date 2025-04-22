import GithubAuth from './GithubAuth';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput, HelperText, Button } from 'react-native-paper';
import * as Crypto from 'expo-crypto';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../../../AuthContext';


const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : [];
}

export default function Login() {
    const navigation = useNavigation();
    const { isLoggedIn, login } = useAuth(); // Define isLoggedIn constant variable from useAuth() context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const handleLogin = async () => {
        validateForm();
        // authContext login function must be declared at the top else it wil crash (nothing will happen).
        if (isFormValid) {
            const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);

            try {
                await login({ email: email, password: digest });
            } catch (e) { 
                console.log(e);
            }
        } else { 
            console.log('Form has errors.  Please correct them.');

        }
        
    };

const validateForm = () => {
    let errors = {};

    // Validate email field
    if (!email) {
        // Check if email field is empty
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        // Check if email address is valid 
        errors.email = 'Email is invalid.';
    }

    // Validate password field
    if (!password) {
        errors.password = 'Password is required';
    }

    // Set the errors and update from validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
};

useEffect(() => {
    const user = async () => {
        return await getUser();
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
                       { console.log(errors)}

                        <TextInput
                            label="Email"
                            left={<TextInput.Icon icon="account" />}
                            style={styles.inputStyle}
                            onChangeText={(text) => setEmail(text)}
                            autoComplete="email"
                        />
                        { errors.email && <Text>{errors.email}</Text> }

                        <TextInput
                            label="Password"
                            left={<TextInput.Icon icon="eye" />}
                            style={styles.inputStyle}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        />

                        {errors.password && <Text>{errors.password}</Text>}

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