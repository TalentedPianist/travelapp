import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSessionStore from '../../../useSessionStore';

// https://react-native-async-storage.github.io/async-storage/docs/install/#android--ios

WebBrowser.maybeCompleteAuthSession();

const clientId = 'Ov23lilqctakthCXlwyV';
const clientSecret = 'fdeef6d351977c235508a87af793ad5577298ad1';

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: `https://github.com/settings/connections/applications/${clientId}`
};

export default function GithubAuth() {
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: clientId,
            scopes: ['read:user, read:email'],
            redirectUri: makeRedirectUri({
                scheme: 'exp://192.168.0.37:8081'
            }),
        },
        discovery
    );

    useEffect(() => {

        if (response?.type === 'success') {
            const { code } = response.params;
            exchangeCodeForToken(code);
        }
    }, [response]);

    const exchangeCodeForToken = async (code) => {
        try {
            const response = await axios.post('https://github.com/login/oauth/access_token', {
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
                redirect_uri: 'exp://192.168.0.62:8081',
            }, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            console.log(response.data);
            getUser(response.data.access_token);
            return response.data.access_token;
        } catch (error) {
            console.error(error);
        };
    }

    // https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app
    const getUser = async (token) => {
        try {
            const response = await axios.get(`https://api.github.com/user`, {
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": `Bearer ${token}`, // Syntax issue caused error 401

                }
            })
            const data = await response.data;
            console.log(data);

            // Save user data to AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(data));
            // Add user to Zustand state
            

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => {
            promptAsync();
        }}>
            <Text style={styles.buttonText}>Login with Github</Text>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    githubContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
       
    },
    buttonStyle: {
        display: 'flex',
        alignSelf: 'flex-start',
        backgroundColor: 'lightblue',
        paddingTop: 5, 
        paddingBottom: 5, 
        paddingLeft: 5, 
        paddingRight: 5,
    },
    buttonText: { 
        fontSize: 24,
    }
});