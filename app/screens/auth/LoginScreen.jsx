import React from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Button } from 'react-native'
import * as AUTH_ACTION from '../../redux/modules/auth/actions'

const LoginScreen = ({ navigation }) => 
{
    const dispatch = useDispatch();

    const login = () => dispatch(AUTH_ACTION.loginStart());

    return (
        <View style={ styles.root }>
            <Button title='Login' onPress={ login }/>
            <Button title='Create new account' onPress={ () => navigation.navigate('Register') }/>
        </View>
    );
}

export default LoginScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
