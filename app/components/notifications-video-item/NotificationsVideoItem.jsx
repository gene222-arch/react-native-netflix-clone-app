import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Video } from 'expo-av';
import styles from './../../assets/stylesheets/notificationsVideoItem';
import View from './../View';
import ComingSoonMovieDetails from './ComingSoonMovieDetails';
import ComingSoonMovieButtons from './ComingSoonMovieButtons';
import { useFocusEffect, useIsFocused } from '@react-navigation/core';
import * as ScreenOrientation from 'expo-screen-orientation'

const NotificationsVideoItem = ({ movie, shouldShowPoster, shouldFocus, shouldPlay, handlePressToggleRemindMe, handlePressInfo, isReminded }) => 
{
    const isFocused = useIsFocused();
    const video = useRef(null);

    const [ isFullscreen, setIsFullscreen ] = useState(false);


    const onChangeSourceRestartVideo = async () => {
        try {
            await video?.current?.unloadAsync();
            await video?.current?.loadAsync({ uri: movie.video_trailer_path }, {}, false);
            video.current = null;
        } catch ({ message }) {}
    } 

    const onUnloadUnlockLandscape = async () => {
        try {
            await ScreenOrientation.unlockAsync();
        } catch (error) {
            console.log(error);
        }
    }
    
    const onLoadLockToLandscape = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    }
    
    const handleFullscreenUpdate = e => 
    {
        if (e.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS) {
            setIsFullscreen(false);
        }

        if (e.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT) {
            setIsFullscreen(true);
        }
    }

    useFocusEffect(
        useCallback(() => {
            return () => {
                onChangeSourceRestartVideo();
            }
        }, [])
    )

    useEffect(() => {
        if (! isFullscreen) {
            onUnloadUnlockLandscape();
        }

        if (isFullscreen) {
            onLoadLockToLandscape();
            video.current?.presentFullscreenPlayer();    
        }
    }, [isFullscreen])

    return (
        <View style={{ ...styles.container, opacity: shouldFocus ? 1 : 0.25 }}>
            <Video 
                ref={ video }
                style={ styles.video }
                source={{ uri: movie.video_trailer_path }}
                posterSource={{ uri: movie.poster_path }}
                posterStyle={ styles.posterStyle}
                usePoster={ shouldShowPoster }
                shouldPlay={ shouldPlay && isFocused }
                resizeMode='contain'
                useNativeControls
                onFullscreenUpdate={ handleFullscreenUpdate }
            />

            <ComingSoonMovieButtons 
                movie={ movie } 
                handlePressToggleRemindMe={ handlePressToggleRemindMe }
                handlePressInfo={ handlePressInfo }
                isReminded={ isReminded }
            />

            <ComingSoonMovieDetails movie={ movie } />
        </View>
    )
}

export default NotificationsVideoItem
