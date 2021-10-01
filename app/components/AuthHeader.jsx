import React from 'react'
import View from './View'
import Text from './Text'
import { StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Image from './../components/Image';
import APP_MINI_LOGO from './../assets/app-mini-logo.png'
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 15,
        paddingHorizontal: 5,
    },
    logo: {
        height: 45,
        width: 45,
        resizeMode: 'contain'
    },
    privacySignInContainer: {
        flexDirection: 'row'
    },
    privacyText: {
        fontWeight: 'bold',
        marginRight: 10
    },
    signInText: {
        fontWeight: 'bold',
        marginRight: 10
    }
});

const AuthHeader = () => 
{
    const navigation = useNavigation();

    return (
        <View style={ styles.container }>
            <Image 
                source={ APP_MINI_LOGO }
                style={ styles.logo }
            />
            <View style={ styles.privacySignInContainer }>
                <TouchableOpacity>
                    <Text style={ styles.privacyText }>PRIVACY</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => navigation.navigate('Login') }>
                    <Text style={ styles.signInText }>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AuthHeader
