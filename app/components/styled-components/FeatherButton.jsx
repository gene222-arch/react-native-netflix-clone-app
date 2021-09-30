import React from 'react'
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import View from '../View';
import Text from './../Text';
import Colors from './../../constants/Colors';
import ActivityIndicatorWrapper from './../ActivityIndicatorWrapper';

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

const FeatherButton = ({ name, size, color = '#FFF', label = 'Label', isLoading = false, onPress }) => 
{
    return (
        <TouchableOpacity onPress={ onPress }>
            <View style={ styles.container }>
                <ActivityIndicatorWrapper
                    isLoading={ isLoading }
                    component={
                        <FeatherIcon 
                            name={ name }
                            size={ size }
                            color={ color }
                        />
                    }
                />
                <Text style={ styles.label }>{ label.toUpperCase() }</Text>
            </View>
        </TouchableOpacity>
    )
}

export default FeatherButton