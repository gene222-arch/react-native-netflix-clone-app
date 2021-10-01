import React, { useRef } from 'react'
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

    const entries = [
        <WelcomeScreen />,
        <UnlimitedMoviesScreen />,
        <NoPeskyContractsScreen />
    ];

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
