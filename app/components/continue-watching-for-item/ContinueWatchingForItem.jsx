import React, { useState, useRef, useEffect } from 'react'
import { Video } from 'expo-av'
import { TouchableOpacity } from 'react-native'
import styles from './../../assets/stylesheets/continueWatchingForItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import View from './../View';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MoreActionList from './MoreActionList';
import Info from './Info';
import { getCachedFile } from './../../utils/cacheImage';
import VideoPlayerFullScreen from './../VideoPlayerFullScreen';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../redux/modules/auth/selectors';
import { connect } from 'react-redux';


const ContinueWatchingForItem = ({ 
    AUTH_PROFILE,
    episode,
    handleToggleLikeRecentlyWatchedShow,
    handleToggleUnLikeRecentlyWatchedShow, 
    handlePressRemoveRecentlyWatchedShow 
}) => 
{
    const videoRef = useRef(null)

    const [ shouldPlayVideo, setShouldPlayVideo ] = useState(false);
    const [ usePoster, setUsePoster ] = useState(true);
    const [ showInfo, setShowInfo ] = useState(false);
    const [ showMoreOptions, setShowMoreOptions ] = useState(false);

    const handlePressPlayVideo = () => setShouldPlayVideo(!shouldPlayVideo);

    const handlePressShowInfo = () => setShowInfo(!showInfo);

    const handlePressShowMoreOptions = () => setShowMoreOptions(!showMoreOptions);

    const cleanUp = () => {
        setUsePoster(true);
        setShowInfo(false);
        setShowMoreOptions(false);
        setShouldPlayVideo(false);
        videoRef.current = null;
    }

    useEffect(() => {
        return () => {
            cleanUp();
        }
    }, []);

    if (shouldPlayVideo) {
        return (
            <VideoPlayerFullScreen  
                uri={ getCachedFile( `RecentlyWatchedShows/Profile/${ AUTH_PROFILE.id }/`, episode.id, episode.video) }
                handleCloseVideo={ handlePressPlayVideo }
            />
        )
    }

    return (
        <View style={ styles.container }>
            <MoreActionList 
                selectedVideo={ episode } 
                isVisible={ showMoreOptions } 
                setIsVisible={ setShowMoreOptions } 
                handleToggleLikeRecentlyWatchedShow={ handleToggleLikeRecentlyWatchedShow }
                handleToggleUnLikeRecentlyWatchedShow={ handleToggleUnLikeRecentlyWatchedShow }
                handlePressRemoveRecentlyWatchedShow={ handlePressRemoveRecentlyWatchedShow }
            />
            <Info selectedShow={ episode } isVisible={ showInfo } setIsVisible={ setShowInfo } />
            <Video 
                ref={ videoRef }
                style={ styles.video }
                source={{
                    uri: getCachedFile( `RecentlyWatchedShows/Profile/${ AUTH_PROFILE.id }/`, episode.id, episode.video)
                }}
                usePoster={ usePoster }
                posterSource={{ uri: getCachedFile( `RecentlyWatchedShows/Profile/${ AUTH_PROFILE.id }/`, episode.id, episode.poster) }}
                posterStyle={ styles.poster }
                useNativeControls
            />
            <MaterialCommunityIcon 
                name='play-circle-outline'
                size={ 50 }
                color='#fff'
                style={ styles.playIcon }
                onPress={ handlePressPlayVideo }
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

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(ContinueWatchingForItem)
