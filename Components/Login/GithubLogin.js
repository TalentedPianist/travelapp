import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const clientId = 'Ov23lilqctakthCXlwyV';

const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: `https://github.com/settings/connections/applications/${clientId}`
}

export default function GithubLogin() { 
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: clientId,
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                scheme: 'your.app',
            }),
        },
        discovery
    );

    useEffect(() => { 
        if (response?.type === 'success') { 
            const { code } = response.params;
            console.log(code);
        }
    }, [response]);


    return (
        <>
            
            <TouchableOpacity style={styles.githubButton} onPress={() => {
                 promptAsync();
            }}>
                <Text style={styles.githubText}>Login with GitHub</Text>
            </TouchableOpacity>
            
        </>
    );
}

const styles = StyleSheet.create({ 
    githubContainer: { 
        display: 'flex', 
        
    },
    githubButton: { 
        backgroundColor: 'lightblue',
        display: 'flex',
        alignSelf: 'flex-start',
    }, 
    githubText: { 
        fontSize: 28,
    },
});