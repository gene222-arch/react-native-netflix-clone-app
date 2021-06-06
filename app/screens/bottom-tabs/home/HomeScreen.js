import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const HomeScreen = ({ navigation }) => 
{
    return (
        <View style={ styles.root }>
            <Text>Home</Text>
            <Button title='TabTwo' onPress={ () => navigation.navigate('TabTwo') }/>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
