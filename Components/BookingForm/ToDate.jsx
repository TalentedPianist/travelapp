import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';

export default function ToDate({ childToParent }) {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        childToParent({ component: 'ToDate', toDate: selectedDate });
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
            {Platform.OS === 'ios' ?
                <>
                    <Text style={{ paddingLeft: 10, paddingBottom: 10, fontWeight: 'bold' }}>Checkout Date:</Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                        style={{ backgroundColor: 'orange' }}
                    />
                </>
                :
                <View style={styles.containerStyle}>
                    <TextInput
                        label="Checkout date"
                        left={<TextInput.Icon icon="calendar" />}
                        style={styles.textInput}
                        onPress={showDatePicker}
                        onFocus={showDatePicker}
                        value={date ? date.toLocaleDateString() : 'No date selected'}
                    />
                </View>
            }
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
    }
});