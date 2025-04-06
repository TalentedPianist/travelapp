import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => { 
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View
            style={containerStyle}>
                <Text style={labelStyle}>{label}></Text>
                <TextInput 
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    autoCorrect={false}
                    style={inputStyle}
                    value={value}
                    onTextChange={onChangeText}
                />
            </View>
    );
};

