import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useCallback } from 'react';

function FromDate({ childToParent }) {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState();

    const onChange = useCallback((event, value) => { 
        setSelectedDate(value);
        childToParent({ component: 'FromDate', fromDate: value });
    }, []);

    const showMode = useCallback((currentMode) => { 
        DateTimePickerAndroid.open({ 
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    }, [date, onChange]);

    const showDatePicker = useCallback(() => { 
        showMode('date');
    }, [date]);

    const showTimePicker = useCallback(() => { 
        showMode('time');
    }, [date]);

    return ( 
        <>
        <View style={styles.containerStyle}>
            
            <TextInput 
                label="From date"
                left={<TextInput.Icon icon="calendar" />}
                style={styles.textInput}
                onPress={showDatePicker}
                onFocus={showDatePicker}
                value={selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
            />
            
        </View>
        </>
    )
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


export default React.memo(FromDate);