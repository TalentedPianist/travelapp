import * as Location from 'expo-location';
import { useState, useEffect, useRef } from 'react';
import { View, StatusBar, FlatList, Text, Button, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';

// Geolocation tutorial - https://snack.expo.dev/@psalva/dwt---todo-storage-and-geolocation

export default function LocationComponent() {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();



    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            console.log('Permission to access location was granted.');
            fetchLocation();
        })();
    }, []);

    const fetchLocation = async () => {
        setLoading(true);
        try {
           
            let locationData = await Location.getCurrentPositionAsync();
            console.log(locationData);
            setLocation(locationData);
        } catch (error) {
            setErrorMessage('Error fetching location');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="purple" />;
    }

    if (location) {
        return (
            <ScrollView style={styles.container}>
                <Text>{location.coords.latitude}</Text>

                <MapView
                    style={styles.map}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="You are here"
                    />
                </MapView>
                <Button title="Get location" onPress={fetchLocation} />
            </ScrollView>
        );
    } else { 
        return (
            <View>
                <Button title="Get Location" onPress={fetchLocation} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        minHeight: '100%',
    },
    map: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 400,
        width: '90%',
    }
});