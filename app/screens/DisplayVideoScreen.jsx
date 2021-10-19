import React, { useState, useCallback, useEffect } from 'react'
import { InteractionManager } from 'react-native'
import VideoPlayerFullScreen from '../components/VideoPlayerFullScreen';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import LoadingSpinner from '../components/LoadingSpinner';
import * as ScreenOrientation from 'expo-screen-orientation';

const DisplayVideoScreen = () => 
{
    const route = useRoute();
    
    const [ uri, setUri ] = useState(null);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ lastPlayedPositionMillis, setLastPlayedPositionMillis ] = useState(0);
    const [ hasLastPlayedPositionMillis, setHasLastPlayedPositionMillis ] = useState(false);

    const onUnloadUnlockLandscape = async () => await ScreenOrientation.unlockAsync();

    const onLoadLockToLandscape = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }

    useEffect(() => 
    {
        InteractionManager.runAfterInteractions(async () => 
        {
            onLoadLockToLandscape();

            try {
                const { videoUri } = route.params;

                setUri(videoUri);

                if ('lastPlayedPositionMillis' in route.params) {
                    setHasLastPlayedPositionMillis(true);
                    setLastPlayedPositionMillis(parseInt(route.params.lastPlayedPositionMillis));
                }

                setIsInteractionsComplete(true);
            } catch ({ message }) {}

        });

        return () => {
            onUnloadUnlockLandscape();
            setUri(null);
            setIsInteractionsComplete(false);
            setLastPlayedPositionMillis(0);
            setHasLastPlayedPositionMillis(false);
        }
    }, [route.params])
 
    if (! isInteractionsComplete) return <LoadingSpinner message='Loading' />

    return (
        <VideoPlayerFullScreen
            uri={ uri }
            movieId={ route.params.id }
            hasLastPlayedPositionMillis={ hasLastPlayedPositionMillis }
            lastPlayedPositionMillis={ lastPlayedPositionMillis }
        />
    )
}

export default DisplayVideoScreen
