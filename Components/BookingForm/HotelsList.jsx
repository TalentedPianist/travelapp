import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Text, Divider, ActivityIndicator, Button } from 'react-native-paper';
import HotelModal from './HotelModal';
import { useNavigation } from '@react-navigation/native';
import BookingFormComponent from './BookingFormComponent';
import City from './City';
import FromDate from './FromDate';
import ToDate from './ToDate';
import NoOfGuests from './NoOfGuests';
import NoOfRooms from './NoOfRooms';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HotelsList({ children }) {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const cityRef = useRef("");
    const fromDateRef = useRef(); // Set date in case user submits without selecting 
    const toDateRef = useRef(); // Set date in case user submits without selecting
    const noOfGuestsRef = useRef(0);
    const noOfRoomsRef = useRef(0);
    const entityIdRef = useRef();
    const [hotelsList, setHotelsList] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const validateForm = () => {
        let errors = {};

        // Validate city field
        if (!cityRef.current.id) {
            errors.city = "City is required.";
        }
        // Validate checkin field
        if (!fromDateRef.current) {
            errors.fromDate = "Checkin is required";
        }
        // Validate checkout field
        if (!toDateRef.current) {
            errors.toDate = "Checkout is required";
        }

        // Set the errors and update form validity
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    const handleSubmit = async () => {
        setHasSubmitted(true);
        validateForm();
        if (hasSubmitted) {

            const fromDate = fromDateRef.current.fromDate;
            const toDate = toDateRef.current.toDate;
            console.log(toDate);

            const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
            const formattedToDate = moment(toDate).format('YYYY-MM-DD');
            const id = cityRef.current.id;

            const options = {
                method: 'GET',
                url: 'https://skyscanner89.p.rapidapi.com/hotels/list',
                params: {
                    entity_id: id,
                    checkin: formattedFromDate,
                    checkout: formattedToDate,
                    adults: 1,
                },
                headers: {
                    'x-rapidapi-key': '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba',
                    'x-rapidapi-host': 'skyscanner89.p.rapidapi.com'
                }
            };

            try {
                setLoading(true);
                const response = await axios.request(options);
                setLoading(false);
                //console.log(response);
                setHotelsList(response.data.results.hotelCards);

            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('Errors have occurred.  Please fix them.');
        }
    }


    // Syntax for NoOfRooms ref was messed up, causing hours of pain. Working now.
    return (
        <>


            <FlatList
                data={hotelsList}
                ItemSeparatorComponent={() => {
                    return (
                        <View>
                            <Divider style={{ color: 'black' }} />
                        </View>
                    );
                }}
                ListEmptyComponent={() => {
                    return (
                        <>
                            <View style={styles.emptyContainer}>
                                <Text variant="" style={styles.emptyTextStyle}>Find your next great city break!</Text>
                            </View>
                        </>
                    );
                }}
                renderItem={({ item, index }) => {

                    return (
                        <View style={styles.hotelsList}>

                            <Text style={styles.hotelsListText}>{item.name}</Text>
                            <View style={styles.buttonsView}>

                                <HotelModal name={item.name} distance={item.distance} image={item.images[0]} price={item.lowestPrice.price} id={item.id} />

                            </View>
                        </View>

                    )
                }}
                ListFooterComponent={() => {
                    return (
                        <>

                            <View style={styles.container}>

                                {loading && <ActivityIndicator animated={true} size="large" />}

                                <View>
                                    <Text variant="headlineMedium">Find a Hotel</Text>
                                </View>



                                <View style={styles.firstRow}>
                                    <City childToParent={(data) => { cityRef.current = data; }} />
                                    {hasSubmitted && errors.city && <Text>{errors.city}</Text>}
                                </View>
                                <View style={styles.secondRow}>
                                    <FromDate childToParent={(data) => { fromDateRef.current = data; }} />
                                    {hasSubmitted && errors.fromDate && <Text>{errors.fromDate}</Text>}
                                    <ToDate childToParent={(data) => { toDateRef.current = data; }} />
                                    {hasSubmitted && errors.toDate && <Text>{errors.toDate}</Text>}
                                </View>
                                <TouchableOpacity onPress={handleSubmit} style={styles.searchButton}>
                                    <Text variant="headlineMedium" style={styles.searchText}>Search</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    );
                }}
                extraData={{}}
            />

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 0,
        flexGrow: 0,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        height: '100%',
        minHeight: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    hotelsList: {
        backgroundColor: 'lightgreen',
        flexDirection: 'column',
        flexGrow: 1,
        paddingLeft: 20,
        paddingRight: 20,
        gap: 0,
    },
    hotelsListText: {
        fontSize: 20,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    viewButton: {
        backgroundColor: 'beige',
        alignSelf: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,


    },
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 0,

    },
    footer: {

    },
    buttonsView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: 'lightgray',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        alignSelf: 'flex-start',
    },
    headerText: {
        fontSize: 28,
    },
    emptyContainer: {

    },
    emptyText: {
        fontSize: 24,
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
        flexDirection: 'column',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        gap: 20,
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
        alignSelf: 'flex-start',

    },
    searchText: {
        fontSize: 20,
    },
    emptyTextStyle: {
        backgroundColor: 'lightgreen',
        fontSize: 26,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
