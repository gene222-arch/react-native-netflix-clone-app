import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AccountTabTwoScreen = ({ navigation }) => 
{
    return (
        <View style={ styles.root }>
            <Text>Account Tab Two</Text>
            <Button title='TabTwo' onPress={ () => navigation.navigate('Account') }/>
        </View>
    )
}

export default AccountTabTwoScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
