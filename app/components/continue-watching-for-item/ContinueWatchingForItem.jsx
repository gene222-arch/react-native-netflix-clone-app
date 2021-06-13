import React, { useState, useRef } from 'react'
import { Video } from 'expo-av'
import { TouchableOpacity } from 'react-native'
import styles from './../../assets/stylesheets/continueWatchingForItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import View from './../View';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MoreActionList from './MoreActionList';

const ContinueWatchingForItem = ({ episode, handleToggleLikeRecommendation, handlePressRemoveRecommendation }) => 
{
    const video = useRef(null)
    const [ usePoster, setUsePoster ] = useState(true);
    const [ showMoreOptions, setShowMoreOptions ] = useState(false);

    const handlePressInfo = () => 1;

    const handlePressShowMoreOptions = () => setShowMoreOptions(true);

    return (
        <View style={ styles.container }>
            <MoreActionList 
                selectedVideo={ episode } 
                isVisible={ showMoreOptions } 
                setIsVisible={ setShowMoreOptions } 
                handleToggleLikeRecommendation={ handleToggleLikeRecommendation }
                handlePressRemoveRecommendation={ handlePressRemoveRecommendation }
            />
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
            <MaterialCommunityIcon 
                name='play-circle-outline'
                size={ 50 }
                color='#fff'
                style={ styles.playIcon }
            />
            <View style={ styles.infoMoreContainer }>
                <TouchableOpacity onPress={ handlePressInfo }>
                    <FeatherIcon 
                        name='info'
                        size={ 24 }
                        color='#fff'
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={ handlePressShowMoreOptions }>
                    <FeatherIcon 
                        name='more-vertical'
                        size={ 24 }
                        color='#fff'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ContinueWatchingForItem
