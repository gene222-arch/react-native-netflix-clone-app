import React, { useCallback, useState, useEffect } from 'react'
import { InteractionManager } from 'react-native'
import { FlatList, Platform, StatusBar } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { useDispatch, connect, batch } from 'react-redux';
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'
import * as COMING_SOON_MOVIE_ACTION from './../../../redux/modules/coming-soon/actions'
import styles from './../../../assets/stylesheets/comingSoon';
import { authProfileSelector } from './../../../redux/modules/auth/selectors'
import { comingSoonMoviesSelector } from './../../../redux/modules/coming-soon/selectors';
import View from './../../../components/View';
import Text from './../../../components/Text';
import ComingSoonMovieItem from '../../../components/notifications-video-item';
import AppBar from './../../AppBar';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { cacheImage } from './../../../utils/cacheImage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import * as ComingSoonMovieCreatedEvent from './../../../events/coming.soon.movie.created.event'
import * as ComingSoonMovieReleasedEvent from './../../../events/coming.soon.movie.released.event'
import * as TOAST_ACTION from './../../../redux/modules/toast/actions'
import ComingSoonScreenLoader from '../../../components/loading-skeletons/ComingSoonScreenLoader';


const NotificationHeader = () => {
    return (
        <View style={ styles.notificationsContainer }>
            <View style={ styles.iconContainer }>
                <FontAwesome5 
                    name='bell'
                    size={ 24 }
                    color='#fff'
                />
                <Text style={ styles.notificationsText }>       Notifications</Text>
            </View>
            <FeatherIcon 
                name='chevron-right'
                size={ 24 }
                color='#fff'
            />
        </View>
    )
}

const ComingSoonScreen = ({ AUTH_PROFILE, COMING_SOON_MOVIE }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ focusedIndex, setFocusedIndex ] = useState(0);

    const handleOnScroll = useCallback((e) => {
        const offset = Math.round(e.nativeEvent.contentOffset.y / 500);
        setFocusedIndex(offset);
    }, [setFocusedIndex]);

    const handlePressToggleRemindMe = (movieID) => {
        dispatch(AUTH_ACTION.toggleRemindMeOfComingShowStart({ user_profile_id: AUTH_PROFILE.id, movieID }));
    }

    const handlePressInfo = (id) => navigation.navigate('TrailerInfo', { id });

    const cacheFiles = useCallback(() => {
        COMING_SOON_MOVIE.comingSoonMovies.map(({ id, video_trailer_path }) => {
            cacheImage(video_trailer_path, id, 'ComingSoon/Videos/');
        });
    }, [COMING_SOON_MOVIE.comingSoonMovies]);

    const runAfterInteractions = () => 
    {
        ComingSoonMovieCreatedEvent.listen(response => {
            batch(() => {
                dispatch(TOAST_ACTION.createToastMessageStart({ message: `Coming Soon ${ response.data.title }` }));
                dispatch(COMING_SOON_MOVIE_ACTION.createComingSoonMovie({ comingSoonMovie: response.data }));
                dispatch(COMING_SOON_MOVIE_ACTION.incrementComingSoonMovieCount());
            });
        });

        ComingSoonMovieReleasedEvent.listen(response => {
            batch(() => {
                dispatch(TOAST_ACTION.createToastMessageStart({ message: `Released ${ response.data.title }` }));
                dispatch(COMING_SOON_MOVIE_ACTION.deleteComingSoonMovieById({ id: response.data.id }));
            });
        });

        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);
        dispatch(COMING_SOON_MOVIE_ACTION.getComingSoonMoviesStart({ is_for_kids: AUTH_PROFILE.is_for_kids }));

        return () => {
            ComingSoonMovieCreatedEvent.unListen();
            ComingSoonMovieReleasedEvent.unListen();
            setIsInteractionsComplete(false);
            setFocusedIndex(0);
        }
    }, [AUTH_PROFILE.id]); 

    useFocusEffect(
        useCallback(() => {
            if (COMING_SOON_MOVIE.totalUpcomingMovies) {
                dispatch(COMING_SOON_MOVIE_ACTION.viewComingSoonMovies());
            }
        }, [COMING_SOON_MOVIE.totalUpcomingMovies])
    );

    return (
        <View style={ styles.container }>
            <AppBar 
                marginTop={ Platform.OS === 'android' ? StatusBar.currentHeight : 0 } 
                showLogo={ false } 
                headerTitle='Coming Soon'
            />
            {
                (! isInteractionsComplete || COMING_SOON_MOVIE.isLoading)
                    ? <ComingSoonScreenLoader />
                    : (
                        <FlatList 
                            keyExtractor={ ({ id }) => id.toString() }
                            onScroll={ handleOnScroll }
                            data={ COMING_SOON_MOVIE.comingSoonMovies }
                            renderItem={ ({ item, index }) => {
                                let isReminded = AUTH_PROFILE.reminded_coming_soon_shows.find(movieID => movieID === item.id);

                                return  (
                                    <ComingSoonMovieItem 
                                        movie={ item }
                                        shouldShowPoster={ focusedIndex !== index }
                                        shouldFocus={ focusedIndex === index }
                                        handlePressToggleRemindMe={ () => handlePressToggleRemindMe(item.id, isReminded) }
                                        handlePressInfo={ () => handlePressInfo(item.id) }
                                        isReminded={ Boolean(isReminded) }
                                    />
                                )
                            }}
                            ListHeaderComponent={
                                <NotificationHeader />
                            }
                        />
                    )
            }
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector,
    COMING_SOON_MOVIE: comingSoonMoviesSelector
});

export default connect(mapStateToProps)(ComingSoonScreen)