import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, Button, FlatList } from 'react-native';
import { memo, useCallback, useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Provider as PaperProvider, TextInput } from 'react-native-paper';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { DropDown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dropdown } from 'react-native-paper-dropdown';

const rapidKey = '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba';
const rapidUrl = 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation'

export default function City() {
    const [cityData, setCityData] = useState(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestionsList, setSuggestionsList] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownController = useRef(null);

    const searchRef = useRef(null);

    const getCity = async (q) => {
        const options = {
            method: 'GET',
            url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation',
            params: { query: q },
            headers: {
                'x-rapidapi-key': '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba',
                'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
            }
        }

        try {
            const response = await axios.request(options);
            setCityData(response.data);
            setSuggestionsList(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSelectItem = (item) => { 
        if (item?.title === "Glasgow") { 
        }
    };

    const handleGetCity = () =>  {
        getCity();

    }

    const getSuggestions = useCallback(async (q) => { 
        const filterToken = q.toLowerCase();
        console.log(q);
        if (q.length < 3) { 
            setSuggestionsList(null);
        }
        setLoading(true);
        axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation', {
            headers: { 
                'x-rapidapi-key': '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba',
                'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
            }, 
            params: { query: 'Glasgow' },
        }).then((res) => {
           const formattedSuggestions = res.data.data.map((item, index) => ({ 
            id: index.toString(),
            title: item.name, // Remove HTML tags
           }));
           setSuggestionsList(res.data.data);
           console.log(res);
        }).then((err) => console.error(err));
    }, []);

    useEffect(() => {
        console.log(suggestionsList);
    }, []);

    
    
    return (
        <>
            <View style={styles.cityContainer}>
                <PaperProvider>
                    <Text style={styles.headerStyle}>Find a City</Text>

                    <AutocompleteDropdown
                        clearOnFocus={false}
                        closeOnBlur={true}
                        closeOnSubmit={false}
                        onSelectItem={setSelectedItem}
                        ref={searchRef}
                        onChangeText={getSuggestions}
                        dataSet={suggestionsList}
                    />

                    


                    <TouchableOpacity onPress={handleGetCity} style={styles.buttonText}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity >
                   
                </PaperProvider >
            </View >
        </>
    );
}

const styles = StyleSheet.create({
    cityContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        display: 'flex',
    },
    cityText: {
        color: 'white',
        fontSize: 24,
    },
    cityInput: {

        backgroundColor: 'orange',
        width: '100%',
    },
    buttonText: {
        backgroundColor: 'yellow',
        color: 'black',
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        display: 'flex',
        alignSelf: 'flex-start',
        marginTop: 5,
        marginBottom: 20,
    },
    headerStyle: {
        fontSize: 26,
        paddingBottom: 10,
    }
});