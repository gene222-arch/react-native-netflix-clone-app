import React from 'react'
import Image from './Image';
import { StyleSheet } from 'react-native';
import APP_MINI_LOGO from './../assets/logotop.png'

const styles = StyleSheet.create({
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain'
    },
});

const AppLogo = () => {
    return (
        <Image 
            source={ APP_MINI_LOGO }
            style={ styles.logo }
        />
    )
}

export default AppLogo
