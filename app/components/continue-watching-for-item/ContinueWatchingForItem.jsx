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


const ContinueWatchingForItem = ({ AUTH_PROFILE, movie, handleToggleLike, handleToggleDisLike,  handlePressRemove }) => 
{
    const videoRef = useRef(null);
    const [ showInfo, setShowInfo ] = useState(false);
    const [ shouldPlayVideo, setShouldPlayVideo ] = useState(false);
    const [ showMoreOptions, setShowMoreOptions ] = useState(false);

    const handlePressShowMoreOptions = () => setShowMoreOptions(! showMoreOptions);

    const handlePressShowInfo = () => setShowInfo(! showInfo);

    const handlePressPlayVideo = () => setShouldPlayVideo(! shouldPlayVideo);

    useEffect(() => {
        return () => {
            videoRef.current = null;
            setShowInfo(false);
            setShowMoreOptions(false);
            setShouldPlayVideo(false);
        }
    }, []);

    if (shouldPlayVideo) {
        return (
            <VideoPlayerFullScreen  
                uri={ getCachedFile( `RecentlyWatchedShows/Profile/${ AUTH_PROFILE.id }/Videos/`, movie.id, movie.video_path) }
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

            <Video 
                ref={ videoRef }
                style={ styles.video }
                source={{
                    uri: getCachedFile( `RecentlyWatchedShows/Profile/${ AUTH_PROFILE.id }/Videos/`, movie.id, movie.video_path)
                }}
                usePoster={ !shouldPlayVideo  }
                posterSource={{ uri: getCachedFile( `RecentlyWatchedShows/Profile/${ AUTH_PROFILE.id }/Posters/`, movie.id, movie.poster_path) }}
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
