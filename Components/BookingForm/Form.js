import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';

const InputText = styled.TextInput`
    border: 1px solid black;
    padding: 5px 5px 5px 5px;
    width: 90%;
    display: flex; 
    margin: 0 auto;

  
`;



export default function BookingForm() {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => { 
        console.log(data);
    }

    return (
        <>
            <View>
                <Controller 
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputText 
                            onBlur={onBlur} 
                            onChangeText={onChange}
                            value={value}
                            placeholder="City"
                            
                        />
                    )}
                    name="City"
                    rules={{ required: true }}
                    defaultValue=""
                />
            </View>
            );
        </>
    )
}