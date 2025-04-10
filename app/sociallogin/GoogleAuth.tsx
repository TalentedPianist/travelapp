import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ANDROID_CLIENT_ID } from '@env';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// client ids from .env
const config = {
    androidClientId: ANDROID_CLIENT_ID,
}



export default function GoogleAuth() {
    const [userInfo, setUserInfo] = useState();
    const [request, response, promptAsync] = Google.useAuthRequest(config);

    // Function to get user info from token
    const getUserInfo = async (token: string) => {
        // absent token
        if (!token) return;
        // present token
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            const user = await response.json();
            // store user information in Asyncstorage
            await AsyncStorage.setItem("user", JSON.stringify(user));
            setUserInfo(user);
        } catch (error) {
            console.log(error);
        }

        const signInWithGoogle = async () => {
            try {
                // Attempt to retrieve user information from AsyncStorage
                const userJSON = await AsyncStorage.getItem("user");

                if (userJSON) {
                    // If user information is found in AsyncStorage, parse it and set it in the state
                    setUserInfo(JSON.parse(userJSON));
                } else if (response?.type === "success") {
                    // If no user information is found and the response type is "success" (assuming response is defined),
                    // call getUserInfo with the access token from the response

                    // Also check for null before trying to get the response
                    if (response?.authentication?.accessToken) {
                        getUserInfo(response.authentication.accessToken);
                    }
                }
            } catch (error) {
                // Handle any errors that occur during AsyncStorage retrieval or other operations
                console.error("Error retrieving user data from AsyncStorage", error);
            }
        };

        // add it to a useEffect with response as a dependency
        useEffect(() => {
            signInWithGoogle();
        }, [response]);

        // log the userInfo to see user details
        console.log(JSON.stringify(userInfo));


        return (
            <>
                <Button title="Sign in with Google" onPress={() => { promptAsync() }} />
            </>
        );
    }
}