import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './../../assets/stylesheets/continueWatchingForItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import View from './../View';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MoreActionList from './MoreActionList';
import Info from './Info';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import { Image } from 'react-native-expo-image-cache';
import { useNavigation } from '@react-navigation/native';


const ContinueWatchingForItem = ({ movie, handleToggleLike, handleToggleDisLike, handlePressRemoveRate,  handlePressRemove }) => 
{
    const navigation = useNavigation();

    const [ showInfo, setShowInfo ] = useState(false);
    const [ showMoreOptions, setShowMoreOptions ] = useState(false);

    const handlePressShowMoreOptions = () => setShowMoreOptions(! showMoreOptions);

    const handlePressShowInfo = () => setShowInfo(! showInfo);

    const handlePressPlayButton = () => {
        navigation.navigate('DisplayVideoRoot', {
            screen: 'DisplayVideoScreen',
            params: {
                title: movie.title,
                videoUri: movie.video_path, 
                id: movie.id,
                lastPlayedPositionMillis: movie.last_played_position_millis
            }
        });
    }

    useEffect(() => {
        return () => {
            setShowInfo(false);
            setShowMoreOptions(false);
        }
    }, []);

    return (
        <View style={ styles.container }>
            <MoreActionList 
                selectedVideo={ movie } 
                isVisible={ showMoreOptions } 
                setIsVisible={ setShowMoreOptions } 
                handleToggleLike={ handleToggleLike }
                handleToggleDisLike={ handleToggleDisLike }
                handlePressRemoveRate={ handlePressRemoveRate }
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
                onPress={ handlePressPlayButton }
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
