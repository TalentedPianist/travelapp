import { Text, View, StyleSheet, Button, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function AboutScreen() { 
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top']}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        
            <Text style={styles.text}>
                Ad cupidatat sit qui minim cillum velit anim mollit. Pariatur velit fugiat anim nulla nisi enim sint. Excepteur exercitation et commodo deserunt incididunt eiusmod adipisicing sint deserunt veniam pariatur.
{"\n\n"}
Duis aliqua commodo in in ullamco reprehenderit anim sunt cupidatat dolore. Cillum tempor magna nulla nisi magna deserunt non mollit ea ea. Voluptate proident non esse ullamco ad elit excepteur culpa elit labore. Aliquip ex nisi aute laborum nulla fugiat ex. Nisi nostrud adipisicing sunt adipisicing. Enim proident mollit enim veniam. Laborum excepteur ut veniam ut laborum aliqua anim eiusmod minim aliquip.
{"\n\n"}
Non dolor in id magna commodo. Tempor anim mollit dolore ad mollit eiusmod ipsum. Quis exercitation mollit et mollit in. Excepteur consectetur eu incididunt incididunt magna est. Ullamco ea ex eu elit nisi exercitation nostrud elit. Excepteur amet esse aute sint qui aliquip aute ipsum sunt sint.
{"\n\n"}
Proident pariatur incididunt adipisicing ad officia quis incididunt commodo eu occaecat laborum irure. Officia veniam aliqua eiusmod deserunt ad voluptate ipsum. Tempor labore tempor adipisicing eu amet. Dolore quis labore esse nostrud ut do tempor exercitation. Proident eiusmod excepteur cillum ad id qui cupidatat. Lorem dolore dolor adipisicing dolore non magna ipsum id ut excepteur eiusmod.
{"\n\n"}
Eu ad nulla ut ut reprehenderit ad amet officia adipisicing mollit. Consequat laborum excepteur occaecat proident dolor culpa in est laborum eiusmod ad amet proident officia. Cillum quis enim laborum quis irure eu nisi cillum ut magna pariatur excepteur.
{"\n\n"}
Quis fugiat cillum do dolor Lorem excepteur eiusmod cupidatat mollit officia amet ipsum laboris est. Ipsum reprehenderit id fugiat laborum ex velit nostrud culpa et pariatur. Pariatur Lorem exercitation voluptate velit. Est fugiat aliqua officia ea in quis amet. Officia aliqua cupidatat cillum minim. Veniam eiusmod cillum elit enim elit excepteur aliqua laboris.
            </Text>
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider> 
    )       
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: { 
        backgroundColor: 'pink',
        flexGrow: 1,
    },
    text: { 
        fontSize: 32, 
        padding: 12
    },
});