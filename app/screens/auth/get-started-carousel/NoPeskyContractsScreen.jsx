import React from 'react'
import View from '../../../components/View';
import Text from '../../../components/Text';
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginTop: 50,
        justifyContent: 'space-between'
    },
    helperText: {
        fontSize: 15,
        color: Colors.grey,
        textAlign: 'center',
        marginTop: 30
    },  
    text: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },  
    messageContainer: {
    }
});

const NoPeskyContractsScreen = () => 
{
    return (
        <View style={ styles.container }>
            <View></View>
            <View>
                <Text style={ styles.text }>No pesky</Text>
                <Text style={ styles.text }>contracts</Text>
                <Text style={ styles.helperText }>Join today, cancel anytime.</Text>
            </View>
        </View>
    )
}

export default NoPeskyContractsScreen
