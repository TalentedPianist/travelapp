import GoogleAuth from './GoogleAuth';
import GithubAuth from './Login/GithubAuth';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { compare, hash } from 'react-native-simple-bcrypt';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

const isValidName = (name) => name.trim() === '';
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isStrongPassword = (password) => password.length >= 6 && /\d/.test(password);

export default function Login() {
    const [name, onChangeName] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const nameError = isSubmitted && !isValidName(name);
    const emailError = isSubmitted && !isValidEmail(email);
    const passwordError = isSubmitted && !isStrongPassword(password);
    

   const handleLogin = () => { 
        setIsSubmitted(true);
        if (!nameError && !emailError && !passwordError) { 
            console.log('Form submitted successfully!');
            // Add user to AsyncStorage
        }
    };

    
        

    // https://static.enapter.com/rn/icons/material-community.html
    // https://medium.com/@rutikpanchal121/building-a-robust-form-in-react-native-with-react-hook-form-and-zod-for-validation-7583678970c3
    return (
        <>
            <View style={styles.containerStyles}>
                <SafeAreaProvider>
                    <SafeAreaView>
                        <Text style={styles.headerText}>Login</Text>

                        <TextInput 
                            label="Name"
                            value={name}
                            left={<TextInput.Icon icon="account" />}
                            style={styles.inputStyle}
                            name="name"
                            onChangeText={name => onChangeName(name)}
                        />

                        <HelperText type="error" visible={nameError}>
                            Please enter your name.
                        </HelperText>

                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={email => onChangeEmail(email)}
                            left={<TextInput.Icon icon="email" />}
                            style={styles.inputStyle}
                            name="email"
                        />
                        <HelperText type="error" visible={emailError}>
                            Please enter a valid email address.
                        </HelperText>


                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={password => onChangePassword(password)}
                            left={<TextInput.Icon icon="eye" />}
                            style={styles.inputStyle}
                            secureTextEntry={true}
                            name="password"
                        />
                        
                        <HelperText type="error" value={password} onChangeText={onChangePassword} visible={passwordError}>
                            Password must be at least 6 characters long and include a number.
                        </HelperText>
               
                        <TouchableOpacity onPress={handleLogin} style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

              
                        <GithubAuth />
                    </SafeAreaView>
                </SafeAreaProvider>

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
    buttonStyle:  {
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