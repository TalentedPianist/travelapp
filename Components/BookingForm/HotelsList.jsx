import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Text } from 'react-native-paper';
import HotelModal from './HotelModal';
import { useNavigation } from '@react-navigation/native';
import BookingFormComponent from './BookingFormComponent';
import City from './City';
import FromDate from './FromDate';
import ToDate from './ToDate';
import NoOfGuests from './NoOfGuests';
import NoOfRooms from './NoOfRooms';

export default function HotelsList({ children }) {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [city, setCity] = useState("");
    const [fromDate, setFromDate] = useState(); // Set date in case user submits without selecting 
    const [toDate, setToDate] = useState(); // Set date in case user submits without selecting
    const [noOfGuests, setNoOfGuests] = useState();
    const [noOfRooms, setNoOfRooms] = useState(0);
    const [entityId, setEntityId] = useState();
    const [hotelsList, setHotelsList] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const submitRef = useRef();


    const handleDataFromChild = useCallback((data) =>  {
   
        if (!data || !data.component) return;

        if (data.component === 'City') { 
            setCity(data.title); // THis was data.name, maybe the reason for undefined error?
            setEntityId(data.entityId);
        }

        if (data.component === 'FromDate') { 
       
            setFromDate(data.fromDate);
        } 

        if (data.component === 'ToDate') { 
            setToDate(data.toDate);
        }
    }, []); 


    const handleSubmit = async () => {
        console.log({ city, fromDate, toDate });
        
    

        const apiUrl = `https://skyscanner89.p.rapidapi.com/hotels/list?entity_id=${entityId}&checkin=${moment(fromDate).format('YYYY-MM-DD')}&checkout=${moment(toDate).format('YYYY-MM-DD')}&per_page=5`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba',
                'x-rapidapi-host': 'skyscanner89.p.rapidapi.com',
            }
        };
        // There seems to be a problem with axios randomly not getting data even though it worked before.  fetch API is a lot nicer and just works.
        try {
            //setLoading(true);
            const response = await fetch(apiUrl, options);


            const data = await response.json(); // This line is the key to getting it working.  Explain in report that it needs await.  Fetch seems to be faster too.
            //console.log(data.results.hotelCards);
            setHotelsList(data.results.hotelCards);
        } catch (error) {
            console.error(error);
        }
    }


    const handleSave = async (item) => {
        try {
            await AsyncStorage.setItem('hotel', JSON.stringify(item));
            const result = JSON.parse(await AsyncStorage.getItem('hotel')); // JSON.parse() is very important!!! Mention in report.
            console.log(result.name);
            navigator.navigate('/Home');
        } catch (e) {
            console.log(e);
        }
    }


    const getHotels = async (city) => {
        const url = `https://skyscanner89.p.rapidapi.com/hotels/auto-complete?query=${q}`;
        const options = { 
            method: 'GET',
            headers: { 
                'x-rapidapi-key': '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba',
                'x-rapidapi-host': 'skyscanner89.p.rapidapi.com',
            }
        };

        try { 
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
        } catch (error)  {
            console.log(error);
        }
    }


    return (
        <>


            <FlatList
                
                ListEmptyComponent={() => {
                    return (
                        <>
                            <View style={styles.emptyContainer}>
                                <Text variant="" style={{ backgroundColor: 'yellow' }}>Find your next great city break!</Text>
                            </View>
                        </>
                    );
                }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.hotelsList}>

                            <Text style={styles.hotelsListText}>{item.name}</Text>
                            <View style={styles.buttonsView}>
                                <TouchableOpacity>
                                    <Text style={styles.viewButton}>View</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleSave(item)}>
                                    <Text style={styles.saveButton}>Save</Text>
                                </TouchableOpacity>
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
                                    <City sendDataToParent={handleDataFromChild}  />

                                </View>
                                <View style={styles.secondRow}>
                                    <FromDate sendDataToParent={handleDataFromChild} />
                                    <ToDate sendDataToParent={handleDataFromChild} />

                                </View>
                                <View style={styles.thirdRow}>
                                    <NoOfGuests sendDataToParent={handleDataFromChild} />
                                    <NoOfRooms />
                                </View>
                                <TouchableOpacity onPress={handleSubmit} ref={submitRef} style={styles.searchButton}>
                                    <Text style={styles.searchText}>Search</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    );
                }}
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
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-beetween',
        gap: 30,
        paddingBottom: 30,
    },
    hotelsList: {
        backgroundColor: 'lightgreen',
        flex: 0,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,

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
        fontSize: 38,
    },
    emptyContainer: {
        height: 'revert',
        flex: 0,
        display: 'flex',
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
        alignSelf: 'flex-start',

    },
    searchText: {
        fontSize: 20,
    },
    headerText: {
        fontSize: 30,
    },
})