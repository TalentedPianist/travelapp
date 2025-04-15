import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, Button, FlatList } from 'react-native';
import { memo, useCallback, useRef, useEffect, useState, useContext, createContext } from 'react';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
 

export default function SelectHotel({ sendDataToParent }, props) {
    const [hotel, setHotel] = useState("");
    const [value, setValue] = useState(null);
    const [open, setOpen] = useState(false);

    const getHotels = useCallback(async () => {
         axios.get('', { 
            headers: { 
                'x-rapidapi-key': '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba',
            }, 
            params:  {
                entity_id: '27537542',
            },
        }).then((res) => { 
            console.log(res);
        }).then((err) => console.error(err));
    });

    const handleSelect = (e) => { 
        console.log(e);
    }

    useEffect(() => {
        getHotels(); 
    }, []);

    const OPTIONS = [
        { label: 'Glasgow', value: 'Glasgow' },
        { label: 'Edinburgh', value: 'Edinburgh' },
        { label: 'Aberdeen', value: 'Aberdeen' },
        { label: 'Dundee', value: 'Dundee' },
    ];

    return (
        <>
          <DropDownPicker
            open={open}
            value={value}
            items={OPTIONS}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setHotel}
            placeholder={'Select a Hotel'}
            style={styles.dropdownStyle}
        />

        </>
    );
}

const styles = StyleSheet.create({ 
    dropdownStyle: { 
        backgroundColor: 'orange',
    }
});