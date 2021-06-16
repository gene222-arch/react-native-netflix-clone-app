import React, { useState, useRef, useEffect } from 'react'
import { Video } from 'expo-av'
import { TouchableOpacity } from 'react-native'
import styles from './../../assets/stylesheets/continueWatchingForItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import View from './../View';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MoreActionList from './MoreActionList';
import Info from './Info';
import * as FileSystem from 'expo-file-system'
import { getExtension } from './../../utils/file';

const ContinueWatchingForItem = ({ episode, handleToggleLikeRecommendation, handleToggleUnLikeRecommendation, handlePressRemoveRecommendation }) => 
{
    const video = useRef(null)
    const [ usePoster, setUsePoster ] = useState(true);
    const [ showInfo, setShowInfo ] = useState(false);
    const [ showMoreOptions, setShowMoreOptions ] = useState(false);

    const handlePressShowInfo = () => setShowInfo(!showInfo);

    const handlePressShowMoreOptions = () => setShowMoreOptions(!showMoreOptions);

    const cleanUp = () => {
        setUsePoster(true);
        setShowInfo(false);
        setShowMoreOptions(false);
        video.current = null;
    }

    useEffect(() => {
        return () => {
            cleanUp();
        }
    }, []);

    return (
        <View style={ styles.container }>
            <MoreActionList 
                selectedVideo={ episode } 
                isVisible={ showMoreOptions } 
                setIsVisible={ setShowMoreOptions } 
                handleToggleLikeRecommendation={ handleToggleLikeRecommendation }
                handleToggleUnLikeRecommendation={ handleToggleUnLikeRecommendation }
                handlePressRemoveRecommendation={ handlePressRemoveRecommendation }
            />
            <Info selectedShow={ episode } isVisible={ showInfo } setIsVisible={ setShowInfo } />
            <Video 
                ref={ video }
                style={ styles.video }
                source={{
                    uri: `${ FileSystem.cacheDirectory }Recommendations/${ episode.id }.${ getExtension(episode.video) }`
                }}
                usePoster={ usePoster }
                posterSource={{ uri: `${ FileSystem.cacheDirectory }Recommendations/${ episode.id }.${ getExtension(episode.poster) }` }}
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
                <TouchableOpacity onPress={ handlePressShowInfo }>
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
