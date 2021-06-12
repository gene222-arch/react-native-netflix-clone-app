import React from 'react'
import { useColorScheme } from 'react-native'
import { Text as DefaultText } from 'react-native-elements'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

const Text = ({ style, touchableOpacity = false, onPress, ...props }) =>
{
    const theme = useColorScheme();
  
    if (touchableOpacity) {
        return (
            <TouchableOpacity onPress={ onPress }>
                <DefaultText style={ [{ ...Colors.theme.typography[theme], lineHeight: 20 }, { ...style }] } {...props} />
            </TouchableOpacity>
        )
    }

    return <DefaultText style={ [{ ...Colors.theme.typography[theme] }, { ...style }] } {...props} />
}

export default Text


