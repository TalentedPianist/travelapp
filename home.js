import { Text } from 'react-native';
import styled from 'styled-components';
import BookingForm from './Components/BookingForm/Form';

const BookingArea = styled.View`
  display: flex; 
  flex-direction: column;
  flex: 1;
  padding-top: 50px;
  background-color: #FAA339;
`;
export default function HomeScreen() { 
    return(
        <>
            <BookingArea>
                <BookingForm />
            </BookingArea>
        </>
    )
}