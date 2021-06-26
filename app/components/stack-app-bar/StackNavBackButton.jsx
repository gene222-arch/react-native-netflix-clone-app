import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack'
import { Keyboard } from 'react-native';


const StackNavBackButton = () => 
{
    const navigation = useNavigation();

    const navigateBack = () => {
        Keyboard.dismiss();
        navigation.goBack();
    }

    return <HeaderBackButton onPress={ navigateBack }/>
}


export default StackNavBackButton
