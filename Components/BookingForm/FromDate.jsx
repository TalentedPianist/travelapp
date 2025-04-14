import City from './City';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

const FromDateComponent = () => {

    const [text, onChangeText] = useState('');
    return (
        <>
            
                <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeText}
                    placeholder="Test"
                />
            
        </>
    );
}

export default function FromDate({ children }) {
    const [city, setCity] = useState(null);

    function handleDataFromChild(data) {
        console.log(data);
    }

    return (
        <>
            <View>
                <City sendDataToParent={handleDataFromChild} />
                <FromDateComponent />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'orange',
    }
});

