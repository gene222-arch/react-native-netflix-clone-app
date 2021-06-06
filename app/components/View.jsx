import React from 'react'
import { View as DefaultView, useColorScheme } from 'react-native'
import Colors from '../constants/Colors';

const View = ({ style, ...props }) =>
{
    const theme = useColorScheme();
  
    return <DefaultView style={ [{ ...Colors.theme.container[theme] }, { ...style }] } {...props} />;
}

export default View


