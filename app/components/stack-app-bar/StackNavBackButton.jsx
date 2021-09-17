import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack'
import { Keyboard } from 'react-native';


const StackNavBackButton = (props) => 
{
    const navigation = useNavigation();

    const navigateBack = () => 
    { 
        if (props.onBackArrowClick) {
            props.onBackArrowClick();
        }
        else {
            Keyboard.dismiss();
            navigation.goBack();
        }
    }

    return <HeaderBackButton { ...props } onPress={ navigateBack } disabled={ props.isLoading } />
}


export default StackNavBackButton
