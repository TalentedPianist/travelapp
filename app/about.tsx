import { ScrollView, Text, StyleSheet } from 'react-native';

export default function About() {
    return (
        <>
            <ScrollView style={styles.aboutContainer}>
                <Text style={styles.aboutHeader}>About Us</Text>
                <Text style={styles.aboutText}>
                    Dolor fugiat consequat quis aliqua sunt consectetur aliqua pariatur. Veniam nostrud id consequat nulla est labore consectetur consequat consectetur sit sunt anim. Proident velit minim non velit mollit reprehenderit mollit elit in cupidatat incididunt sit. Aute qui proident quis minim adipisicing id. Reprehenderit officia ipsum excepteur fugiat ex duis. Officia consequat pariatur est ea irure.
                    {"\n\n"}
                    Lorem minim veniam exercitation magna culpa. Aliquip consequat aliqua velit culpa dolor deserunt excepteur aliquip incididunt cillum reprehenderit id. Veniam sint aliquip officia enim elit Lorem ea exercitation occaecat consequat. Eiusmod sit proident minim qui nostrud.
                    {"\n\n"}
                    Ullamco elit dolor cupidatat sit reprehenderit pariatur reprehenderit. Non in mollit deserunt ex sunt est nisi aliqua reprehenderit qui sint ullamco excepteur. Laborum ex voluptate tempor ad voluptate eiusmod. Eiusmod Lorem non excepteur adipisicing minim eu. Magna exercitation ipsum elit ea non reprehenderit officia amet. In enim deserunt occaecat ex ullamco amet eu et pariatur. Laborum commodo esse pariatur et occaecat in cupidatat dolore.
                    {"\n\n"}
                    Sit sunt laborum aute excepteur dolore aliquip labore do deserunt. Ea pariatur velit laborum excepteur eiusmod exercitation deserunt minim qui ea nulla ex dolor. Ex tempor esse commodo eu reprehenderit et voluptate culpa elit cillum ex.
                    {"\n\n"}
                    Proident veniam occaecat fugiat ullamco duis pariatur commodo. Non tempor ad nulla non culpa non nostrud excepteur ex eu consectetur. Consectetur culpa velit enim aliquip. Mollit ut adipisicing nostrud laboris tempor nisi.
                    {"\n\n"}
                    Enim eu ut minim sint commodo et. Lorem amet magna nisi laborum esse. Aute et veniam dolor in in ad exercitation. Esse esse amet ipsum nostrud cupidatat veniam. Quis amet anim occaecat mollit consectetur. Nisi ad ex cillum consectetur labore commodo nostrud aliquip in anim incididunt culpa. Voluptate pariatur eiusmod nulla in irure reprehenderit aliquip culpa laboris ut ad aute.
                </Text>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({ 
    aboutContainer: { 
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        backgroundColor: 'orange',
    },
    aboutText: { 
        fontSize: 20,
        lineHeight: 30,
    },
    aboutHeader: { 
        fontSize: 38,
        fontWeight: 'bold',
    }
});