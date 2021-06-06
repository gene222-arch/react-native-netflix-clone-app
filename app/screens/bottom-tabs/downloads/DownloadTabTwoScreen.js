import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DownloadTabTwoScreen = () => {
    return (
        <View style={ styles.root }>
            <Text>Download Tab Two</Text>
        </View>
    )
}

export default DownloadTabTwoScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
