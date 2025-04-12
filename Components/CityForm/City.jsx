import { View, Text, StyleSheet, TouchOpacity } from 'react-native';
import { useEffect } from 'react';
import axios from 'axios';

const rapidKey = '23da1d3f7amshb4f9b46ad4fbdf7p1528f2jsn716390f369ba';
const rapidUrl = 'travel-guide-api-city-guide-top-places.p.rapidapi.com'

export default function City() {
    const fetchQuotes = async () => {
        try {
            const res = await axios.get(
                `https://famous-quotes4.p.rapidapi.com/random`,
                {
                    headers: {
                        'x-rapidapi-host': 'famous-quotes4.p.rapidapi.com',
                        'x-rapidapi-key': rapidKey,
                    },
                    params: {
                        category: 'all',
                        count: '10',
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        requestApi()
    }, []);

    return (
        <>
            <View style={styles.containerStyle}>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'midnightblue',
    },
    cityText: {
        color: 'white',
        fontSize: 24,
    },
});