import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Button, Icon } from 'react-native';
import { TextInput, PaperProvider } from 'react-native-paper';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


export default function ToDate({ sendDataToParent }) {

    const [toDate, setToDate] = useState(new Date()) // Initializes with the current date
    const [showPicker, setShowPicker] = useState(false);
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
        setToDate(currentDate);
        console.log('ToDate sendDataToParent:', { date: currentDate, component: 'ToDate' });
        if (typeof sendDataToParent === 'function') {
            sendDataToParent({ toDate: currentDate.toISOString().split('T')[0], component: 'ToDate' });
        }
    };

    return (
        <>
            <View style={styles.containerStyle}>
                {showPicker && (
                    <RNDateTimePicker
                        design="material"
                        value={toDate}
                        mode="date" // Specify the mode (date or time)
                        display={Platform.os === 'ios' ? 'spinner' : 'default'}
                        onChange={onChange}
                    />
                )}

                <TextInput
                    label="To date"
                    left={<TextInput.Icon icon="calendar" />}
                    onFocus={showDatePicker} // Show the date picker when input is focused
                    onPress={showDatePicker} // Show the date picker when field is pressed
                    value={toDate.toDateString()}
                    style={styles.textInput}
                />
              
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'orange',
   
    },
    containerStyle: {
        flex: 1,
        width: '100%',
    }
});