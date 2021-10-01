import React, { useRef, useCallback } from 'react'
import Carousel from 'react-native-snap-carousel';
import WelcomeScreen from './get-started-carousel/WelcomeScreen';
import UnlimitedMoviesScreen from './get-started-carousel/UnlimitedMoviesScreen';
import NoPeskyContractsScreen from './get-started-carousel/NoPeskyContractsScreen';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Colors from './../../constants/Colors';
import View from '../../components/View';
import { DEVICE_WIDTH } from './../../constants/Dimensions';
import AuthHeader from './../../components/AuthHeader';
import { useFocusEffect } from '@react-navigation/core';
import * as ScreenOrientation from 'expo-screen-orientation';


const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.netFlixRed,
        color: Colors.white,
        height: 50,
        borderRadius: 3
    },
    container: {
        width: '100%',
    },  
    carousel: {
        flex: 1
    },
    renderItemContainer: {
        height: '80%',
        width: '100%'
    }
});

const GetStartedScreen = () => 
{
    const carousel = useRef(null);

    const onUnloadUnlockPortrait = async () => await ScreenOrientation.unlockAsync();

    const onLoadLockToPortrait = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    const entries = [
        <WelcomeScreen />,
        <UnlimitedMoviesScreen />,
        <NoPeskyContractsScreen />
    ];
    
    useFocusEffect(
        useCallback(() => {
            onLoadLockToPortrait();
            
            return () => {
                onUnloadUnlockPortrait();
            }
        }, [])
    )

    return (
        <View style={ styles.container }>
            <AuthHeader />
            <Carousel
                ref={(c) => { carousel.current = c; }}
                data={ entries }
                renderItem={ ({ item, index }) => <View style={ styles.renderItemContainer }>{ item }</View> }
                sliderWidth={ DEVICE_WIDTH }
                itemWidth={ DEVICE_WIDTH }
                layout={'stack'} 
                layoutCardOffset={ 18 }
                style={ styles.carousel }
                pagingEnabled
            />
            <Button 
                title='GET STARTED'
                buttonStyle={ styles.btn }
            />
        </View>
    );
}

export default GetStartedScreen
