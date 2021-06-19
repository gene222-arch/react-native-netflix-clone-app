import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack'


const StackNavBackButton = () => 
{
    const navigation = useNavigation();

    return <HeaderBackButton onPress={ () => navigation.goBack() }/>
}


export default StackNavBackButton
