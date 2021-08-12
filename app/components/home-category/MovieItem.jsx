import React, { useState, useEffect } from 'react'
import { Pressable } from 'react-native'
import { ensureFileExists, getCachedFile } from './../../utils/cacheImage';
import Image from './../Image';
import styles from './../../assets/stylesheets/homeCategory';
import PosterImageLoader from './../loading-skeletons/PosterImageLoader';

const MovieItem = ({ movie, handlePressImage }) => 
{
    const cachedFile = getCachedFile('Categories/', movie?.id, movie?.poster_path);
    const [ fileExists, setFileExists ] = useState(false);

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
        onLoadCheckFileExists();        

        return () => {
            setFileExists(false);
        }
    }, []);

    if (! fileExists) {
        return <PosterImageLoader />
    }

    return (
        <Pressable onPress={ handlePressImage }>
            <Image 
                style={ styles.image }
                source={{ uri: cachedFile }}
            />
        </Pressable>
    )
}

export default MovieItem
