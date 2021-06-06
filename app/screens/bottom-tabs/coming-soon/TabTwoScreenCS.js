import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const TabTwoScreenCS = () => {
    return (
        <View style={ styles.root }>
            <Text>Coming soon Tab two</Text>
        </View>
    )
}

export default TabTwoScreenCS

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})