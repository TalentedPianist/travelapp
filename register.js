import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

export default function Register() { 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async () => { 
        console.log(name);
        try { 
            const user = { 'name': name, 'email': email, 'password': password };
           
        } catch (error) { 
            console.log(error);
        }
    }

    return(
        <>
            <Text style={styles.registerHeader}>Sign up for your new Account</Text>
           <SafeAreaProvider>
                <SafeAreaView style={styles.registerContainer}>
                    <TextInput
                        onChangeText={setName}
                        placeholder="Your name"
                        inputMode="text"
                        autoComplete="name"
                        style={styles.inputStyles}
                    />
                    <TextInput
                        onChangeText={setEmail}
                        placeholder="Your email"
                        inputMode="email" 
                        autoComplete="email"
                        style={styles.inputStyles}
                    />
                    <TextInput
                        onChangeText={setPassword}
                        placeholder="Your password"
                        inputMode="text"
                        secureTextEntry={true}
                        autoComplete="new-password"
                        style={styles.inputStyles}
                    />
                   <TouchableOpacity 
                        style={styles.buttonStyle}
                        onPress={handleSubmit}
                        >
                            <Text style={styles.buttonTextStyle}>Register</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
}

const styles = StyleSheet.create({ 
    registerHeader: { 
        fontSize: 28,
        fontStyle: 'bold',
        backgroundColor: 'orange',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    registerContainer:  {
        backgroundColor: 'orange',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 30,
        height: '100%',
        paddingLeft: 20,
        paddingTop: 20,
    }, 
    textStyles: { 
        fontSize: 28,
        marginBottom: 20
    }, 
    inputStyles: { 
        width: '90%',
        display: 'flex',
        paddingLeft: 20,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        fontSize: 28,
        fontColor: 'black',
    }, 
    buttonStyle: { 
        display: 'flex',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'blue',
        padding: 20,
        fontSize: 32,
    }, 
    buttonTextStyle: { 
        color: 'white',
        fontSize: 28,
    }
});