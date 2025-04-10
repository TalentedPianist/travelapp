import { ScrollView, Text, StyleSheet } from 'react-native';

export default function AboutUs() {
    return (
        <>
            <ScrollView style={styles.containerStyle}>
                <Text style={styles.textStyle}>
                    Commodo nisi officia sint sunt mollit eu aliquip ex id minim laboris proident nostrud nisi. Deserunt occaecat laboris officia aliqua eu. Officia sit culpa dolor occaecat ut anim aliquip in proident occaecat consectetur do elit officia.
                    {"\n\n"}
                    Fugiat ad sint ea aliqua velit. Irure minim mollit esse anim minim consequat laboris in mollit anim ut culpa sunt. Do deserunt nostrud proident ipsum quis eiusmod laboris deserunt officia ut non occaecat. Ad voluptate irure consectetur in consectetur.
                    {"\n\n"}
                    Tempor fugiat laborum aute non excepteur ex tempor id non voluptate veniam esse non. Consectetur proident magna consequat consectetur in elit sint dolor deserunt excepteur. Qui aute minim magna non est adipisicing culpa consequat et.
                    {"\n\n"}
                    Lorem cupidatat est in est sit sunt irure proident. Veniam cupidatat veniam excepteur magna ullamco aute tempor minim exercitation consectetur cillum esse. Ex non aliquip esse et voluptate sit ipsum. Nisi laborum enim irure deserunt ex aute officia Lorem irure sint aute fugiat ut.
                    {"\n\n"}
                    Sunt duis nisi non id laborum. Eu officia id officia labore. Quis esse et elit velit commodo eiusmod culpa anim ea do in ullamco non. Dolor esse enim ex consequat.
                    {"\n\n"}
                    Sunt eu occaecat ea sunt qui duis occaecat labore cupidatat laboris id. Ullamco incididunt ullamco magna nostrud eu reprehenderit enim nulla minim exercitation commodo. Adipisicing nostrud quis exercitation commodo culpa non qui aliqua cillum. Consequat culpa voluptate enim nostrud nisi laboris aliquip elit nostrud ipsum excepteur. Mollit excepteur elit anim qui esse. Anim officia minim consequat eu Lorem fugiat proident.
                </Text>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    containerStyle: { 
        backgroundColor: 'orange',
        paddingLeft: 20,
        paddingTop: 20, 
        paddingRight: 20,
    },
    textStyle: { 
        fontSize: 28,
    }
});