import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DownloadsScreen = () => {
    return (
        <View style={ styles.root }>
            <Text>Downloads</Text>
        </View>
    )
}

export default DownloadsScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
