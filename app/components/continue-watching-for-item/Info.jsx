import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ToastAndroid } from 'react-native'
import { BottomSheet, ListItem, Divider, Button } from 'react-native-elements';
import styles from './../../assets/stylesheets/info';
import Text from './../Text';
import View from './../View';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createStructuredSelector } from 'reselect';
import { authProfileSelector } from './../../redux/modules/auth/selectors';
import * as AUTH_ACTION from './../../redux/modules/auth/actions';
import { connect, useDispatch } from 'react-redux';
import { Image } from 'react-native-expo-image-cache';
import MostLikedBadge from './../MostLikedBadge';
import MaturityRatingBadge from '../MaturityRatingBadge';
import WarningGenreBadge from '../WarningGenreBadge';


const MovieInfo = ({ AUTH_PROFILE, selectedShow, isVisible, setIsVisible, isScreenMyList = false }) => 
{   
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ isMovieAddedToMyList, setIsMovieAddedToMyList ] = useState(isScreenMyList);

    const handlePressPlay = () => 
    {
        const recentWatch = AUTH_PROFILE.recently_watched_movies.find(({ id }) => id === selectedShow?.id);
        const lastPlayedPositionMillis = !recentWatch ? 0 : recentWatch.last_played_position_millis;
        const durationInMillis = !recentWatch ? (selectedShow.duration_in_minutes * 60000) : recentWatch.duration_in_millis;

        setTimeout(() => 
        {
            dispatch(AUTH_ACTION.addToRecentWatchesStart({ 
                movie: selectedShow, 
                user_profile_id: AUTH_PROFILE.id, 
                duration_in_millis: durationInMillis,
                last_played_position_millis: lastPlayedPositionMillis
            }));
        }, 0);

        navigation.navigate('DisplayVideoRoot', {
            screen: 'DisplayVideoScreen',
            params: {
                title: selectedShow?.title,
                videoUri: selectedShow?.video_path, 
                id: selectedShow?.id,
                lastPlayedPositionMillis
            }
        });
    }
    
    const handlePressPreview = () => {
        navigation.navigate('DisplayVideoRoot', {
            screen: 'DisplayVideoScreen',
            params: {
                title: selectedShow?.title,
                videoUri: selectedShow?.video_preview_path, 
                id: selectedShow?.id 
            }
        });
    }

    const handlePressNavigateToShowDetailScreen = () => {
        navigation.navigate('MovieDetailScreen', { 
            id: selectedShow?.id,
            headerTitle: selectedShow?.title
        });
    }

    const handleToggleAddToMyList = () => 
    {
        if (isScreenMyList) {
            setIsVisible(false);
        }

        setIsMovieAddedToMyList(! isMovieAddedToMyList);

        const message = isMovieAddedToMyList ? 'Removed from My List' : 'Added to My List';
        ToastAndroid.show(message, ToastAndroid.SHORT);

        setTimeout(() => {
            dispatch(AUTH_ACTION.toggleAddToMyListStart({ movie: selectedShow, user_profile_id: AUTH_PROFILE.id }));
        }, 0);
    }

    const onLoadSetIsMovieAddedToMyList = () => {
        if (! isScreenMyList) {
            const isAddedToList = AUTH_PROFILE.my_lists.find(({ movie_id }) => movie_id === selectedShow?.id);
            setIsMovieAddedToMyList(isAddedToList);
        }
    }

    useEffect(() => 
    {
        onLoadSetIsMovieAddedToMyList();

        return () => {
            setIsMovieAddedToMyList(isScreenMyList);
        }
    }, [AUTH_PROFILE.my_lists])

    return (
        <BottomSheet
            isVisible={ isVisible }
            containerStyle={ styles.container }
            modalProps={{ onRequestClose: () => { setIsVisible(false)}}}
        >
            <StatusBar backgroundColor='rgba(0, 0, 0, .8)' />
            <View style={ styles.posterContainer }>
                <ListItem containerStyle={ styles.showDetails }>
                    <Image 
                        preview={{ uri: selectedShow?.poster_path }}
                        uri={ selectedShow?.poster_path }
                        style={ styles.poster }
                    />
                    <ListItem.Content>
                        <View style={ styles.posterDetails }>
                            <View style={ styles.titleCloseBtnContainer }>
                                <Text h4 style={ styles.title }>{  selectedShow?.title }</Text>
                                <TouchableOpacity onPress={ () => setIsVisible(false) }>
                                    <FeatherIcon 
                                        name='x-circle'
                                        size={ 24 }
                                        color='#fff'
                                        style={ styles.closeBtn }
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={ styles.basicDetail }>
                                <Text style={ styles.yearAgeSeason }>{ selectedShow?.year_of_release }</Text>
                                <MaturityRatingBadge ageRestriction={ selectedShow?.age_restriction } />
                                <WarningGenreBadge genres={ selectedShow?.genres.split(',').map(genre => genre.trim().toLowerCase()) } />
                            </View>
                            <Text style={ styles.plot }>{ selectedShow?.plot.slice(0, 250).concat('...') }</Text>
                            <MostLikedBadge movieId={ selectedShow?.id } />
                        </View>
                    </ListItem.Content>
                </ListItem>

                {/* Action Buttons */}
                <View style={ styles.actionBtns }>
                    <Button
                        title='   Play'
                        icon={
                            <FontAwesome5Icon 
                                name='play'
                                size={ 22 }
                                color='#000'
                                solid
                            />
                        }
                        titleStyle={ styles.playBtnTitle }
                        buttonStyle={ styles.playBtn }
                        onPress={ handlePressPlay }
                    />
                    <Button
                        type='clear' 
                        title='Preview'
                        icon={
                            <FeatherIcon 
                                name='play'
                                size={ 26 }
                                color='#fff'
                            />
                        }
                        iconPosition='top'
                        buttonStyle={ styles.previewBtn }
                        titleStyle={ styles.actionBtnTitle }
                        onPress={ handlePressPreview }
                    />
                    <Button
                        type='clear' 
                        title='My List'
                        icon={
                            <FeatherIcon 
                                name={ isMovieAddedToMyList ? 'check' : 'plus' }
                                size={ 26 }
                                color='#fff'
                            />
                        }
                        iconPosition='top'
                        buttonStyle={ styles.previewBtn }
                        titleStyle={ styles.actionBtnTitle }
                        onPress={ handleToggleAddToMyList }
                    />
                </View>          
            </View>
            <Divider />
            {/* Episode and MovieInfo */}
            <TouchableOpacity onPress={ handlePressNavigateToShowDetailScreen }>
                <ListItem containerStyle={ styles.episodeAndMovieInfoContainer }>
                    <FeatherIcon 
                        name='info'
                        size={ 24 }
                        color='#fff'
                    />
                    <ListItem.Content style={ styles.listItemContent }>
                        <ListItem.Title style={ styles.episodeAndMovieInfoTitle }>Similar Movies & Info</ListItem.Title>
                    </ListItem.Content>
                    <FeatherIcon 
                        name='chevron-right'
                        size={ 24 }
                        color='#fff'
                    />
            </ListItem> 
            </TouchableOpacity>  
        </BottomSheet>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector
});

export default connect(mapStateToProps)(MovieInfo)
