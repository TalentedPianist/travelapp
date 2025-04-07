import { View, Text, StyleSheet, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextInput } from 'react-native-paper';
import { FormBuilder } from './dist';

// https://medium.com/@abdurshd/a-step-by-step-guide-to-building-reusable-components-with-react-hook-form-70f5e77c9037
export default function Register() { 
    const { control, setFocus, handleSubmit} = useForm({ 
        defaultValues: { 
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = data => { 
        console.log(data);
    }

    return(
        <>
            <View style={styles.registerContainer}>
                <Text style={styles.textStyles}>Sign up for your new account</Text>

                <FormBuilder
                    

            </View>
        </>
    );
}

const styles = StyleSheet.create({ 
    registerContainer:  {
        backgroundColor: 'pink',
        display: 'flex',
        height: '100%',
        paddingLeft: 20,
        paddingTop: 20,
    }, 
    textStyles: { 
        fontSize: 28,
        marginBottom: 20
    }, 
    inputStyles: { 
        width: '90%',
    }
   
});