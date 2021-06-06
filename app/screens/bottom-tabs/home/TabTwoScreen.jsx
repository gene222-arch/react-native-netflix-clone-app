import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const TabTwoScreen = ({ navigation }) => {
    return (
        <View style={ styles.root }>
            <Text>Tab 2</Text>
            <Button title='Home' onPress={ () => navigation.navigate('Home') }/>
        </View>
    )
}

export default TabTwoScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

