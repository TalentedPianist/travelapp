import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import HotelModal from './HotelModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function HotelsList(props) {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSave = async (item) => {
        try {
            await AsyncStorage.setItem('hotel', JSON.stringify(item));
            const result = JSON.parse(await AsyncStorage.getItem('hotel')); // JSON.parse() is very important!!! Mention in report.
            console.log(result.name);
            navigator.navigate('/Home');
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>

            {props.data &&
                <FlatList
                    data={props.data}
     
                    renderItem={({ item, index }) => {
                        return (
                            <View>

                                <Text style={styles.hotelsListText}>{item.name}</Text>
                                <View style={styles.buttonsView}>
                                    <TouchableOpacity>
                                        <Text style={styles.viewButton}>View</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleSave(item)}>
                                        <Text style={styles.saveButton}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                    ListHeaderComponent={() => {
                        return (
                            <View>

                            </View>
                        );
                    }}
                    windowSize={10}
                    onReachedThreshold={0.3}

                />
            }
        </>
    );
}

const styles = StyleSheet.create({
    hotelsList: {
        backgroundColor: 'lightgreen',
        height: '100%',
        flex: 1,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
        alignItems: 'center',
    },
    hotelsListText: {
        fontSize: 20,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    viewButton: {
        backgroundColor: 'beige',
        alignSelf: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,


    },
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 0,
        alignItems: 'center',
    },
    footer: {
        display: 'flex',
    },
    buttonsView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: 'lightgray',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        alignSelf: 'flex-start',
    },
    headerText: {
        fontSize: 38,
    }
})