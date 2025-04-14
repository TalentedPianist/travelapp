import { View, Text, StyleSheet, Button, ScrollView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, createContext } from 'react';
import City from './BookingForm/City';
import FromDate from './BookingForm/FromDate';
import ToDate from './BookingForm/ToDate';
import NoOfGuests from './BookingForm/NoOfGuests';
import NoOfRooms from './BookingForm/NoOfRooms';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';


export default function Home({ sendDataToParent }) {

    const [city, setCity] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [noOfGuests, setNoOfGuests] = useState();

    const handleDataFromChild = (data) => {
        
    };


    return (
        <>
            <View style={styles.container}>
                <View style={styles.firstRow}>
                    <City sendDataToParent={handleDataFromChild} />
                </View>
                <View style={styles.secondRow}>
                    <FromDate sendDataToParent={handleDataFromChild} />
                    <ToDate sendDataToParent={handleDataFromChild} />

                </View>
                <View style={styles.thirdRow}>
                    <NoOfGuests sendDataToParent={handleDataFromChild} />
                    <NoOfRooms sendDataToParent={handleDataFromChild} />
                </View>
                <View style={styles.fourthRow}>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        justifyContent: 'space-evenly',
        backgroundColor: 'lightgreen',
        gap: 10,
        paddingLeft: 10,
    },
    firstRow: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        display: 'flex',
        marginBottom: 20,
    },
    secondRow: {
        display: 'flex',
        flexDirection: 'row',
        flex: 0,
        alignItems: 'flex-start',
        width: '100%',
        gap: 50,
        marginBottom: 20,
    },
    thirdRow: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    fourthRow: {
        display: 'flex',
        flexDirection: 'row',
        flex: 0,
        alignItems: 'flex-start',
        width: '100%',

    }
});
