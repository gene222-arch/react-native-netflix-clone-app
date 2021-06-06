import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const RegisterScreen = ({ navigation }) => {
    return (
        <View style={ styles.root }>
            <Text>Create an account</Text>
            <Button title='Already have an account?' onPress={ () => navigation.navigate('Login') }/>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
