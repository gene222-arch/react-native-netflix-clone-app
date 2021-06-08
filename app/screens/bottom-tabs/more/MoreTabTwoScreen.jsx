import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MoreTabTwoScreen = ({ navigation }) => 
{
    return (
        <View style={ styles.root }>
            <Text>More Tab Two</Text>
            <Button title='TabTwo' onPress={ () => navigation.navigate('More') }/>
        </View>
    )
}

export default MoreTabTwoScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
