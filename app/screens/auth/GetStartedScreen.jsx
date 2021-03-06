import React, { useState, useRef } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import WelcomeScreen from './get-started-carousel/WelcomeScreen';
import UnlimitedMoviesScreen from './get-started-carousel/UnlimitedMoviesScreen';
import NoPeskyContractsScreen from './get-started-carousel/NoPeskyContractsScreen';
import { StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Colors from './../../constants/Colors';
import View from '../../components/View';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from './../../constants/Dimensions';
import InputEmail from './get-started-carousel/InputEmail';


const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.netFlixRed,
        color: Colors.white,
        height: 50,
        borderRadius: 3
    },
    container: {
        width: '100%',
        height: DEVICE_HEIGHT
    },  
    carousel: {
        flex: 1
    },
    carouselContainer: {
        backgroundColor: 'transparent',
        height: 625
    },
    getStarted: {
        padding: 25
    },  
    renderItemContainer: {
        height: '100%',
        width: '100%'
    }
});

const GetStartedScreen = () => 
{
    const carousel = useRef(null);

    const [ showOverlay, setShowOverlay ] = useState(false);
    const [ activeSlideIndex, setActiveSlideIndex ] = useState(0);

    const handleToggleOverLay = () => setShowOverlay(! showOverlay);

    const entries = [
        <WelcomeScreen />,
        <UnlimitedMoviesScreen />,
        <NoPeskyContractsScreen />
    ];

    return (
        <View style={ styles.container }>
             <Overlay 
                isVisible={ showOverlay } 
                overlayStyle={ styles.getStarted } 
                fullScreen
                animationType='slide'
            >
                <InputEmail onPressCloseIcon={ handleToggleOverLay } />
            </Overlay>
            <Carousel
                ref={(c) => { carousel.current = c; }}
                data={ entries }
                renderItem={ ({ item, index }) => <View key={ index } style={ styles.renderItemContainer }>{ item }</View> }
                sliderWidth={ DEVICE_WIDTH }
                itemWidth={ DEVICE_WIDTH }
                layout={'stack'} 
                layoutCardOffset={ 18 }
                pagingEnabled
                enableSnap
                contentContainerCustomStyle={ styles.carouselContainer }
                onSnapToItem={ (index) => setActiveSlideIndex(index) }
            />
            <Pagination
                dotsLength={ 3 } // also based on number of sildes you want
                activeDotIndex={ activeSlideIndex }
                containerStyle={{ backgroundColor: "#000000" }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: "#FFF"
                }}
                inactiveDotStyle={{
                    backgroundColor: "pink"
                }}
                inactiveDotOpacity={ 0.4 }
                inactiveDotScale={ 0.8 }
            />
            <Button 
                title='GET STARTED'
                buttonStyle={ styles.btn }
                onPress={ handleToggleOverLay }
            />
        </View>
    );
}

export default GetStartedScreen
