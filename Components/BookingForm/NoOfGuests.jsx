import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';

export default function NoOfGuests({ sendDataToParent }) {
    const [noOfGuests, setNoOfGuests] = useState(0);

    const handleTextChange = (e) => { 
        // Send to parent component
        sendDazaToParent({ noOfGuests: e, component: 'NoOfGuests' });
    }

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    label="Number of Guests"
                    onChangeText={handleTextChange}
                    style={styles.inputText}
                    inputMode="numeric"
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    
    },
    inputText: {
        backgroundColor: 'orange',
        width: '100%',
    },
});