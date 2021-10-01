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

const UnlimitedMovieScreen = () => 
{
    return (
        <View style={ styles.container }>
            <View></View>
            <View>
                <Text style={ styles.text }>Unlimited</Text>
                <Text style={ styles.text }>movies & more</Text>
                <Text style={ styles.helperText }>Boredom is solved.</Text>
            </View>
        </View>
    )
}

export default UnlimitedMovieScreen