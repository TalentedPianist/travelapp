import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg';

const MenuIcon = (props) => {
    return (
        <PaperProvider>
            <Svg width="66" height="44" viewBox="0 0 66 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M0 44V36.6667H66V44H0ZM0 25.6667V18.3333H66V25.6667H0ZM0 7.33333V0H66V7.33333H0Z" fill="black" />
            </Svg>
        </PaperProvider>
    );
}

export default function MyMenu() {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    console.log(visible);
    // Click wasn't working because PaperProvider needs to be wrapped around all components that use react-native-paper.
    return (
        <PaperProvider>
            <View
                style={{
                    paddingTop: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <TouchableOpacity onPress={openMenu} style={{ padding: 10 }}>
                            <Svg width="66" height="44" viewBox="0 0 66 44" fill="none" xmlns="http://www.w3.org/2000/svg" onPress={() => console.log('Menu button was pressed')}>
                                <Path d="M0 44V36.6667H66V44H0ZM0 25.6667V18.3333H66V25.6667H0ZM0 7.33333V0H66V7.33333H0Z" fill="black" />
                            </Svg>
                        </TouchableOpacity>
                    }>
                    <Menu.Item onPress={() => { }} title="Item 1" />
                    <Menu.Item onPress={() => { }} title="Item 2" />
                </Menu>
            </View>
        </PaperProvider>
    );
}
