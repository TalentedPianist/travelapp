import { View, Text, StyleSheet, Button } from 'react-native';
import { useStore } from 'zustand';


export default function Home() {
    
    function BearCounter() { 
        const bears = useBearStore((state) => state.bears);
        return (
            <View>
                <Text>{bears} around here</Text>
            </View>
        );
    }

    function Controls() { 
        const increasePopulation = useBearStore((state) => state.increasePopulation);
        return (
            <View>
                <Button onPress={increasePopulation}>One up</Button>
            </View>
        );
    }

    return (
        <View>
            
        </View>
    );
}