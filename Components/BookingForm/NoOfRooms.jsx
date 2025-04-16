import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';

export default function NoOfRooms() {
    const [noOfRooms, setNoOfRooms] = useState(0);
    
    const handleTextChange = (e) => { 
        // Send data to parent component
        sendDataToParent({ noOfRooms: e });
    }

    return (
        <>
            <View style={styles.container}>
                <TextInput 
                    label="Number of Rooms"
                    onTextChange={handleTextChange}
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