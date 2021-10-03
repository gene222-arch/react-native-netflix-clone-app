import React, { useState, useCallback } from 'react'
import { InteractionManager } from 'react-native'
import VideoPlayerFullScreen from '../components/VideoPlayerFullScreen';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import LoadingSpinner from '../components/LoadingSpinner';
import * as ScreenOrientation from 'expo-screen-orientation';

const DisplayVideoScreen = () => 
{
    const route = useRoute();
    
    const [ uri, setUri ] = useState(null);
    const [ shouldPlay, setShouldPlay ] = useState(false);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    const onUnloadUnlockLandscape = async () => await ScreenOrientation.unlockAsync();

    const onLoadLockToLandscape = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }

    useFocusEffect(
        useCallback(() => 
        {
            InteractionManager.runAfterInteractions(async () => 
            {
                onLoadLockToLandscape();
                try {   
                    const { id, title, videoUri } = route.params;
                    setUri(videoUri);
                    setShouldPlay(true);
                } catch ({ message }) {
                    console.log(message);
                }
    
                setIsInteractionsComplete(true);
            });
    
            return () => {
                setUri(null);
                onUnloadUnlockLandscape();
            }
        }, [route.params])
    )

    if (! isInteractionsComplete) return <LoadingSpinner message='Loading' />

    return (
        <VideoPlayerFullScreen 
            uri={ uri }
            shouldPlay={ shouldPlay }
            setShouldPlay={ setShouldPlay }
        />
    )
}

export default DisplayVideoScreen
