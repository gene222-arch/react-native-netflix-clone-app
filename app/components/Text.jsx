import React from 'react'
import { useColorScheme } from 'react-native'
import { Text as DefaultText } from 'react-native-elements'
import Colors from '../constants/Colors';

const Text = ({ style, ...props }) =>
{
    const theme = useColorScheme();
  
    return <DefaultText style={ [{ ...Colors.theme.typography[theme] }, { ...style }] } {...props} />;
}

export default Text


