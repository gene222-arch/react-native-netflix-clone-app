import React, { useState, useEffect } from 'react'
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
import { Image } from 'react-native-expo-image-cache';


const ContinueWatchingForItem = ({ AUTH_PROFILE, movie, handleToggleLike, handleToggleDisLike,  handlePressRemove }) => 
{
    const [ showInfo, setShowInfo ] = useState(false);
    const [ shouldPlayVideo, setShouldPlayVideo ] = useState(false);
    const [ showMoreOptions, setShowMoreOptions ] = useState(false);

    const handlePressShowMoreOptions = () => setShowMoreOptions(! showMoreOptions);

    const handlePressShowInfo = () => setShowInfo(! showInfo);

    const handlePressPlayVideo = () => setShouldPlayVideo(! shouldPlayVideo);

    useEffect(() => {
        return () => {
            setShowInfo(false);
            setShowMoreOptions(false);
            setShouldPlayVideo(false);
        }
    }, []);

    if (shouldPlayVideo) {
        return (
            <VideoPlayerFullScreen  
                uri={ getCachedFile( `RecentlyWatchedShows/Videos/`, movie.id, movie.video_path) }
                handleCloseVideo={ handlePressPlayVideo }
            />
        )
    }

    return (
        <View style={ styles.container }>
            <MoreActionList 
                selectedVideo={ movie } 
                isVisible={ showMoreOptions } 
                setIsVisible={ setShowMoreOptions } 
                handleToggleLike={ handleToggleLike }
                handleToggleDisLike={ handleToggleDisLike }
                handlePressRemove={ handlePressRemove }
            />

            <Info selectedShow={ movie } isVisible={ showInfo } setIsVisible={ setShowInfo } />

            <Image 
                preview={{ uri: movie.poster_path }}
                uri={ movie.poster_path }
                style={ styles.poster }
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
