import React, { useState, useEffect } from 'react'
import { InteractionManager } from 'react-native'
import VideoPlayerFullScreen from '../components/VideoPlayerFullScreen';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import LoadingSpinner from '../components/LoadingSpinner';
import * as FileSystem from 'expo-file-system';
import { ensureFileExists } from './../utils/cacheImage';
import { getExtension } from './../utils/file';

const DisplayVideoScreen = () => 
{
    const navigation = useNavigation();
    const route = useRoute();
    
    const [ uri, setUri ] = useState(null);
    const [ shouldPlay, setShouldPlay ] = useState(false);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    useEffect(() => {
        InteractionManager.runAfterInteractions(async () => 
        {
            try {   
                const { id, title, videoUri } = route.params;
                const fileExt = getExtension(videoUri);
                
                const fileToCacheUri = FileSystem.cacheDirectory + `${ id }${ title }` + `.${ fileExt }`;
                const { exists } = await ensureFileExists(fileToCacheUri);
        
                if (! exists) {
                    await FileSystem.downloadAsync(videoUri, fileToCacheUri)
                }
            
                setUri(fileToCacheUri);
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
