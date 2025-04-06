import React, { useState } from 'react';
import { View, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';


export default function BookingForm() {
    const [city, setCity] = useState("");

    const onSubmit = (data) => {
        console.log(data);
    };

    return (

        <View style={styles.container}>
            <TextInput
                label="City"
                value={city}
                onChangeText={(city) => setCity(city)}
                mode="outlined"
                style={styles.input}
            />

            <Button
                mode="contained"
                onPress={() => console.log(city)}>
                Submit
            </Button>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 20,
        backgroundColor: 'white',
    },
    button: {
        alignSelf: 'center'
    }
});