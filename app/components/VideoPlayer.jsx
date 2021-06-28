import React, { useState, useEffect, useRef } from 'react'
import { Video } from 'expo-av'
import styles from './../assets/stylesheets/videoPlayer';

const VideoPlayer = ({ episode, shouldPlay, shouldToggleVideo = true, setToggleVideo}) => 
{
    const video = useRef(null)
    const [ status, setStatus ] = useState({});
    
    const handleUpdateStatus = (status) => 
    {
        setStatus(() => status);

        if (shouldToggleVideo) {
            if (!status.isPlaying) {
                setToggleVideo(false);
            }
            else {
                setToggleVideo(true);
            }
        }
    }

    useEffect(() => {
        if (!video) {
            return;
        }

        (async () => {
            await video?.current?.unloadAsync();
            await video?.current?.loadAsync(
                { uri: episode?.video },
                {},
                false
            );
        })();
    }, [episode])

    return (
        <Video 
            ref={ video }
            style={ styles.video }
            source={{
                uri: episode?.video
            }}
            posterStyle={ styles.poster }
            useNativeControls
            resizeMode='contain'
            onPlaybackStatusUpdate={ handleUpdateStatus }
            shouldPlay={ shouldPlay }
        />
    )
}

export default VideoPlayer
