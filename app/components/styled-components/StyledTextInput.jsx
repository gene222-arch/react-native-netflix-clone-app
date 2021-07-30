import React, { useMemo } from 'react'
import { View } from 'react-native';
import { TextInput, StyleSheet } from 'react-native'
import Colors from './../../constants/Colors';
import Text from './../Text';

const styles = (error = false) => StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    helperText: {
        color: error ? Colors.warning : 'transparent',
        marginTop: -10,
        marginBottom: 20,
        marginLeft: 10
    },
    textField: {
        height: 60,
        borderBottomWidth: error ? 2 : 0,
        borderColor: error ? Colors.error : 'transparent',
    }
});

const StyledTextInput = ({ error = false, helperText = '', style, ...props }) => 
{

    return (
        <View style={ styles().container }>
            <TextInput 
                { ...props } 
                style={[ ...style, styles(error).textField ]}
            />
            {helperText.length > 0 && (
                <Text style={ styles(error).helperText } >{ helperText }</Text>
            )}
        </View>
    )
}

export default StyledTextInput
