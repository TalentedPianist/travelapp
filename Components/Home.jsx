import { FlatList, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useRef } from 'react';
import City from './BookingForm/City';
import FromDate from './BookingForm/FromDate';
import ToDate from './BookingForm/ToDate';
import NoOfGuests from './BookingForm/NoOfGuests';
import NoOfRooms from './BookingForm/NoOfRooms';
import SelectHotel from './BookingForm/SelectHotel';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import moment from 'moment';
import HotelModal from './BookingForm/HotelModal';



export default function Home({ sendDataToParent }) {

    const [city, setCity] = useState("");
    const [fromDate, setFromDate] = useState(); // Set date in case user submits without selecting 
    const [toDate, setToDate] = useState(); // Set date in case user submits without selecting
    const [noOfGuests, setNoOfGuests] = useState();
    const [noOfRooms, setNoOfRooms] = useState(0);
    const [entityId, setEntityId] = useState();
    const formRef = useRef();
    const hotelsRef = useRef();
    const [loading, setLoading] = useState(false); // Define loading state for activity indicator
    const [hotelsList, setHotelsList] = useState([]); // Be sure to define the array correctly!
    const [isVisible, setIsVisible] = useState(true);


    const handleDataFromChild = (data) => {
        // Here we need to handle the data sent from child components so that the parent component doesn't refresh.  If the parent components refresh, input components loose their value.
        if (!data || !data.component) {
            // First, check to make sure data is valid.  
            //console.error('Invalid data received from child: ', data);
            return;
        }

        if (data.component === 'City') {
            setCity(data.name)
            setEntityId(data.entityId);
            console.log(data.name);
        }
        if (data.component === 'FromDate') {
            setFromDate(data.fromDate);
        }
        if (data.component === 'ToDate') {
            setToDate(data.toDate);
        }
    };



    const handleSubmit = async () => {
        // This suddenly stopped working because of a variable that doesn't exist.

        // Mention in the report that this only works with query params in the url rather than in axios options.

        // Things like misspelled variables can cause a silent error in JavaScript.
        await axios.get(`https://sky-scanner3.p.rapidapi.com/hotels/search?checkin=${moment(fromDate).format('YYYY-MM-DD')}&checkout=${moment(toDate).format('YYYY-MM-DD')}`, {
            headers: {
                'x-rapidapi-key': '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba',
                'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
            },
            params: {
                entityId: entityId,
                maxResults: 5,
            }
        }).then((res) => {
            setHotelsList(res.data.data.results.hotelCards);


        }).then((err) => console.error(err));
    }


    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('hotel');
                if (value === true) {
                    setIsVisible(true);
                    setHotelsList(value);
                    
                } else {
                    setIsVisible(false);
                }

            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        };
        getData();
    }, []);

    const PAGE_SIZE = 5;

    const handleSave = async (item) => {
        await AsyncStorage.setItem('hotel', JSON.stringify(item));
    }

    const hotelExists = async () => {
        let result = await AsyncStorage.getItem('hotel');
        console.log(result);
    }
    hotelExists();

    return (
        <>
            {isVisible &&
                <ScrollView style={styles.container} ref={formRef}>
                    <View style={styles.hotelsList}>
                        {hotelsList && hotelsList.map((item, index) => {
                            return (
                                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start', textAlign: 'left', flexWrap: 'wrap', gap: 20, borderBottomWidth: 1, width: '10)%' }}>


                                    <Text style={styles.hotelsListText}>{item.name}</Text>
                                    <View style={{ flexDirection: 'row', gap: 20 }}>
                                        <HotelModal />
                                        <TouchableOpacity onPress={() => handleSave(item)} style={{ backgroundColor: 'lightgrey', paddingTop: 10, paddingLeft: 10, paddingBottom: 10, paddingRight: 10, }}>
                                            <Text>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                    <Text style={styles.headerText}>Find a Hotel</Text>



                    <>
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
                    </>

                </ScrollView>
            }
            {!isVisible &&
        
                <> 
                {hotelsList.map((item, index) => { 
                    console.log(item.name);
                    return(
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    )
                })}
                </>
            }

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 0,
        backgroundColor: 'lightgreen',
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
    },
    scrollViewContentContainer: {
        paddingVertical: 20,
        alignItems: 'flex-start',
    },
    hotelsList: {
        backgroundColor: 'lightgreen',
        display: 'flex',
        justifyContent: 'space-evenly',
        height: '100%',
        flex: 1,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
    },
    hotelsListText: {
        fontSize: 18,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
    },
    viewButton: {
        backgroundColor: 'beige',
        alignSelf: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 20,

    }
});
