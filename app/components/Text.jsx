import React from 'react'
import { useColorScheme } from 'react-native'
import { Text as DefaultText } from 'react-native-elements'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

const Text = ({ style, touchableFeedback = false, ...props }) =>
{
    const theme = useColorScheme();
  
    if (touchableFeedback) {
        return (
            <TouchableNativeFeedback>
                <DefaultText style={ [{ ...Colors.theme.typography[theme] }, { ...style }] } {...props} />
            </TouchableNativeFeedback>
        )
    }

    return <DefaultText style={ [{ ...Colors.theme.typography[theme] }, { ...style }] } {...props} />
}

export default Text


