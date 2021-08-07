import React, { useMemo } from 'react'
import { View } from 'react-native';
import { TextInput } from 'react-native'
import Text from './../Text';
import styles from './../../assets/stylesheets/styledTextInput';

const StyledTextInput = ({ error = false, helperText = '', style = [], ...props }) => 
{
    return (
        <View style={ styles().container }>
            <TextInput 
                { ...props } 
                style={[ Array.isArray(style) ? [...style] : style, styles(error).textField ]}
            />
            {helperText.length > 0 && (
                <Text style={ styles(error).helperText } >{ helperText }</Text>
            )}
        </View>
    )
}

export default StyledTextInput
