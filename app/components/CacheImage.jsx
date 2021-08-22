import React, { useEffect, useState, useRef } from 'react'
import { Image, InteractionManager } from 'react-native'
import * as FileSystem from 'expo-file-system'
import PosterImageLoader from './loading-skeletons/PosterImageLoader';

const CacheImage = ({ uri, ...props }) => 
{
    const [imgURI, setImgURI] = useState(uri);
    const componentIsMounted = useRef(true);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    const loadImage = async ({ fileURI }) => 
    {
        try {
            // Use the cached image if it exists
            const metadata = await FileSystem.getInfoAsync(fileURI);

            if (!metadata.exists) {
                // download to cache
                if (componentIsMounted.current) {
                    setImgURI(null);
                    await FileSystem.downloadAsync(uri, fileURI);
                }
                if (componentIsMounted.current) {
                    setImgURI(fileURI);
                }
            }
        } catch (err) {
            console.log(err); // eslint-disable-line no-console
            setImgURI(uri);
        }
      }

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            loadImage({ fileURI: uri });
            setIsInteractionsComplete(true);
        });
    
        return () => {
            componentIsMounted.current = false;
            setImgURI(null);
            setIsInteractionsComplete(false);
        }
    }, []);

    if (! isInteractionsComplete) return <PosterImageLoader />
  
    return <Image {...props} source={{ uri: imgURI }} />
  }

export default CacheImage


