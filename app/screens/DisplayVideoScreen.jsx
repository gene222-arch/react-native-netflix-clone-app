import React, { useState, useCallback, useEffect } from 'react'
import { InteractionManager } from 'react-native'
import VideoPlayerFullScreen from '../components/VideoPlayerFullScreen';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import LoadingSpinner from '../components/LoadingSpinner';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as FileSystem from 'expo-file-system'
import { ensureFileExists } from './../utils/cacheImage';
import { useIsFocused } from '@react-navigation/core';

const DisplayVideoScreen = () => 
{
    const route = useRoute();
    const isFocused = useIsFocused();
    
    const [ uri, setUri ] = useState(null);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ lastPlayedPositionMillis, setLastPlayedPositionMillis ] = useState(0);
    const [ hasLastPlayedPositionMillis, setHasLastPlayedPositionMillis ] = useState(false);

    const onUnloadUnlockLandscape = async () => {
        try {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        } catch (error) {
            console.log(error);
        }
    }

    const onLoadLockToLandscape = async () => {
        try {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => 
    {
        if (! isInteractionsComplete) {
            onLoadLockToLandscape();
        }

        InteractionManager.runAfterInteractions(async () => 
        {
            try {
                const { videoUri, id, title } = route.params;
                
                const cacheFilePath = `${ FileSystem.documentDirectory }${ title }${ id }.mp4`;
        
                const { exists }  = await ensureFileExists(cacheFilePath);

                !exists ? setUri(videoUri) : setUri(cacheFilePath);

                if ('lastPlayedPositionMillis' in route.params) {
                    setHasLastPlayedPositionMillis(true);
                    setLastPlayedPositionMillis(parseInt(route.params.lastPlayedPositionMillis));
                }

                setIsInteractionsComplete(true);

                if (! exists) {
                    await FileSystem.downloadAsync(videoUri, cacheFilePath);
                }
            } catch ({ message }) {}

        });

        return () => {
            setUri(null);
            setLastPlayedPositionMillis(0);
            setHasLastPlayedPositionMillis(false);
        }
    }, [route.params])

    useFocusEffect(useCallback(() => {
        return () => {
            onUnloadUnlockLandscape();
            setIsInteractionsComplete(false);
        }
    }, []))

    if (! isInteractionsComplete && isFocused) return <LoadingSpinner message='Loading' />

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
