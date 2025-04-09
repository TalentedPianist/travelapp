// This is the root layout and represents the entry point for the apps navigation.

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useCallback } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import { Text, View } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options.  Makes it more engaging.


export default function SplashScreenHolder() { 
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => { 
        async function prepare() {
            try  {
                // Pre-load fonts, make any api calls and get other functionality ready here
                await Font.loadAsync(Entypo.font);
                // Artificially delay for two seconds to simulate a slow loading experience.
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) { 
                console.warn(e);
            } finally { 
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(() => { 
        if (appIsReady) { 
            // This tells the splash screen to hide immediately!  If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is 
            // loading its initial state and rendering its first pixels.  So instead, 
            // we hide the splash screen once we know the root view has already 
            // performed layout.
            SplashScreen.hide();
        }
    }, [appIsReady]);

    if (!appIsReady) { 
        return null;
    }
             
    return (
        <View 
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onLayout={onLayoutRootView}>
                <Text>SplashScreen Demo!</Text>
                <Entypo name="rocket" size={30} />
        </View>
    );

}