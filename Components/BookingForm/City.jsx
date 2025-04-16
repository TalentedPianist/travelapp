import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, Button, FlatList } from 'react-native';
import { memo, useCallback, useRef, useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';
import { Provider as PaperProvider, TextInput } from 'react-native-paper';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { DropDown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dropdown } from 'react-native-paper-dropdown';
import FromDate from './FromDate';
import { BookingFormContext } from '../Home';

export default function City({ sendDataToParent }) {
    const [loading, setLoading] = useState(false);
    const [suggestionsList, setSuggestionsList] = useState(null);
    const [selectedItem, setSelectedItem] = useState();
    const searchRef = useRef(null);
    const [entityId, setEntityId] = useState('');

    const getCity = async (q) => {
        const options = {
            method: 'GET',
            url: 'https://sky-scanner3.p.rapidapi.com/hotels/auto-complete',
            params: { query: q },
            headers: {
                'x-rapidapi-key': '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba',
                'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
            }
        }

        try {
            const response = await axios.request(options);
            //console.log(response);

            setCityData(response.data);
            setSuggestionsList(response.data);
        } catch (error) {
            //console.error(error);
        }
    }


    const handleSelectItem = (item) => {
        // Pass data to parent component
        try {
            sendDataToParent(item);
            console.log(item);
        } catch (error) {
            console.log(error); // For some reason the component looses its value if this line is missing.
        }
    }

    const getSuggestions = useCallback(async (q) => {

        //console.log(q);
        if (q.length < 3) {
            setSuggestionsList(null);
        }

        axios.get('https://sky-scanner3.p.rapidapi.com/hotels/auto-complete', {
            headers: {
                'x-rapidapi-key': '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba',
                'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
            },
            params: { query: q },
        }).then((res) => {
            const formattedSuggestions = res.data.data.map((item, index) => ({
                id: index.toString(),
                title: item?.entityName,
                entityId: item?.entityId,
                component: 'City', // Custom parameter passed to list 
            }));
            setSuggestionsList(formattedSuggestions);

        }).then((err) => {
            //console.error(err)
        });
    }, []);

    useEffect(() => {

    }, []);

    // Mention the render issue in the report.  If you have a View element around external components they won't render.
    return (
        <>
            <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                closeOnSubmit={false}
                ref={searchRef}
                onChangeText={getSuggestions}
                dataSet={suggestionsList}
                style={styles.autoDropdown}
                textInputProps={{
                    placeholder: "Type a city name...",
                    placeholderTextColor: '#000',
                    autoCorrect: false,
                    autoCapitalize: 'none',
                    style: {
                        backgroundColor: 'orange',
                        minWidth: '90%',
                    }
                }}
                renderItem={(item, text) => <Text style={{
                    backgroundColor: 'yellow',
                    color: '#000',
                    fontSize: 22,
                    width: '100%',
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 20,
                    paddingBottom: 20,
                }}>{item?.title
                    }
                </Text>}
                onSelectItem={(item) => {
                    if (item) {
                        handleSelectItem(item);
                    } else {
                        console.warn("No item selected");
                    }
                }}
            />

        </>
    );
}

const styles = StyleSheet.create({
    cityContainer: {
        width: '100%',
        height: '100%',

    },
    cityText: {
        color: 'white',
        fontSize: 24,
        width: '100%',
    },
    cityInput: {
        display: 'flex',
        backgroundColor: 'orange',
        width: '100%',
    },
    buttonText: {
        backgroundColor: 'yellow',
        color: 'black',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 22,
        display: 'flex',
        alignSelf: 'flex-start',
        marginTop: 20,
        marginBottom: 20,
    },
    headerStyle: {
        fontSize: 26,
        paddingBottom: 10,
    },
    autoDropdown: {
        width: '100%',
    }
});