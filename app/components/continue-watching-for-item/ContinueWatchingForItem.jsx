import React, { useState, useRef } from 'react'
import { Video } from 'expo-av'
import styles from './../../assets/stylesheets/continueWatchingForItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import View from './../View';

const ContinueWatchingForItem = ({ episode }) => 
{
    const video = useRef(null)
    const [ usePoster, setUsePoster ] = useState(true);

    return (
        <View style={ styles.container }>
            <Video 
                ref={ video }
                style={ styles.video }
                source={{
                    uri: episode.video
                }}
                usePoster={ usePoster }
                posterSource={{ uri: episode.poster }}
                posterStyle={ styles.poster }
                useNativeControls
            />
            <FeatherIcon 
                name='play-circle'
                size={ 60 }
                color='#fff'
                style={ styles.playIcon }
            />
            <View style={ styles.infoMoreContainer }>
                <FeatherIcon 
                    name='info'
                    size={ 24 }
                    color='#fff'
                />
                <FeatherIcon 
                    name='more-vertical'
                    size={ 24 }
                    color='#fff'
                />
            </View>
        </View>
    )
}

export default ContinueWatchingForItem
