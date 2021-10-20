import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { createStructuredSelector } from 'reselect';
import {  authProfileSelector } from './../../redux/modules/auth/selectors';


const StackNavAvatar = ({ AUTH_PROFILE }) => 
{
    const navigation = useNavigation();

    const navigateToAccountScreen = () => navigation.navigate('ProfilesAndMore');
    
    return (
        <TouchableOpacity onPress={ navigateToAccountScreen }>
            <Avatar
                source={{ uri: AUTH_PROFILE.avatar }}
                avatarStyle={ styles.avatarIcon }
            />
        </TouchableOpacity>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(StackNavAvatar)

const styles = StyleSheet.create({
    avatarIcon: {
        borderRadius: 5,
    },
})
