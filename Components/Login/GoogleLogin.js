import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const clientId = '100784437734-ed4u0lg903tpoh230793vsjb78pk4nr9.apps.googleusercontent.com';

export default function GoogleLogin() {
   
    const [userInfo, setUserInfo] = useState(null);

    const config = { 
        iosClientId: clientId,
    }

    const [request, response, promptAsync] = Google.useAuthRequest(config);

    const getUserInfo = async (token) => { 
        if (!token) return;
        try { 
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const user = await response.json();
            // store user information in AsyncStorage
            await AsyncStorage.setItem("user", JSON.stringify(user));
        } catch (error) { 
            console.error(
                "Failed to fetch user data:",
                response.status,
                response.statusText
            );
        }
    };

    // In the report, mention that it is easier to login the user with social media.

    const signInWithGoogle = async() => { 
        try { 
            // Attempt to retrieve user information from AsyncStorage
            const userJSON = await AsyncStorage.getItem("user");

            if (userJSON) { 
                // If user information is found in AsyncStorage, parse it and send it to the state
                setUserInfo(JSON.parse(userJSON));
            } else if (response?.type === "success") { 
                // If no user information is found and the response type is "success" (assuming response is defined), 
                // Call getUserInfo with the access token from the response
                getUserInfo(response.authentication.accessToken);
            }
        } catch (error) { 
            // Handle any errors that occur during AsyncStorageRetrieval or other operations
            console.error("Error retrieving user data from AsyncStorage:", error);
        } 

        // Add it to a useEffect with response as a dependency
        useEffect(() => { 
            signInWithGoogle();
        }, [response]);
    }

    return (
        <>
            <View style={styles.loginContainer}>
      
                <TouchableOpacity style={styles.googleButton} onPress={() => {promptAsync()}}>
                    <Text style={styles.googleButtonText}>Sign In With Google</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    loginHeader: { 
        fontSize: 32,
    },
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'orange',
        width: '100%',
        margin: 0,
        paddingTop: 20,
        paddingLeft: 20,
        height: 10,
    },
    googleButton: { 
        backgroundColor: 'lightblue', 
        display: 'flex',
        alignSelf: 'flex-start',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    googleButtonText: { 
        fontSize: 22,
    }
});
