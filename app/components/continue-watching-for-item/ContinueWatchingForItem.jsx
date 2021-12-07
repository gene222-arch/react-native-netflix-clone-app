import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './../../assets/stylesheets/continueWatchingForItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import View from './../View';
import MoreActionList from './MoreActionList';
import Info from './Info';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../redux/modules/auth/selectors';
import { connect } from 'react-redux';
import { Image } from 'react-native-expo-image-cache';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from './../../constants/Colors';

const ContinueWatchingForItem = ({ movie, handleToggleLike, handleToggleDisLike, handlePressRemoveRate,  handlePressRemove }) => 
{
    const navigation = useNavigation();

    const [ showInfo, setShowInfo ] = useState(false);
    const [ showMoreOptions, setShowMoreOptions ] = useState(false);
    const moviePositionMillisIndicator = (movie.last_played_position_millis / movie.duration_in_millis) * 92.5;

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

            <TouchableOpacity onPress={ handlePressPlayButton }>
                <Image 
                    preview={{ uri: movie.poster_path }}
                    uri={ movie.poster_path }
                    style={ styles.poster }
                />
            </TouchableOpacity>

            <View 
                style={{ 
                    width: '92.5%',
                    backgroundColor: Colors.grey 
                }}
            >
                <Divider
                    orientation="horizontal"
                    color='red'
                    width={ 3 }
                    style={{ 
                        width: `${ moviePositionMillisIndicator }%`
                    }}
                />
            </View>
            
            <View style={ styles.playIconContainer }>
                <FontAwesome5Icon 
                    name='play'
                    size={ 30 }
                    color={ Colors.netFlixRed }
                    onPress={ handlePressPlayButton }
                />
            </View>
            
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
