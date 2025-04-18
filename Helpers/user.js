import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetUser = async () => { 
    try { 
        const user = await AsyncStorage.getItem('user');
        const parsed = JSON.parse(user);
        return parsed;
    } catch (e) { 
        console.log(e);
    }
}