import City from './City';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Button, Icon } from 'react-native';
import { TextInput, PaperProvider } from 'react-native-paper';
import * as Calendar from 'expo-calendar';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

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
        const currentDate = selectedDate;
        setShowPicker(false);
        setFromDate(currentDate);
        sendDataToParent({ date: currentDate, component: 'FromDate' });
    };

    console.log('Rendering FromDate component');

    return (
        <>

            <View style={styles.containerStyle}>
                {showPicker && (
                    <RNDateTimePicker 
                    design="material"
                    value={new Date()} // Pass the date state as the value
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
                    value={fromDate.toDateString()} // Display the selected date in the input
                />
                <Text>{fromDate.toLocaleString()}</Text>
                <Text>Hello World!</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'orange',
        width: '40%',
    },
    containerStyle: {
        flex: 1,
        zIndex: 50000,
    }
});

