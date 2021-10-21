import React, { useState, useEffect } from 'react'
import View from './../../../components/View';
import { StyleSheet, FlatList, InteractionManager } from 'react-native'
import NotificationItem from '../../../components/coming-soon-screen/NotificationItem';
import * as MOVIE_NOTIFICATION_API from './../../../services/movie/movie.notification'
import { createStructuredSelector } from 'reselect';
import { movieSelector } from './../../../redux/modules/movie/selectors';
import { connect } from 'react-redux';
import NotificationsScreenLoader from './../../../components/loading-skeletons/NotificationsScreenLoader';
import { authProfileSelector } from './../../../redux/modules/auth/selectors';

const NotificationsScreen = ({ AUTH_PROFILE, MOVIE }) => 
{
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ notifications, setNotifications ] = useState([]);

    const onLoadFetchMovieNotifications = async () => 
    {
        try {
            const result = await MOVIE_NOTIFICATION_API.fetchAllAsync();

            if (result) {
                setNotifications(result.data);
            }
        } catch ({ message }) {
            console.log(message);
        }
    }

    useEffect(() => 
    {
        InteractionManager.runAfterInteractions(() => {
            onLoadFetchMovieNotifications();
            setIsInteractionsComplete(true);
        });    
    }, [MOVIE.movies]);

    if (! isInteractionsComplete) return <NotificationsScreenLoader />

    return (
        <View style={ styles.container }>
            <FlatList 
                keyExtractor={ (item, index) => index.toString() }
                data={ notifications }
                renderItem={ ({ item }) => 
                {
                    let isReminded = false;

                    if (item.released_details) {
                        isReminded = AUTH_PROFILE
                            .reminded_coming_soon_movies
                            .find(({ coming_soon_movie_id }) => {
                                return (coming_soon_movie_id === item.released_details.coming_soon_movie_id);
                            });
                    }

                    return <NotificationItem item={ item } isReminded={ isReminded } />
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