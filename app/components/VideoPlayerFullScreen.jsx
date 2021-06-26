import React, { useEffect, useRef, useState } from 'react'
import { Video } from 'expo-av'
import styles from './../assets/stylesheets/playDownload';
import { setStatusBarHidden } from 'expo-status-bar'
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoPlayer from 'expo-video-player'
import Text from './Text';
import { Dimensions } from 'react-native'


const VideoPlayerFullScreen = ({ uri, setShowVideo }) => 
{
    const video = useRef(null);
    const [inFullscreen, setInFullscreen] = useState(false);

    const icon = {
        play: <Text style={{ color: '#FFF' }}>PLAY</Text>,
        pause: <Text style={{ color: '#FFF' }}>PAUSE</Text>,
        replay: <Text style={{ color: '#FFF' }}>REPLAY</Text>,
    };

    const onEnterFullScreen = async () => 
    {
        setStatusBarHidden(true, 'fade')
        setInFullscreen(!inFullscreen)
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        video.current.setStatusAsync({
          shouldPlay: true,
        })
    }

    const onExitFullScreen = async () => 
    {
        setStatusBarHidden(false, 'fade');
        setInFullscreen(false);
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
        setShowVideo(false);
    }

    const style = {
        videoBackgroundColor: 'black',
        height: inFullscreen ? Dimensions.get('window').width : 160,
        width: inFullscreen ? Dimensions.get('window').height : 320,
    };

    useEffect(() => {
        onEnterFullScreen();
        return () => {
            video.current = null;
        }
    }, []);

    return (
        <VideoPlayer
            videoProps={{
                shouldPlay: false,
                resizeMode: Video.RESIZE_MODE_CONTAIN,
                source: { uri },
                ref: video,
            }}
            icon={ icon }
            fullscreen={{
                inFullscreen,
                enterFullscreen: onEnterFullScreen,
                exitFullscreen: onExitFullScreen,
            }}
            style={ style }
            
        />
    )
}

export default VideoPlayerFullScreen
