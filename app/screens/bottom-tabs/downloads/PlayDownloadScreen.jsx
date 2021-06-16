import React, { useEffect, useRef } from 'react'
import { Video } from 'expo-av'
import styles from '../../../assets/stylesheets/playDownload';
import View from '../../../components/View';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Button } from 'react-native-elements';

const PlayDownloadScreen = ({ uri, setShowVideo }) => 
{
    const video = useRef(null)

    const showVideoInFullscreen = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        await video?.current?.playAsync();
        video?.current?.presentFullscreenPlayer();
    }

    const dismissVideoFromFullscreen = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        await video?.current?.pauseAsync();
        video?.current?.dismissFullscreenPlayer();
    }

    const onFullscreenUpdate = ({ fullscreenUpdate, status }) => 
    {
        if (Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS) {
            setShowVideo(false);
            dismissVideoFromFullscreen();
        }
    }

    useEffect(() => {
        showVideoInFullscreen();

        return () => {
            video.current = null;
        }
    }, []);

    return (
        <Video 
            ref={ video }
            source={{ uri }}
            resizeMode='contain'
            useNativeControls
            onFullscreenUpdate={ onFullscreenUpdate }
            style={ styles.video }
            shouldPlay={ true }
        />
    )
}

export default PlayDownloadScreen
