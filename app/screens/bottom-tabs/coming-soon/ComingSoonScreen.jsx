import React, { useCallback, useState, useEffect } from 'react'
import { InteractionManager, ToastAndroid } from 'react-native'
import { FlatList, Platform, StatusBar } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { useDispatch, connect, batch } from 'react-redux';
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'
import * as COMING_SOON_ACTION from './../../../redux/modules/coming-soon/actions'
import notifications from './../../../services/data/notifications';
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
import LoadingSpinner from './../../../components/LoadingSpinner';


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

    const handlePressToggleRemindMe = (show, message = '') => {
        dispatch(AUTH_ACTION.toggleRemindMeOfComingShowStart({ user_profile_id: AUTH_PROFILE.id, show }));
        message.length && setTimeout(() => ToastAndroid.show(message, ToastAndroid.SHORT), 100);
    }

    const handlePressInfo = (comingSoonMovie) => navigation.navigate('TrailerInfo', { comingSoonMovie });

    const runAfterInteractions = () => 
    {
        dispatch(COMING_SOON_ACTION.getComingSoonMoviesStart(notifications));

        COMING_SOON_MOVIE.comingSoonMovies.map(({ id, video_trailer_path, wallpaper_path, poster_path, title_logo_path }) => {
            cacheImage(video_trailer_path, id, 'ComingSoon/Videos/');
            cacheImage(poster_path, id, 'ComingSoon/Posters/');
            cacheImage(wallpaper_path, id, 'ComingSoon/Wallpaper/');
            cacheImage(title_logo_path, id, 'ComingSoon/TitleLogos/');
        });

        setIsInteractionsComplete(true);
    }

    // useFocusEffect(
    //     useCallback(() => {
    //         if (COMING_SOON_MOVIE.totalUpcomingMovies) {
    //             dispatch(AUTH_ACTION.viewDownloadsStart());
    //         }

    //         return () => dispatch(AUTH_ACTION.viewDownloadsStart());
    //     }, [COMING_SOON_MOVIE.totalUpcomingMovies])
    // );

    useEffect(() => 
    {
        ComingSoonMovieCreatedEvent.listen(response => {
            ToastAndroid.show(`${ response.data.title } is Coming Soon.`, ToastAndroid.SHORT);
            batch(() => {
                dispatch(COMING_SOON_ACTION.createComingSoonMovie({ comingSoonMovie: response.data }));
                dispatch(COMING_SOON_ACTION.incrementComingSoonMovieCount());
            });
        });

        ComingSoonMovieReleasedEvent.listen(response => {
            ToastAndroid.show(`${ response.data.title } is Released.`, ToastAndroid.SHORT);
            dispatch(COMING_SOON_ACTION.deleteComingSoonMovieById({ id: response.data.id }));
        });

        InteractionManager.runAfterInteractions(runAfterInteractions);
        
        return () => {
            ComingSoonMovieCreatedEvent.unListen();
            ComingSoonMovieReleasedEvent.unListen();
            setIsInteractionsComplete(false);
            setFocusedIndex(0);
        }
    }, []);

    if (!isInteractionsComplete) {
        return <LoadingSpinner />
    }

    return (
        <View style={ styles.container }>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                onScroll={ handleOnScroll }
                data={ COMING_SOON_MOVIE.comingSoonMovies }
                renderItem={ ({ item, index }) => {
                    let isReminded = AUTH_PROFILE.reminded_coming_soon_shows.find(({ id }) => id === item.id);

                    return (
                        <ComingSoonMovieItem 
                            movie={ item }
                            shouldShowPoster={ focusedIndex !== index }
                            shouldFocus={ focusedIndex === index }
                            handlePressToggleRemindMe={ () => handlePressToggleRemindMe(item, !isReminded ? 'Reminded' : '') }
                            handlePressInfo={ () => handlePressInfo(item) }
                            isReminded={ Boolean(AUTH_PROFILE.reminded_coming_soon_shows.find(({ id }) => id === item.id)) }
                        />
                    )
                }}
                ListHeaderComponent={
                    <>
                        {/* Search icon container */}
                        <AppBar 
                            marginTop={ Platform.OS === 'android' ? StatusBar.currentHeight : 0 } 
                            showLogo={ false } 
                            headerTitle='Coming Soon'
                        />
                        {/* Notifications Container */}
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
                    </>
                }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector,
    COMING_SOON_MOVIE: comingSoonMoviesSelector
});

export default connect(mapStateToProps)(ComingSoonScreen)