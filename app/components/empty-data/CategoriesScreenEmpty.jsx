import React from 'react'
import { StyleSheet } from 'react-native'
import View from './../View';
import Text from './../Text';
import Ionicon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center'
    }
});

const CategoriesScreenEmpty = () => 
{
    return (
        <View style={ styles.container }>
            <Text h2 style={ styles.text }>
                SOON <Ionicon name='alert-circle-outline' size={ 34 } color='#FFF' />
            </Text>
        </View>
    )
}

export default CategoriesScreenEmpty
