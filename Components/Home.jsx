import { FlatList, View, StyleSheet, TouchableOpacity, ScrollView, Button, VirtualizedList, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback } from 'react';
import HotelsList from './BookingForm/HotelsList';
import ViewHotel from './BookingForm/ViewHotel';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

   const [hotel, setHotel] = useState(false);
   const navigation = useNavigation();

   const hotelExists = useCallback(async () => {
      let h = await AsyncStorage.getItem('hotel');
      if (h) {
         setHotel(JSON.parse(h));
      }
   });

   useEffect(() => {

      hotelExists();
   }, []);

   const handleDelete = async () => {
      await AsyncStorage.removeItem('hotel');

   }


   return (
      <>
         { hotel ? <ViewHotel /> : <HotelsList /> }
      </>
   )



}




