import { FlatList, View, StyleSheet, TouchableOpacity, ScrollView, Button, VirtualizedList, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback } from 'react';
import HotelsList from './BookingForm/HotelsList';
import ViewHotel from './BookingForm/ViewHotel';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

   const [hotel, setHotel] = useState(false);

   async function getHotel() {
      await AsyncStorage.getItem('hotel')
         .then((result) => { 
            const parsed = JSON.parse(result);
            setHotel(parsed);
         }).catch((error) => console.log(error)); 
   }

   useEffect(() => {
      getHotel(); 
   }, []);

   return (
      <>
         { hotel ? <ViewHotel /> : <HotelsList /> }
      </>
   )



}




