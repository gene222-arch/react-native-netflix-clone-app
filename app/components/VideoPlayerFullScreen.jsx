import React, { useEffect, useRef, useState } from 'react'
import { Video } from 'expo-av'
import * as NAVIGATION_ACTION from './../redux/modules/navigation/actions'
import { setStatusBarHidden } from 'expo-status-bar'
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoPlayer from 'expo-video-player'
import Text from './Text';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from './../constants/Dimensions';
import { useDispatch } from 'react-redux';


const VideoPlayerFullScreen = ({ uri, handleCloseVideo }) => 
{
    const dispatch = useDispatch();
    const video = useRef(null);
    const [inFullscreen, setInFullscreen] = useState(false);

    const icon = {
        play: <Text style={{ color: '#FFF' }}>PLAY</Text>,
        pause: <Text style={{ color: '#FFF' }}>PAUSE</Text>,
        replay: <Text style={{ color: '#FFF' }}>REPLAY</Text>,
    };

    const onEnterFullScreen = async () => 
    {
        dispatch(NAVIGATION_ACTION.toggleTabBarStart());

        setStatusBarHidden(true, 'fade')
        setInFullscreen(!inFullscreen)
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        video?.current?.setStatusAsync({
          shouldPlay: true,
        });
    }

    const onExitFullScreen = async () => 
    {
        dispatch(NAVIGATION_ACTION.toggleTabBarStart());

        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        setStatusBarHidden(false, 'fade');
        setInFullscreen(false);
        handleCloseVideo();
    }

    const style = {
        videoBackgroundColor: 'black',
        height: inFullscreen ? DEVICE_WIDTH : 160,
        width: inFullscreen ? DEVICE_HEIGHT : 320,
    };

    useEffect(() => {
        onEnterFullScreen();
        return () => {
            video.current = null;
            setInFullscreen(false);
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
