import { View, Image, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilePicture() {
    const [picture, setPicture] = useState();

    async function getProfilePic() {
        await AsyncStorage.getItem('picture')
            .then((result) => {
                const parsed = JSON.parse(result);
                setPicture(parsed.uri);
            }).catch((error) => console.log(error));
    }

    useEffect(() => {
        getProfilePic();
    }, []);

        return (
            <View>

                <Image
                    style={styles.profilePicture}
                    source={{
                        uri: picture
                    }}
                />

            </View>
        );
    
}

const styles = StyleSheet.create({
    profilePicture: {
        width: 200,
        height: 200,

    }
});