import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Video } from 'expo-av'
import { setStatusBarHidden } from 'expo-status-bar'
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoPlayer from 'expo-video-player'
import Text from './Text';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from './../constants/Dimensions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/core'
import * as AUTH_ACTION from './../redux/modules/auth/actions'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../redux/modules/auth/selectors';


const VideoPlayerFullScreen = ({ AUTH_PROFILE, uri, movieId, hasLastPlayedPositionMillis, lastPlayedPositionMillis }) => 
{
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const video = useRef(null);
    const [ inFullscreen, setInFullscreen ] = useState(false);
    const [ videoStatus, setVideoStatus ] = useState(null);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ positionMillis, setPositionMillis ] = useState(0);
    const [ durationMillis, setDurationMillis ] = useState(0);

    const onEnterFullScreen = async () => 
    {
        setStatusBarHidden(true);

        setInFullscreen(true);  

        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }

    const onExitFullScreen = async () => 
    {
        setStatusBarHidden(false);

        video?.current?.pauseAsync();

        setInFullscreen(false);

        await ScreenOrientation.unlockAsync();

        if (hasLastPlayedPositionMillis) {
            dispatch(AUTH_ACTION.updateRecentlyWatchedAtPositionMillisStart({ 
                movieId, 
                positionMillis, 
                user_profile_id: AUTH_PROFILE.id,
                duration_in_millis: durationMillis
            }));
        }
        navigation.goBack();
    };

    useEffect(() => {
        onEnterFullScreen();

        return () => 
        {
            video.current = null;
            setInFullscreen(false);
            setIsLoaded(false);
            setVideoStatus(null);
            setPositionMillis(0);
        }
    }, [])

    return (
        <VideoPlayer
            videoProps={{
                shouldPlay: isFocused,
                resizeMode: Video.RESIZE_MODE_CONTAIN,
                source: { uri },
                ref: video,
                status: videoStatus,
                
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
            playbackCallback={status => 
            {
                if (status.isPlaying) {
                    setPositionMillis(parseInt(status.positionMillis));
                }

                if (! isLoaded) 
                {
                    setDurationMillis(status.durationMillis);
                    setVideoStatus(() => ({
                        ...status,
                        positionMillis: lastPlayedPositionMillis
                    }));

                    setIsLoaded(true);
                }
            }}
        />
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(VideoPlayerFullScreen)
