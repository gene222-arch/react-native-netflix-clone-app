import React, { forwardRef } from 'react'
import { View } from 'react-native';
import { TextInput } from 'react-native'
import Text from './../Text';
import styles from './../../assets/stylesheets/styledTextInput';

const StyledTextInput = forwardRef(({ error = false, helperText = '', style = [], ...props }, ref) => (
    <View style={ styles().container }>
        <TextInput 
            { ...props } 
            ref={ ref }
            style={[ Array.isArray(style) ? [...style] : style, styles(error).textField ]}
        />
        {helperText.length > 0 && (
            <Text style={ styles(error).helperText } >{ helperText }</Text>
        )}
    </View>
))

export default StyledTextInput
