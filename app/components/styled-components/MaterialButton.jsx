import React from 'react'
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import View from '../View';
import Text from './../Text';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    label: {
        fontSize: 10,
        marginTop: 5,
        color: Colors.grey
    }
});

const MaterialButton = ({ name, size, color = '#FFF', label = 'Label', onPress }) => 
{
    return (
        <TouchableOpacity onPress={ onPress }>
            <View style={ styles.container }>
                <MaterialCommunityIcon 
                    name={ name }
                    size={ size }
                    color={ color }
                />
                <Text style={ styles.label }>{ label.toUpperCase() }</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MaterialButton
