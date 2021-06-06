import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SearchTabTwoScreen = () => {
    return (
        <View style={ styles.root }>
            <Text>Search</Text>
        </View>
    )
}

export default SearchTabTwoScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
