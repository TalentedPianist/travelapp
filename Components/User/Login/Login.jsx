import GithubAuth from './GithubAuth';
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
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});


    const handleLogin = () => {
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Form submission logic here
            setErrors({}); // Clear error array if all fields are valid - better UI experience
            console.log(formData.password);
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
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



// https://static.enapter.com/rn/icons/material-community.html
// https://medium.com/@rutikpanchal121/building-a-robust-form-in-react-native-with-react-hook-form-and-zod-for-validation-7583678970c3
return (
    <>
        <View style={styles.containerStyles}>
            <SafeAreaProvider>
                <SafeAreaView>
                    <Text style={styles.headerText}>Login</Text>

                    <TextInput 
                        label="Email"
                        left={<TextInput.Icon icon="account" />}
                        style={styles.inputStyle}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                    />
                    {errors.email && <Text>{errors.email}</Text>}

                    <TextInput
                        label="Password"
                        left={<TextInput.Icon icon="eye" />}
                        style={styles.inputStyle}
                        onChangeText={(text) => setFormData({ ...formData, password: text})}
                    />
                    {errors.password && <Text>{errors.password}</Text>}

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