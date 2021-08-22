import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Video } from 'expo-av'
import * as NAVIGATION_ACTION from './../redux/modules/navigation/actions'
import { setStatusBarHidden } from 'expo-status-bar'
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoPlayer from 'expo-video-player'
import Text from './Text';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from './../constants/Dimensions';
import { useFocusEffect } from '@react-navigation/native';


const VideoPlayerFullScreen = ({ uri, handleCloseVideo }) => 
{
    const video = useRef(null);
    const [ inFullscreen, setInFullscreen ] = useState(false);

    const onEnterFullScreen = async () => 
    {
        setStatusBarHidden(true);

        setInFullscreen(true);

        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

        video?.current?.setStatusAsync({
          shouldPlay: true,
        });
    }

    const onExitFullScreen = useCallback(async () => {
        setStatusBarHidden(false);

        setInFullscreen(false);

        unLockOrientation();

        video.current?.pauseAsync();

        handleCloseVideo();
    }, [uri]);

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
                shouldPlay: false,
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
