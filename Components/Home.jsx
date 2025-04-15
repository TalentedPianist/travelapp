import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, createContext } from 'react';
import City from './BookingForm/City';
import FromDate from './BookingForm/FromDate';
import ToDate from './BookingForm/ToDate';
import NoOfGuests from './BookingForm/NoOfGuests';
import NoOfRooms from './BookingForm/NoOfRooms';
import SelectHotel from './BookingForm/SelectHotel';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import moment from 'moment';

export default function Home({ sendDataToParent }) {

    const [city, setCity] = useState("");
    const [fromDate, setFromDate] = useState(); // Set date in case user submits without selecting 
    const [toDate, setToDate] = useState(); // Set date in case user submits without selecting
    const [noOfGuests, setNoOfGuests] = useState();
    const [noOfRooms, setNoOfRooms] = useState(0);
    const [entityId, setEntityId] = useState();
    const [errors, setErrors] = useState({});
    const [cityError, setCityError] = useState("");
    const [fromError, setFromError] = useState("");
    const [toError, setToError] = useState("");
    const [hotels, setHotels] = useState();

    const handleDataFromChild = (data) => {
        if (data.component === 'City') {
            setCity(data.city);
            setEntityId(data.entityId);

        }

        if (data.component === 'FromDate') {
            let date = moment(data.fromDate).format('YYYY-MM-DD');
            setFromDate(date);
        }

        if (data.component === 'ToDate') {
            let date = moment(toDate).format('YYYY-MM-DD');
            setToDate(data.toDate);
        }

        if (data.component === 'NoOfGuests') {
            setNoOfGuests(data.noOfGuests);
        }

        if (data.component === 'NoOfRooms') {
            setNoOfRooms(data.noOfRooms);
        }


    };

    const ShowErrors = () => {
        console.log(errors);
        return (
            <>
            </>
        );
    }

    const handleSubmit = async () => {
        // const validationErrors = validateForm();
        // if (Object.keys(validationErrors).length === 0) { 
        //     // Form submission logic here
        //     console.log(entityId);
        // } else { 
        //     ShowValidationErrors(validationErrors);
        // }
        console.log(entityId);
        // Mention in the report that this only works with query params in the url rather than in axios options.
        // I need to use the flight API now since I understand it more and it makes sense with the time left.
        const options = { 
            method: 'GET', 
            url: `https://sky-scanner3.p.rapidapi.com/hotels/search`,
            params: { 
                entityId: entityId,
                checkin: fromDate, 
                checkout: toDate,
            },
            headers: { 
                'x-rapidapi-key': '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba',
                'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
            }
        };

        try { 
            const response = await axios.request(options);
          
           response.data.data.results.hotelCards.map(async (item, index) => { 
                //console.log(item['name']);
                const json = JSON.stringify(item);
                await AsyncStorage().setItem('hotels', item);
           });
        } catch (error) { 
            console.error(error);
        }
    }

    useEffect(() => { 
        (async() => {
            const hotels = await AsyncStorage.getItem('hotels');
            console.log(hotels);
        });
      
    }, []);

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.headerText}>Find a Hotel</Text>


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
                <TouchableOpacity onPress={handleSubmit} style={styles.searchButton}>
                    <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
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
        backgroundColor: 'lightgreen',
        paddingLeft: 20,
        paddingRight: 20,
        gap: 10,
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: 50,
        marginBottom: 20,
    },
    thirdRow: {
        display: 'flex',
        flexDirection: 'row',
        flex: 0,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
        gap: 50,
    },
    fourthRow: {
        display: 'flex',
        flexDirection: 'row',
        flex: 0,
        alignItems: 'flex-start',
        width: '100%',

    },
    dropdownList: {
        backgroundColor: 'orange',
        width: '100%',
    },
    searchButton: {
        backgroundColor: 'yellow',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    searchText: {
        fontSize: 20,
    },
    headerText: {
        fontSize: 30,
    }
});
