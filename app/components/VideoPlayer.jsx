import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import { Video } from 'expo-av'
import styles from './../assets/stylesheets/videoPlayer';
import View from './View';
import Ionicon from 'react-native-vector-icons/Ionicons';

const VideoPlayer = ({ episode, shouldPlay, shouldShowPoster = false, shouldToggleVideo = true, setToggleVideo}) => 
{
    const video = useRef(null)
    const [ status, setStatus ] = useState({});
    const [ shouldPlayVideo, setShouldPlayVideo ] = useState(shouldPlay);
    const [ usePoster, setUsePoster ] = useState(shouldShowPoster);
    
    const handleUpdateStatus = (status) => 
    {
        setStatus(() => status);

        if (!status.isPlaying) {
            setUsePoster(true);
            setShouldPlayVideo(false);
        }

        if (shouldToggleVideo) {
            if (!status.isPlaying) {
                setToggleVideo(false);
            }
            else {
                setToggleVideo(true);
            }
        }
    }

    const handlePressPlayBtn = () => {
        setUsePoster(false);
        setShouldPlayVideo(true);
    }

    const onChangeSourceRestartVideo = async () => 
    {
        await video?.current?.unloadAsync();
        await video?.current?.loadAsync({ uri: episode?.video }, {}, false);
    } 

    useEffect(() => {
        if (!video) {
            return;
        }

        onChangeSourceRestartVideo();
        return () => {
            setStatus({});
            setUsePoster(false);
            video.current = null;
            setShouldPlayVideo(false);
        }
    }, [episode]);


    if (!shouldShowPoster) {
        return (
            <Video 
                ref={ video }
                style={ styles.video }
                source={{
                    uri: episode?.video
                }}
                usePoster={ usePoster }
                posterSource={{ uri: episode?.poster }}
                posterStyle={ styles.poster }
                useNativeControls
                resizeMode='contain'
                onPlaybackStatusUpdate={ handleUpdateStatus }
                shouldPlay={ shouldPlayVideo }
            />
        )
    }

    return (
        <View>
            <Video 
                ref={ video }
                style={ styles.video }
                source={{
                    uri: episode?.video
                }}
                usePoster={ usePoster }
                posterSource={{ uri: episode?.poster }}
                posterStyle={ styles.poster }
                useNativeControls
                resizeMode='contain'
                onPlaybackStatusUpdate={ handleUpdateStatus }
                shouldPlay={ shouldPlayVideo }
            />
            {
                !shouldPlayVideo && (
                    <TouchableOpacity onPress={ handlePressPlayBtn } style={ styles.playIcon }>
                        <Ionicon 
                            name='play-circle-outline'
                            size={ 70 }
                            color='#fff'
                        />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default VideoPlayer
