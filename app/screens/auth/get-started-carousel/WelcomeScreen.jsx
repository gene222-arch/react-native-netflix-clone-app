import React from 'react'
import View from './../../../components/View';
import Text from './../../../components/Text';
import { StyleSheet } from 'react-native';
import Colors from './../../../constants/Colors';

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

const WelcomeScreen = () => 
{
    return (
        <View style={ styles.container }>
            <View></View>
            <View>
                <Text style={ styles.text }>Best</Text>
                <Text style={ styles.text }>streaming app</Text>
                <Text style={ styles.text }>you can't imagine</Text>
                <Text style={ styles.helperText }>Watch anywhere. Cancel anytime.</Text>
            </View>
        </View>
    )
}

export default WelcomeScreen
