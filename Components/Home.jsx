import { FlatList, View, StyleSheet, TouchableOpacity, ScrollView, Button, VirtualizedList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useRef } from 'react';
import { Text } from 'react-native-paper';
import City from './BookingForm/City';
import FromDate from './BookingForm/FromDate';
import ToDate from './BookingForm/ToDate';
import NoOfGuests from './BookingForm/NoOfGuests';
import NoOfRooms from './BookingForm/NoOfRooms';
import SelectHotel from './BookingForm/SelectHotel';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import moment from 'moment';
import HotelModal from './BookingForm/HotelModal';
import HotelsList from './BookingForm/HotelsList';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


export default function Home({ sendDataToParent }) {
   return (
        <HotelsList />
   );
  
}


