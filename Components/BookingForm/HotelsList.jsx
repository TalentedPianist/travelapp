import { FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import HotelModal from './HotelModal';

export default function HotelsList(props) {
    const [loading, setLoading] = useState(false);

    const Item = ({ title }) => (
        <View style={styles.item}>
            <View style={styles.buttonsView}>
            <Text style={styles.hotelsListText}>{title}</Text>
            <TouchableOpacity style={styles.viewButton}>
                <Text>View</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
                <Text>Save</Text>
            </TouchableOpacity>
            </View>
        </View>
    );

    const ListHeaderComponent = () => {
        <View>
            <Text>Hotels List</Text>
        </View>
    }

    const ItemSeparatorView = () => {
        return (
            // Flat list item separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#c8c8c8'
                }}
            />
        );
    }

    const renderFooter = () => {
        return (
            // Footer view with Load More button
            <View styles={styles.footer}>

            </View>
        );
    }

   
    return (
        <>
           

            <FlatList
                data={props.data}
                renderItem={({ item }) => <Item title={item.name} />}
                ListHeaderComponent={ListHeaderComponent}
                windowSize={10}
                onReachedThreshold={0.3}
                ItemSeparatorComponent={ItemSeparatorView}
                ListFooterComponent={renderFooter}
            />
        </>
    );
}

const styles = StyleSheet.create({
    hotelsList: {
        backgroundColor: 'lightgreen',
        display: 'flex',
        justifyContent: 'space-evenly',
        height: '100%',
        flex: 1,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
    },
    hotelsListText: {
        fontSize: 18,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    viewButton: {
        backgroundColor: 'beige',
        alignSelf: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 30,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        flexWrap: 'wrap',

    },
    footer: {
        display: 'flex',
    },
    buttonsView: { 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'inherit',
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    saveButton: { 
        backgroundColor: 'lightgray', 
        paddingTop: 10, 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingBottom: 10,
        alignSelf: 'flex-start',
    }
})