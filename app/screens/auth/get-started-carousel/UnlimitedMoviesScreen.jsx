import React from 'react'
import View from './../../../components/View';
import Text from './../../../components/Text';
import { StyleSheet, ImageBackground } from 'react-native';
import Colors from './../../../constants/Colors';
import BG_IMG from './../../../assets/unlimited-movies.jpg'
import AuthHeader from '../../../components/AuthHeader';

const styles = StyleSheet.create({
    bgImg: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        width: '100%',
        marginTop: 50,
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
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
    textContainer: {
        backgroundColor: 'transparent'
    },
    messageContainer: {
    }
});

const UnlimitedMovieScreen = () => 
{
    return (
        <ImageBackground
            source={ BG_IMG }
            style={ styles.bgImg }
        >
            <AuthHeader />
            <View style={ styles.container }>
            <View></View>
            <View style={ styles.textContainer }>
                <Text style={ styles.text }>Unlimited</Text>
                <Text style={ styles.text }>movies & more</Text>
                <Text style={ styles.helperText }>Boredom is solved.</Text>
            </View>
        </View>
        </ImageBackground>
    )
}

export default UnlimitedMovieScreen
