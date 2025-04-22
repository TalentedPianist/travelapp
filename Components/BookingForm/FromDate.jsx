import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useCallback } from 'react';

function FromDate({ childToParent }) {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    // const onChange = useCallback((event, value) => { 
    //     setSelectedDate(value);
    //     childToParent({ component: 'FromDate', fromDate: value });
    // }, []);

    const onChange = (event, selectedDate) => { 
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        childToParent({ component: 'FromDate', fromDate: selectedDate });
    }

    const showMode = useCallback((currentMode) => { 
        DateTimePickerAndroid.open({ 
            value: date,
            onChange, 
            mode: currentMode,
            is24Hour: true,
        });
    }, [date, onChange]);

    const showDatepicker = () =>  {
        showMode('date');
    }

    const showTimepicker = () => { 
        showMode('time');
    }
   

    return ( 
        <>
        <View style={styles.containerStyle}>
          { Platform.OS === 'ios' ? 
          <>
                <Text style={{ paddingLeft: 10, paddingBottom: 10, fontWeight: 'bold' }}>Checkin Date:</Text>
                <DateTimePicker 
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            
          </>
          : 
            <TextInput 
                label="Checkin Date"
                left={<TextInput.Icon icon="calendar" />}
                style={styles.textInput}
                onPress={showDatepicker}
                onFocus={showDatepicker}
                value={selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
            /> 
          }
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