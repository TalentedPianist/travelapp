import { View, Text, StyleSheet, Button, ScrollView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, createContext } from 'react';
import City from './BookingForm/City';
import FromDate from './BookingForm/FromDate';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const BookingFormContext = createContext();

export default function Home({ sendDataToParent }) {

    const [city, setCity] = useState("");
    const [fromDate, setFromDate] = useState("");

    const handleDataFromChild = (data) => {
        console.log(data.component);
    };

    console.log('Home component rendered');
    return (
        <>
            <View style={styles.container}>

                <City sendDataToParent={handleDataFromChild} />
                <FromDate sendDataToParent={handleDataFromChild} />

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 20,
        height: '100%',
        width: '100%',
        backgroundColor: 'lightgreen',
    },
  
});
