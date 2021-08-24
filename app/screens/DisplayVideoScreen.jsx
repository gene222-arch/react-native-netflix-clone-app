import React, { useState, useCallback } from 'react'
import { InteractionManager } from 'react-native'
import VideoPlayerFullScreen from '../components/VideoPlayerFullScreen';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LoadingSpinner from '../components/LoadingSpinner';
import * as FileSystem from 'expo-file-system';
import { ensureFileExists } from './../utils/cacheImage';
import { getExtension } from './../utils/file';

const DisplayVideoScreen = ({ route }) => 
{
    const navigation = useNavigation();
    
    const [ uri, setUri ] = useState(null);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    useFocusEffect(
        useCallback(() => {
            InteractionManager.runAfterInteractions(async () => 
            {
                try {
                    const { id, videoUri } = route.params;
                    const stringifiedId = id.toString();
                    const fileExt = getExtension(videoUri);
                    
                    const fileToCacheURI = FileSystem.cacheDirectory + stringifiedId + `.${ fileExt }`;
                    const fileInfo = await ensureFileExists(fileToCacheURI);
            
                    if (! fileInfo.exists) {
                        await FileSystem.downloadAsync(videoUri, fileToCacheURI)
                    }
                
                    setUri(fileToCacheURI);
                } catch ({ message }) {
                    console.log(message);
                }

                setIsInteractionsComplete(true);
            });

            return () => {
                setUri(null);
            }
        }, [])
    );

    if (! isInteractionsComplete) return <LoadingSpinner />

    return (
        <VideoPlayerFullScreen 
            uri={ uri } 
            handleCloseVideo={ () => navigation.goBack() } 
        />
    )
}

export default DisplayVideoScreen
