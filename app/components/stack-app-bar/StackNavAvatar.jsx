import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { createStructuredSelector } from 'reselect';
import { authSelector } from './../../redux/modules/auth/selectors';


const StackNavAvatar = ({ AUTH }) => 
{
    const navigation = useNavigation();

    const navigateToAccountScreen = () => navigation.navigate('More');
    
    return (
        <TouchableOpacity onPress={ navigateToAccountScreen }>
            <Avatar
                source={{ uri: AUTH.profile.profile_photo }}
                avatarStyle={ styles.avatarIcon }
            />
        </TouchableOpacity>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(StackNavAvatar)

const styles = StyleSheet.create({
    avatarIcon: {
        borderRadius: 5,
    },
})
