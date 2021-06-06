import React from 'react'
import { StyleSheet, Button } from 'react-native'
import View from './../../../components/View';
import Text from './../../../components/Text';

const ComingSoonScreen = ({ navigation }) => {
    return (
        <View style={ styles.root }>
            <Text>Coming soon</Text>
            <Button title='Tab two COming soon' onPress={ () => navigation.navigate('ComingSoonTabTwo') }/>
        </View>
    )
}

export default ComingSoonScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})