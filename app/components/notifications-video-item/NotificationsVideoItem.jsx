import React, { useRef, useCallback } from 'react'
import { Video } from 'expo-av';
import styles from './../../assets/stylesheets/notificationsVideoItem';
import View from './../View';
import ComingSoonMovieDetails from './ComingSoonMovieDetails';
import ComingSoonMovieButtons from './ComingSoonMovieButtons';
import { useFocusEffect, useIsFocused } from '@react-navigation/core';


const NotificationsVideoItem = ({ movie, shouldShowPoster, shouldFocus, shouldPlay, handlePressToggleRemindMe, handlePressInfo, isReminded }) => 
{
    const isFocused = useIsFocused();
    const video = useRef(null);

    const onChangeSourceRestartVideo = async () => {
        try {
            await video?.current?.unloadAsync();
            await video?.current?.loadAsync({ uri: movie.video_trailer_path }, {}, false);
            video.current = null;
        } catch ({ message }) {}
    } 

    useFocusEffect(
        useCallback(() => {
            return () => {
                onChangeSourceRestartVideo();
            }
        }, [])
    )

    return (
        <View style={{ ...styles.container, opacity: shouldFocus ? 1 : 0.25 }}>
            <Video 
                ref={ video }
                style={ styles.video }
                source={{ uri: movie.video_trailer_path }}
                posterSource={{ uri: movie.poster_path }}
                posterStyle={ styles.posterStyle}
                usePoster={ !shouldPlay }
                shouldPlay={ shouldPlay && isFocused }
                resizeMode='contain'
                useNativeControls
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
