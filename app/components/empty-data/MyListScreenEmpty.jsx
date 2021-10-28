import React from 'react'
import { StyleSheet } from 'react-native'
import View from './../View';
import Text from './../Text';
import Colors from './../../constants/Colors';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from './../../constants/Dimensions';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    btn: {
        marginHorizontal: 20,
        backgroundColor: Colors.darkGrey,
        paddingVertical: 15,
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, .5)'
    },
    btnText: {
        fontWeight: 'bold',
        color: Colors.grey
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        height: DEVICE_HEIGHT
    },
    icon: {
        color: Colors.grey,
        fontSize: DEVICE_WIDTH / 2.5,
        textAlign: 'center'
    },
    text: {
        color: Colors.grey,
        textAlign: 'center'
    }
});

const MyListScreenEmpty = () => 
{
    const navigation = useNavigation();

    return (
        <View style={ styles.container }>
            <View>
                <Ionicon name='add-outline' size={ 34 } color='#FFF' style={ styles.icon } />
                <Text h4 style={ styles.text }>
                    Add movies to your list so you can easily find them later.
                </Text>
            </View>
            <Button 
                title='Find something to watch' 
                buttonStyle={ styles.btn } 
                titleStyle={ styles.btnText }
                onPress={ () => navigation.navigate('Home') }
            />
        </View>
    )
}

export default MyListScreenEmpty
