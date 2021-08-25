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
                    const { id, title, videoUri } = route.params;
                    const fileExt = getExtension(videoUri);
                    
                    const fileToCacheUri = FileSystem.cacheDirectory + `${ id }${ title }` + `.${ fileExt }`;
                    const fileInfo = await ensureFileExists(fileToCacheUri);
            
                    await FileSystem.downloadAsync(videoUri, fileToCacheUri)
                
                    setUri(!fileInfo.exists ? videoUri: fileToCacheUri);
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
        <React.Fragment key={ uri }>
            <VideoPlayerFullScreen 
                uri={ uri } 
                handleCloseVideo={ () => navigation.goBack() } 
            />
        </React.Fragment>
    )
}

export default DisplayVideoScreen
