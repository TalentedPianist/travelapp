import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const clientId = 'Ov23lilqctakthCXlwyV';

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: `https://github.com/settings/connections/applications/${clientId}`,
}

export default function GithubAuth() {
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: clientId,
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                scheme: 'your.app'
            }),
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            
        }
    }, [response]);

    if (response?.type === 'success') {
        
    } else {
        return (
            <Button
                disabled={!request}
                title="Login with Github"
                onPress={() => {
                    promptAsync();
                }}
            />
        );
    }
}