import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, Button, FlatList } from 'react-native';
import React, { useMemo, useCallback, useRef, useEffect, useState, forwardRef } from 'react';
import axios from 'axios';
import { Provider as PaperProvider, TextInput } from 'react-native-paper';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

function City({ childToParent }) {
    const [loading, setLoading] = useState(false);
    const [suggestionsList, setSuggestionsList] = useState(null);
    const [selectedItem, setSelectedItem] = useState();
    const [error, setError] = useState('');

    const handleSelectItem = useCallback((item) => {
        
        try {
            setSelectedItem(item);
            childToParent(item);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const getSuggestions = useCallback(async (q) => {
        const url = `https://skyscanner89.p.rapidapi.com/hotels/auto-complete?query=${q}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba',
                'x-rapidapi-host': 'skyscanner89.p.rapidapi.com',
            },
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            // Below constant formats API results into readable content.  First it checks if the result is an array.  Then it maps over each item assigning it an id, title and comonent values.  
            const formattedSuggestions = Array.isArray(result)
                ? result.map((item) => ({
                    id: item.entityId,
                    title: `${item.entityName}, ${item.hierarchy}`,
                    component: 'City',
                }))
                : [];
            setSuggestionsList(formattedSuggestions);
        } catch (error) {
            console.error(error);
        }
    }, []);


    // Mention the render issue in the report.  If you have a View element around external components they won't render.
    return (
        <>
            <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                closeOnSubmit={false}
                onChangeText={(text) => getSuggestions(text)} // Important to mention in report.
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
                }}>{item.title
                    }
                </Text>}
                onSelectItem={(item) => {
                    if (item) {
                        handleSelectItem(item);
                    } else {
                        //console.warn("No item selected");
                    }
                }}
            />
            {error && <Text>{error}</Text>}
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

export default City;