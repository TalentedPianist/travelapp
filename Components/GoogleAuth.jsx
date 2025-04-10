import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ANDROID_CLIENT_ID, WEB_CLIENT_ID, IOS_CLIENT_ID } from '@env';
import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// client ids from .env
const config = {
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
}

export default function GoogleAuth() {
    const [userInfo, setUserInfo] = useState();
    const [request, response, promptAsync] = Google.useAuthRequest(config);

    // Function to get user info from token
    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const user = await response.json();
            await AsyncStorage.setItem("user", JSON.stringify(user));
            setUserInfo(user);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to handle Google sign-in
    const signInWithGoogle = async () => {
        try {
            const userJSON = await AsyncStorage.getItem("user");
            if (userJSON) {
                setUserInfo(JSON.parse(userJSON));
            } else if (response?.type === "success" && response?.authentication?.accessToken) {
                getUserInfo(response.authentication.accessToken);
            }
        } catch (error) {
            console.error("Error retrieving user data from AsyncStorage", error);
        }
    };

    // Trigger sign-in logic when response changes
    useEffect(() => {
        signInWithGoogle();
    }, [response]);

    // Log user info for debugging
    console.log(JSON.stringify(userInfo));

    return (
        <View style={styles.containerStyles}>

            <TouchableOpacity onPress={() => promptAsync()}>
                <Text style={styles.textStyles}>Login with Google</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({ 
    containerStyles:  {
        backgroundColor: 'orange',
    },
    buttonStyles: { 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',

    },
    textStyles: { 
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'lightblue',
        marginTop: 50,
        marginLeft: 20,
        marginBottom: 20,
        alignSelf: 'flex-start',
        fontSize: 22,
    }
});
