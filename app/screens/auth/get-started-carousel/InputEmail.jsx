import React, { useState, useRef, useCallback } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Text from '../../../components/Text'
import View from '../../../components/View'
import Colors from './../../../constants/Colors';
import { Button } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/core';

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.netFlixRed,
        color: Colors.white,
        height: 50,
        borderRadius: 3,
        marginTop: 20
    },  
    container: {
        backgroundColor: 'transparent'
    },  
    closeIcon: {
        textAlign: 'right',
        marginBottom: 30
    },  
    errorMessage: {
        color: Colors.netFlixRed
    },
    input: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        color: Colors.darkGrey,
        padding: 20,
        height: 60,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.success
    },
    instructionText: {
        color: Colors.darkGrey,
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center'
    },
    readyToWatchText: {
        color: Colors.darkGrey,
        fontSize: 28,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

const InputEmail = ({ onPressCloseIcon }) => 
{
    const navigation = useNavigation();
    const inputRef = useRef(null);

    const [ email, setEmail ] = useState('');
    const [ hasError, setHasError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const handleChangeEmail = (text) => 
    {
        setEmail(text);
        const isValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if (! text.length) {
            setErrorMessage('Email is required');
            setHasError(true);
        }
        
        if (text.length && text.length < 5) {
            setErrorMessage('Email should be between 5 and 50 characters');
            setHasError(true);
        }

        if (text.length >= 5 && !text.match(isValid)) {
            setErrorMessage('Please enter a valid email address');
            setHasError(true);
        }

        if (text.length && text.length >= 5 && text.match(isValid)) {
            setErrorMessage('');
            setHasError(false);
        }
    }

    const handleClickSubmit = () => 
    {
        if (! email.length) {
            setHasError(true);
            setErrorMessage('Email is required');
        }

        if (! hasError && email.length) 
        {
            setHasError(false);
            setErrorMessage('');

            navigation.navigate('Login', {
                email
            });
        }
    }

    useFocusEffect(
        useCallback(() => {
            inputRef.current.focus();

            return () => {
                setEmail('');
                setHasError(false);
                setErrorMessage('');
                inputRef.current = null;
            }
        }, [])
    )

    return (
        <View style={ styles.container }>
            <TouchableOpacity onPress={ onPressCloseIcon }>
                <FeatherIcon 
                    name='x'
                    size={ 25 }
                    color={ Colors.darkGrey }
                    style={ styles.closeIcon }
                />
            </TouchableOpacity>
            <Text style={ styles.readyToWatchText }>Ready to watch?</Text>
            <Text style={ styles.instructionText }>Enter your email in order to sign in to your account.</Text>
            <TextInput 
                ref={ (input) => { inputRef.current = input } }
                placeholder='Email'
                placeholderTextColor={ Colors.darkGrey }
                style={[ styles.input, { borderColor: hasError ? Colors.netFlixRed : '' } ]}
                value={ email }
                onChangeText={ handleChangeEmail }
            />
            { hasError && <Text style={ styles.errorMessage }>{ errorMessage }</Text> }
            <Button 
                title='GET STARTED'
                buttonStyle={ styles.btn }
                onPress={ handleClickSubmit }
            />
        </View>
    )
}

export default InputEmail
