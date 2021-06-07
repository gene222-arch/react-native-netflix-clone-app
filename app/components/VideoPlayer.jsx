import React, { useState, useEffect, useRef } from 'react'
import View from './View';
import Text from './Text';
import { Video } from 'expo-av'
import styles from './../assets/stylesheets/videoPlayer';

const VideoPlayer = ({ episode, shouldPlay }) => 
{
    const video = useRef(null)
    const [ usePoster, setUsePoster ] = useState(true);
    const [ status, setStatus ] = useState({});
    
    const handleUpdateStatus = (status) => setStatus(() => status);

    useEffect(() => {
        if (!video) {
            return;
        }

        (async () => {
            await video?.current?.unloadAsync();
            await video?.current?.loadAsync(
                { uri: episode.video },
                {},
                false
            );
        })();
    }, [episode])

    return (
        <View>
            <Video 
                ref={ video }
                style={ styles.video }
                source={{
                    uri: episode.video
                }}
                onLoad={ () => setUsePoster(false) }
                usePoster={ usePoster }
                posterSource={{ uri: episode.poster }}
                posterStyle={ styles.poster }
                useNativeControls
                resizeMode='contain'
                onPlaybackStatusUpdate={ handleUpdateStatus }
                shouldPlay={ shouldPlay }
            />
        </View>
    )
}

export default VideoPlayer
