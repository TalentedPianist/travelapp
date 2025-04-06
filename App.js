import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';

const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #4fbcf7;
  padding-top: 30px;
`;

const CallToAction = styled.View`
  display: flex;
  flex-direction: column;
  flex: 0;
  align-items: center;
  justify-content: space-evenly;
  background-color: #8DF74F;
  
`;

const Title = styled.Text`
    font-size: 48px;

`;

const Slug = styled.Text`
  font-size: 36px;
`;

const Description = styled.View`
  background-color: #F7E965;
  display: flex;
  flex-direction: column;
  

`;

const BookingForm = styled.View`
  display: flex; 
  background-color: #FAA339;
`;

const DescriptionText = styled.Text`
  font-size: 22px;
  margin: 0 auto;
  padding-top: 2em;
`;

const Footer = styled.View`
  display: flex;
  clear: both;
  background-color: #F76377;
`;

export default function App() {
  return (
    <>
      <Header>
        <Svg width="90" height="90" viewBox="0 0 58 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M42.6667 18.5804L28.9792 4.89292L7.41375 26.4583H12.25V50.7917H21.375V32.5417H36.5833V50.7917H45.7083V26.4583H50.5446L45.7083 21.6221V11.25H42.6667V18.5804ZM0.0833321 29.5L28.9792 0.604167L39.625 11.25V8.20833H48.75V20.375L57.875 29.5H48.75V53.8333H33.5417V35.5833H24.4167V53.8333H9.20833V29.5H0.0833321Z" fill="black" />
        </Svg>

        <Svg width="66" height="44" viewBox="0 0 66 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M0 44V36.6667H66V44H0ZM0 25.6667V18.3333H66V25.6667H0ZM0 7.33333V0H66V7.33333H0Z" fill="black" />
        </Svg>

      </Header>
      <CallToAction>
          <Title>Welcome!</Title>
          <Slug>The Travel App</Slug>
      </CallToAction>
      <Description>
          <DescriptionText>Making it easy to book your next trip!</DescriptionText>
      </Description>
      <BookingForm>
          <Text>Search for Flights</Text>
      </BookingForm>
      <Footer>
          <Text>Copyright &copy; The Travel App 2025</Text>
      </Footer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
