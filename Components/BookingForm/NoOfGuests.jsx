import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';

export default function NoOfGuests() {
    const [guests, setGuests] = useState(0);

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    onChangeText={guests => setGuests(guests)}
                    style={styles.inputText}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
    },
    inputText: {
        backgroundColor: 'orange',
        width: '100%',
    },
});