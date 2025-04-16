import City from './City';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Button, Icon } from 'react-native';
import { TextInput, PaperProvider } from 'react-native-paper';
import * as Calendar from 'expo-calendar';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-paper-dropdown';
import moment from 'moment';

export default function FromDate({ sendDataToParent }) {

    const [city, setCity] = useState(null);
    const [fromDate, setFromDate] = useState(new Date()); // Initializes with the current date
    const [showPicker, setShowPicker] = useState(false); // Control visibility of the picker
    const [date, setShowDate] = useState(new Date(1598051730000));

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: new Date(),
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatePicker = () => {
        showMode('date');

    }

    const showTimePicker = () => {
        showMode('time');
    }

    const onChange = (event, selectedDate) => { 
        const currentDate = moment(selectedDate).format('YYYY-MM-DD');
        setShowPicker(false);
        setFromDate(new Date(currentDate));
        sendDataToParent({ fromDate: currentDate, component: 'FromDate' });
    };

    return (
        <>

            <View style={styles.containerStyle}>
                {showPicker && (
                    <RNDateTimePicker 
                    design="material"
                    value={fromDate}
                    mode="date" // Specify the mode (date or time)
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange} 
                    />
                )}

                <TextInput
                    label="From date"
                    left={<TextInput.Icon icon="calendar" />}
                    style={styles.textInput}
                    onFocus={showDatePicker} // Show the picker when the input is focused
                    onPress={showDatePicker} // Show the date picker when field is pressed
                    value={moment(fromDate).format('YYYY-MM-DD')} // Display the selected date in the input
                />
              
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'orange',
        width: '100%',
        display: 'flex',

    },
    containerStyle: {
        display: 'flex',
        flex: 1,
        width: '100%',
        display: 'flex',
    }
});

