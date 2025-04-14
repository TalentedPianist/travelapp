import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, createContext } from 'react';
import City from './BookingForm/City';
import FromDate from './BookingForm/FromDate';

const BookingFormContext = createContext();

export default function Home() {

    const [city, setCity] = useState("");
    const [fromDate, setFromDate] = useState("");

    const handleDataFromChild = (data) => {
        console.log("Received data from child: ", data);
        setCity(data);
    };

    return (
        <View style={styles.container}>

            <City sendDataToParent={handleDataFromChild} />
          

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 0,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'lightgreen',
        height: '100%',
    },
    countText: {
        fontSize: 24,
        marginBottom: 20,
    }
});
