import React, { useState, useEffect, useCallback } from 'react'
import View from './../../../components/View';
import { StyleSheet, FlatList, InteractionManager, BackHandler } from 'react-native'
import NotificationItem from '../../../components/coming-soon-screen/NotificationItem';
import { createStructuredSelector } from 'reselect';
import * as MOVIE_ACTION from './../../../redux/modules/movie/actions';
import { movieSelector } from './../../../redux/modules/movie/selectors';
import { connect, useDispatch } from 'react-redux';
import NotificationsScreenLoader from './../../../components/loading-skeletons/NotificationsScreenLoader';
import { authProfileSelector } from './../../../redux/modules/auth/selectors';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/core';

const NotificationsScreen = ({ AUTH_PROFILE, MOVIE }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(MOVIE.movieNotifications.length);

    const onLoadDispatchGetMovieNotifications = () => {
        dispatch(MOVIE_ACTION.getMovieNotificationsStart({
            isForKids: AUTH_PROFILE.is_for_kids
        }));
    }

    useEffect(() => 
    {
        if (isInteractionsComplete) {
            onLoadDispatchGetMovieNotifications();
        }
        
        InteractionManager.runAfterInteractions(() => {
            onLoadDispatchGetMovieNotifications();
            setIsInteractionsComplete(true);
        });

        return () => {
            setIsInteractionsComplete(false);
        }
    }, [MOVIE.movies]);

    useFocusEffect(
        useCallback(() => {
            BackHandler.removeEventListener('hardwareBackPress', () => true);
            BackHandler.addEventListener('hardwareBackPress', () => {
                navigation.navigate('ComingSoon');
                return true;
            });
        }, [])
    )

    if (! isInteractionsComplete) return <NotificationsScreenLoader />

    return (
        <View style={ styles.container }>
            <FlatList 
                keyExtractor={ (item, index) => index.toString() }
                data={ MOVIE.movieNotifications }
                renderItem={ ({ item }) => 
                {
                    let isReminded = false;
                    let isRead = true;

                    if (item.released_details) 
                    {
                        isReminded = AUTH_PROFILE
                            .reminded_coming_soon_movies
                            .find(({ coming_soon_movie_id }) => coming_soon_movie_id === item.released_details.coming_soon_movie_id);
                        
                        if (isReminded) {
                            isRead = Boolean(isReminded.read_at) && AUTH_PROFILE.id === isReminded.user_profile_id;
                        }
                    }

                    return <NotificationItem item={ item } isReminded={ isReminded } isRead={ isRead } />
                }}
                maxToRenderPerBatch={ 5 }
                showsHorizontalScrollIndicator={ false }
                showsVerticalScrollIndicator={ false }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector,
    MOVIE: movieSelector
});

export default connect(mapStateToProps)(NotificationsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    }
});