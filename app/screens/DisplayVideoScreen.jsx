import React, { useState, useEffect, useCallback } from 'react'
import { InteractionManager } from 'react-native'
import VideoPlayerFullScreen from '../components/VideoPlayerFullScreen';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import LoadingSpinner from '../components/LoadingSpinner';
import * as FileSystem from 'expo-file-system';
import { ensureFileExists } from './../utils/cacheImage';
import { getExtension } from './../utils/file';

const DisplayVideoScreen = () => 
{
    const route = useRoute();
    
    const [ uri, setUri ] = useState(null);
    const [ shouldPlay, setShouldPlay ] = useState(false);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    useFocusEffect(
        useCallback(() => {
            InteractionManager.runAfterInteractions(async () => 
            {
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
            }
        }, [route.params])
    )

    if (! isInteractionsComplete) {
        return <LoadingSpinner message='Loading' />
    }

    return (
        <VideoPlayerFullScreen 
            uri={ uri }
            shouldPlay={ shouldPlay }
            setShouldPlay={ setShouldPlay }
        />
    )
}

export default DisplayVideoScreen
