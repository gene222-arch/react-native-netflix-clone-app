import React, { useEffect, useRef, useState } from 'react'
import { BackHandler } from 'react-native'
import { Video } from 'expo-av'
import { setStatusBarHidden } from 'expo-status-bar'
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoPlayer from 'expo-video-player'
import Text from './Text';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from './../constants/Dimensions';
import { useNavigation } from '@react-navigation/native';
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

    const posMillis = useRef(0);
    const durationMillis = useRef(0);
    const video = useRef(null);
    const [ inFullscreen, setInFullscreen ] = useState(false);
    const [ videoStatus, setVideoStatus ] = useState(null);
    const [ isLoaded, setIsLoaded ] = useState(false);

    const onEnterFullScreen = async () => 
    {
        setInFullscreen(true);
        setStatusBarHidden(true);
    }

    const onExitFullScreen = async () => 
    {
        setStatusBarHidden(false);

        video?.current?.unloadAsync();

        video?.current?.pauseAsync();

        setInFullscreen(false);

        if (hasLastPlayedPositionMillis) 
        {
            setTimeout(() => {
                dispatch(AUTH_ACTION.updateRecentlyWatchedAtPositionMillisStart({ 
                    movieId, 
                    positionMillis: posMillis.current, 
                    user_profile_id: AUTH_PROFILE.id,
                    duration_in_millis: durationMillis.current
                }));
            }, 10);
        }

        navigation.goBack();
    };

    const handlePlaybackCallback = status => 
    {   
        if (status.isPlaying) {
            posMillis.current = parseInt(status.positionMillis);
        }

        if (! isLoaded) 
        {
            durationMillis.current = parseInt(status.durationMillis);
            setVideoStatus(() => ({
                ...status,
                positionMillis: lastPlayedPositionMillis
            }));

            setIsLoaded(true);
        }
    }

    useEffect(() => {
        onEnterFullScreen();

        BackHandler.addEventListener('hardwareBackPress', async () => 
        {
            setStatusBarHidden(false);

            video?.current?.unloadAsync();
    
            video?.current?.pauseAsync();
    
            setInFullscreen(false);
    
            await ScreenOrientation.unlockAsync();

            if (hasLastPlayedPositionMillis) {
                setTimeout(() => {
                    dispatch(AUTH_ACTION.updateRecentlyWatchedAtPositionMillisStart({ 
                        movieId, 
                        positionMillis: posMillis.current, 
                        user_profile_id: AUTH_PROFILE.id,
                        duration_in_millis: durationMillis.current
                    }));
                }, 10);
            }

            navigation.goBack();
            
            return true;
        });

        return () => 
        {
            posMillis.current = 0;
            durationMillis.current = 0;
            video.current = null;
            setInFullscreen(false);
            setIsLoaded(false);
            setVideoStatus(null);
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
            playbackCallback={ handlePlaybackCallback }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(VideoPlayerFullScreen)
