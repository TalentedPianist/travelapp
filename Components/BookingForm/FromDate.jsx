import City from './City';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Button, Icon } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as Calendar from 'expo-calendar';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function FromDate({ children }) {
    const [city, setCity] = useState(null);
    const [fromDate, setFromDate] = useState(new Date()); // Initializes with the current date
    const [showPicker, setShowPicker] = useState(false); // Control visibility of the picker

    function handleDataFromChild(data) {
        console.log(data);
    }

    const [text, onChangeText] = useState('');

    useEffect(() => {
        // (async () => {
        //     const { status } = await Calendar.requestCalendarPermissionsAsync();
        //     if (status === 'granted') {
        //         const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        //         console.log('Here are all your calendars:');
        //         console.log({ calendars });
        //     }
        // })();
    }, []);

    async function getDefaultCalendarSource() {
        const defaultCalendar = await Calendar.getDefaultCalendarAsync();
        return defaultCalendar.source;
    }

    async function createCalendar() {
        const defaultCalendarSource =
            Platform.OS === 'ios'
                ? await getDefaultCalendarSource()
                : { isLocalAccount: true, name: 'Expo Calendar' };
        const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Holidays',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });
        console.log(`Your new calendar is: ${newCalendarID}`);
    }

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
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
                    value={fromDate.toDateString()} // Display the selected date in the input
                />
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
        display: 'flex',
    }
});

