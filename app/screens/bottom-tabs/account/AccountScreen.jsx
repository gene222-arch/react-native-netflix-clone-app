import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, StyleSheet, Text, View } from 'react-native'
import * as AUTH_ACTION from '../../../redux/modules/auth/actions'

const AccountScreen = () => 
{
    const dispatch = useDispatch();

    return (
        <View style={ styles.root }>
            <Text>Account</Text>
            <Button title='Logout' onPress={ () => dispatch(AUTH_ACTION.logoutStart()) }/>
        </View>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
