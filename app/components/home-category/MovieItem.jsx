import React, { useState, useEffect } from 'react'
import { Pressable, InteractionManager } from 'react-native'
import { ensureFileExists, getCachedFile } from './../../utils/cacheImage';
import Image from './../Image';
import styles from './../../assets/stylesheets/homeCategory';
import PosterImageLoader from './../loading-skeletons/PosterImageLoader';

const MovieItem = ({ movie, handlePressImage }) => 
{
    const cachedFile = getCachedFile('Categories/', movie.id, movie.poster_path);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ isImageCached, setFileExists ] = useState(false);

    const onLoadCheckFileExists = async () => 
    {
        try {
            const { exists } = await ensureFileExists(cachedFile);
            setFileExists(exists);
        } catch ({ message }) {
            setFileExists(false);
        }
    }

    useEffect(() => {    
        InteractionManager.runAfterInteractions(() => {
            onLoadCheckFileExists();    
            setIsInteractionsComplete(true);
        })
        return () => {
            setFileExists(false);
        }
    }, [cachedFile]);

    if (! isInteractionsComplete) {
        return <PosterImageLoader />
    }

    return (
        <Pressable onPress={ handlePressImage }>
            <Image 
                style={ styles.image }
                source={{ uri: !isImageCached ? movie.poster_path : cachedFile }}
            />
        </Pressable>
    )
}

export default MovieItem
