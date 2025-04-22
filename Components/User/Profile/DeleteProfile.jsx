import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function DeleteProfile() { 
    const navigation = useNavigation();

    const deleteAccount = async () => {
         Alert.alert('Delete Account', 'This process will delete your account from the system.  Are you sure you want to proceed?', [ 
            {
                text: 'Yes',
                onPress: (async () => { 
                    await AsyncStorage.removeItem('user');
                    alert('User account deleted successfully');
                    navigation.navigate('Register');
                }),
            },
            { 
                text: 'No',
                onPress: () => { 
                    console.log('User has cancelled operation.');
                }
            },
        ]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>This will delete your account from the system.</Text>
            <Button mode="contained" style={styles.buttonStyle} onPress={deleteAccount}>Delete</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#ccccff',
        minHeight: '100%',
        height: '100%',
        flexGrow: 1,
        flex: 1,
        gap: 50,
        margin: '0 auto',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
    },
    buttonStyle: { 
        alignSelf: 'flex-start',
        backgroundColor: 'red',
    
    },
    textStyle: { 
        fontSize: 20,

    }
});