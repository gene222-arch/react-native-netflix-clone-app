import React, { useRef, useEffect } from 'react'
import { Video } from 'expo-av';
import styles from './../../assets/stylesheets/notificationsVideoItem';
import View from './../View';
import ComingSoonMovieDetails from './ComingSoonMovieDetails';
import ComingSoonMovieButtons from './ComingSoonMovieButtons';


const NotificationsVideoItem = ({ movie, shouldShowPoster, shouldFocus, handlePressToggleRemindMe, handlePressInfo, isReminded }) => 
{
    const video = useRef(null);

    useEffect(() => {
        return () => {
            video.current = null;
        }
    }, []);

    return (
        <View style={{ ...styles.container, opacity: shouldFocus ? 1 : 0.25 }}>
            <Video 
                ref={ video }
                style={ styles.video }
                // source={{ uri: getCachedFile('ComingSoon/Videos/', movie.id, movie.video_trailer_path) }}
                // posterSource={{ uri: getCachedFile('ComingSoon/Wallpaper/', movie.id, movie.poster_path) }}
                source={{ uri: movie.video_trailer_path }}
                posterSource={{ uri: movie.poster_path }}
                posterStyle={ styles.posterStyle}
                usePoster={ shouldShowPoster }
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
