import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Button, Icon } from 'react-native';
import { TextInput, PaperProvider } from 'react-native-paper';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function ToDate({ sendDataToParent }) {

    const [toDate, setToDate] = useState(); // Initializes with the current date
    const [showPicker, setShowPicker] = useState(false);

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
        setToDate(currentDate);
        sendDataToParent({ toDate: currentDate, component: 'ToDate' });

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
                    value={moment(toDate).format('YYYY-MM-DD')}
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