import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Video } from 'expo-av';
import styles from './../../assets/stylesheets/notificationsVideoItem';
import View from './../View';
import ComingSoonMovieDetails from './ComingSoonMovieDetails';
import ComingSoonMovieButtons from './ComingSoonMovieButtons';
import { useFocusEffect, useIsFocused } from '@react-navigation/core';
import * as ScreenOrientation from 'expo-screen-orientation'
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../redux/modules/auth/selectors';
import { connect } from 'react-redux';

const NotificationsVideoItem = ({ AUTH_PROFILE, movie, shouldShowPoster, shouldFocus, shouldPlay, handlePressToggleRemindMe, handlePressInfo }) => 
{
    const isFocused = useIsFocused();
    const video = useRef(null);

    const [ isMovieReminded, setIsMovieReminded ] = useState(false);

    const onChangeSourceRestartVideo = async () => {
        try {
            await video?.current?.unloadAsync();
            await video?.current?.loadAsync({ uri: movie.video_trailer_path }, {}, false);
            video.current = null;
        } catch ({ message }) {}
    }
    
    const handleFullscreenUpdate = async (e) => 
    {
        try {
            if (e.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT) {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
            }

            if (e.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS) { 
                await ScreenOrientation.unlockAsync();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onLoadCheckIfMovieIsReminded = () => 
    {
        const isReminded = AUTH_PROFILE
            .reminded_coming_soon_movies
            .find(({ coming_soon_movie_id }) => coming_soon_movie_id === movie.id);

        setIsMovieReminded(isReminded)
    }

    useFocusEffect(
        useCallback(() => {
            return () => {
                onChangeSourceRestartVideo();
            }
        }, [])
    );

    useEffect(() => 
    {
        onLoadCheckIfMovieIsReminded();
        return () => {
            setIsMovieReminded(false);
        }
    }, []);

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
                handlePressToggleRemindMe={ () => {
                    setIsMovieReminded(! isMovieReminded);
                    handlePressToggleRemindMe(movie.id, isMovieReminded);
                } }
                handlePressInfo={ handlePressInfo }
                isReminded={ isMovieReminded }
            />

            <ComingSoonMovieDetails movie={ movie } />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(NotificationsVideoItem)
