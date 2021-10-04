import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Video } from 'expo-av'
import { setStatusBarHidden } from 'expo-status-bar'
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoPlayer from 'expo-video-player'
import Text from './Text';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from './../constants/Dimensions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/core'


const VideoPlayerFullScreen = ({ uri, shouldPlay, setShouldPlay }) => 
{
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const video = useRef(null);
    const [ inFullscreen, setInFullscreen ] = useState(false);

    const onEnterFullScreen = async () => 
    {
        setStatusBarHidden(true);

        setInFullscreen(true);

        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }

    const onExitFullScreen = async () => 
    {
        setStatusBarHidden(false);

        setShouldPlay(false);

        video?.current?.pauseAsync();

        navigation.goBack();
    };

    const unLockOrientation = async () => await ScreenOrientation.unlockAsync();

    useFocusEffect(
        useCallback(() => {
            onEnterFullScreen();

            return () => {
                video.current = null;
                unLockOrientation();
                setInFullscreen(false);
            }
        }, [])
    );

    return (
        <VideoPlayer
            videoProps={{
                shouldPlay: isFocused,
                resizeMode: Video.RESIZE_MODE_CONTAIN,
                source: { uri },
                ref: video,
            }}
            icon={{
                play: <Text style={{ color: '#FFF' }}>PLAY</Text>,
                pause: <Text style={{ color: '#FFF' }}>PAUSE</Text>,
                replay: <Text style={{ color: '#FFF' }}>REPLAY</Text>,

            }}
            fullscreen={{
                inFullscreen,
                enterFullscreen: onEnterFullScreen,
                exitFullscreen: onExitFullScreen,
            }}
            style={{
                videoBackgroundColor: 'black',
                height: inFullscreen ? DEVICE_WIDTH : 160,
                width: inFullscreen ? DEVICE_HEIGHT : 320,
            }}
            
        />
    )
}

export default VideoPlayerFullScreen
