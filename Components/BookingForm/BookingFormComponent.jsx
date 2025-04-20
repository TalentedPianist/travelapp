import { View, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState, useRef } from 'react';
import City from './City';
import FromDate from './FromDate';
import ToDate from './ToDate';
import NoOfGuests from './NoOfGuests';
import NoOfRooms from './NoOfRooms';


export default function BookingFormComponent() {
    const navigation = useNavigation();

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
    const [rapid, setRapid] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [hotel, setHotel] = useState([]);

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

    async function getAllKeys() {
        const allKeys = await AsyncStorage.getAllKeys();
        console.log(allKeys);
    };

    async function getHotel() {
        const h = await AsyncStorage.getItem('hotel');
        setHotel(JSON.parse(h));
    }

    useEffect(() => {

        getHotel();
    }, []);

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator animated={true} size="large" />}

            <View>
                <Text variant="headlineMedium">Find a Hotel</Text>
            </View>

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
    
});