import GithubAuth from '../Login/GithubAuth';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { compare, hash } from 'react-native-simple-bcrypt';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput, HelperText, Button } from 'react-native-paper';

export default function Register() {
    const [formData, setFormData] = useState({ 
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const handleRegister = () => {
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Form submission logic here
            setErrors({}); // Clears error array if all fields are valid - better UI experience
            console.log(formData.password);
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
            <View style={styles.containerStyles}>
                <SafeAreaProvider>
                    <SafeAreaView>
                        <Text style={styles.headerText}>Register</Text>

                        <TextInput
                            label="Name"
                            left={<TextInput.Icon icon="account" />}
                            style={styles.inputStyle}
                            name="name"
                            onChangeText={(text) => setFormData({ ...formData, name: text })}
                        />
                        {errors.name && <Text>{errors.name}</Text>}

                        <TextInput
                            label="Email"
                            left={<TextInput.Icon icon="email" />}
                            style={styles.inputStyle}
                            name="email"
                            onChangeText={(text) => setFormData({ ...formData, email: text})}
                        />
                        {errors.email && <Text>{errors.email}</Text>}

                        <TextInput
                            label="Password"
                            left={<TextInput.Icon icon="eye" />}
                            style={styles.inputStyle}
                            secureTextEntry={true}
                            name="password"
                            onChangeText={(text) => setFormData({ ...formData, password: text})}
                        />
                        {errors.password && <Text>{errors.password}</Text>}

                        <TouchableOpacity onPress={handleRegister} style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>


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