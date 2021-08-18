import React from 'react'
import { View as DefaultView, useColorScheme, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

const View = ({ row = false, style, ...props }) =>
{
    const theme = useColorScheme();
    
    return (
        <DefaultView 
            style={[
                Colors.theme.container['dark'], 
                { 
                    ...styles, 
                    flexDirection: !row ? styles.viewDefaultStyle.flexDirection : 'row' 
                }, 
                style
            ]} 
            {...props} 
        />
    )
}

const styles = StyleSheet.create({
    viewDefaultStyle: {
        flexDirection: 'column'
    }
});

export default View


