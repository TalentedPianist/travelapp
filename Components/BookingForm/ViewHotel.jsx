import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewHotel() {

    const [hotel, setHotel] = useState(); // The issue was because of empty arrays in variable.  The variable is undefined.  Props need to be passed.
    const [refresh, setRefresh] = useState(false);
    const navigation = useNavigation();


    async function hotelExists() {
        let h = await AsyncStorage.getItem('hotel');
        if (h) {
            setHotel(JSON.parse(h));
        }

    }
   
    const handleDelete = async ({ navigation }) => {
        await AsyncStorage.removeItem('hotel');
        setHotel({});
        navigation.addListener('focus', () => { 
            console.log('reloaded');
        });
    }

    useEffect(() => {
        hotelExists();
    }, [refresh]);

    // Question mark after hotel variable worked.
    return (

        <View style={styles.hotelView}>

            <Text style={styles.hotelName}>{hotel?.name}</Text>
            <Image style={styles.hotelImage} source={{ uri: hotel?.image }} />
            <Text style={styles.distanceText}>{hotel?.distance}</Text>
            <Text style={styles.priceText}>{hotel?.price}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    hotelView: {
        backgroundColor: 'lightgreen',
        height: '100%',
        gap: 50,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    hotelName: {
        fontSize: 28,
    },
    hotelImage: {
        width: 350,
        height: 250,
    },
    distanceText: {
        fontSize: 28,
    },
    priceText: {
        fontSize: 26,
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    deleteText: {
        fontSize: 28,
        color: 'white',
    }
});
