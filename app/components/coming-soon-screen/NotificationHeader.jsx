import React, { useState, useEffect } from 'react'
import View from './../View';
import Text from './../Text';
import { StyleSheet, TouchableOpacity } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather';
import Colors from './../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Badge } from 'react-native-elements';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../redux/modules/auth/selectors';
import { connect } from 'react-redux';

const NotificationHeader = ({ AUTH_PROFILE }) => 
{
    const navigation = useNavigation();

    const [ notifCount, setNotifCount ] = useState(0);

    const handlePressNavigateToNotifList = () => navigation.navigate('NotificationsScreen');

    const onLoadSetBadgeCount = () =>
    {
        const unreadNotifCount = AUTH_PROFILE
            .reminded_coming_soon_movies
            .filter(({ read_at, is_released }) => !Boolean(read_at) && Boolean(is_released)).length;

        setNotifCount(unreadNotifCount);
    }

    useEffect(() => 
    {
        onLoadSetBadgeCount();

        return () => {
            setNotifCount(0);
        }
    }, [AUTH_PROFILE.reminded_coming_soon_movies])

    return (
        <TouchableOpacity onPress={ handlePressNavigateToNotifList }>
            <View style={ styles.container }>
                <View style={ styles.notifBellContainer }>
                    { Boolean(notifCount) && <Badge value={ notifCount } status="error" /> }
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

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
})

export default connect(mapStateToProps)(NotificationHeader)

const styles = StyleSheet.create({
    badge: {
        fontSize: 5
    },
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
