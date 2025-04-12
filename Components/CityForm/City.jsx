import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, Button } from 'react-native';
import { memo, useCallback, useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Provider as PaperProvider, TextInput } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import {
    AutocompleteDropdown,
    AutocompleteDropdownRef,
} from 'react-native-autocomplete-dropdown';

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

    const getSuggestions = useCallback(async q => {
        const filterToken = q.toLowerCase();
        
        console.log('getSuggestions', q); // This is where to come back tomorrow and work.

        if (typeof q !== 'string' || q.length < 3) {
            setSuggestionsList(null);
            return;
        }
        setLoading(true);
        const response = await axios.get(rapidUrl, {
            headers: {
                'x-rapidapi-key': rapidKey,
                'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
            },
            params: { query: 'Glasgow' },
        }).then((res) => {
            const items = res.data;
            const suggestions = items
                .filter(item => item.title.toLowerCase().includes(filterToken))
                .map(item => ({
                    id: item.id,
                    title: item.title
                }))
            setSuggestionsList(suggestions);
            setLoading(false);
        }).then((err) => {
            console.log(err);
        });
    }, []);

    const onClearPress = useCallback(() => {
        setSuggestionsList(null);
    }, []);

    const onOpenSuggestionsList = useCallback(isOpened => { }, []);


    const getCity = async () => {
        const options = {
            method: 'GET',
            url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation',
            params: { query: 'Glasgow' },
            headers: {
                'x-rapidapi-key': '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba',
                'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
            }
        }

        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        console.log(getCity());
    }, []);

    return (
        <>
            <View style={styles.cityContainer}>
                <PaperProvider>
                    <Text style={styles.headerStyle}>Find a City</Text>

                    <AutocompleteDropdown
                        ref={searchRef}
                        controller={controller => {
                            dropdownController.current = controller
                        }}
                        direction={Platform.select({ ios: 'down' })}
                        dataSet={suggestionsList}
                        onChangeText={getSuggestions}
                        onSelectItem={item => {
                            item && setSelectedItem(item.id)
                        }}
                        debounce={600}
                        suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
                        onClear={onClearPress}
                        onOpenSuggestionsList={onOpenSuggestionsList}
                        loading={loading}
                        useFilter={false}
                        textInputProps={{
                            placeholder: 'Type 3+ letters (dolo...)',
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            style: {
                                borderRadius: 25,
                                backgroundColor: '#383b42',
                                color: '#fff',
                                paddingLeft: 18,
                            },
                        }}
                        rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,
                            alignSelf: 'center'
                        }}
                        inputContainerStyle={{
                            backgorundColor: '#383b42',
                            borderRadius: 25,
                        }}
                        suggestionsListContainerStyle={{
                            backgroundColor: '#383b42',
                        }}
                        containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                        renderItem={(item, text) => <Text>{item.title}</Text>}
                        inputHeight={50}
                        showChevron={false}
                        closeOnBlur={false}
                    />
                    <View style={{ width: 10 }} />
                    <Button style={{ flexGrow: 0 }} title="Toggle" onPress={() => dropdownController.current.toggle()} />
            
            <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text>

            <TouchableOpacity onPress={() => getCity()} style={styles.buttonText}>
                        <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity >
            { cityData && (
                <Text style={styles.cityText}>{JSON.stringify(cityData, null, 2)}</Text>
            )
}
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