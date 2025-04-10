import { View, Text, StyleSheet } from 'react-native';
import { createStaticNavigation, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MyMenu from './app/MyMenu';
import { PaperProvider } from 'react-native-paper';

function HomeScreen() { 
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}

function AboutScreen() { 
    return(
        <View>
            <Text>About Screen</Text>
        </View>
    );
}

const RootStack = createNativeStackNavigator({ 
    initialRouteName: 'Home',
    screenOptions: { 
        header: () => (
            <View style={styles.headerStyles}>
                <FontAwesome5 name="home" size={70} color="black" />
                <MyMenu />
            </View>
        ),
        headerStyle: { backgroundColor: 'lightblue' },
    },
    screens: { 
        Home: HomeScreen,
        About: AboutScreen,
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return (
        <>
            <NavigationIndependentTree>
            <PaperProvider>
                <Navigation/>
            </PaperProvider>
            </NavigationIndependentTree>
        </>
    );
}

const styles = StyleSheet.create({ 
    headerStyles: { 
        backgroundColor: 'lightblue',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 70,
        paddingBottom: 20,
    }
});