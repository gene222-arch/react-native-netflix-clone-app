import React from 'react'
import View from './../View';
import Text from './../Text';
import { StyleSheet, TouchableOpacity } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather';
import Colors from './../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const NotificationHeader = () => 
{
    const navigation = useNavigation();

    const handlePressNavigateToNotifList = () => navigation.navigate('NotificationsScreen');

    return (
        <TouchableOpacity onPress={ handlePressNavigateToNotifList }>
            <View style={ styles.container }>
                <View style={ styles.notifBellContainer }>
                    <FeatherIcon 
                        name='bell'
                        color={ Colors.white }
                        size={ 24 }
                    />
                    <Text style={ styles.headerTitle }>Notifications</Text>
                </View>
                <FeatherIcon 
                    name='chevron-right'
                    color={ Colors.white }
                    size={ 24 }
                />
            </View>
        </TouchableOpacity>
    )
}

export default NotificationHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        marginLeft: 10
    },
    notifBellContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
