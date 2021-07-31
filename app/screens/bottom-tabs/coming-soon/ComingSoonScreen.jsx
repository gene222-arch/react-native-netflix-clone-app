import React, { useCallback, useState, useEffect } from 'react'
import { InteractionManager, ToastAndroid } from 'react-native'
import { FlatList, Platform, StatusBar } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { useDispatch, connect } from 'react-redux';

/** Actions */
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'
import * as COMING_SOON_ACTION from './../../../redux/modules/coming-soon/actions'

/** API */
import notifications from './../../../services/data/notifications';

/** Styles */
import styles from './../../../assets/stylesheets/comingSoon';

/** Selectors */
import { authProfileSelector } from './../../../redux/modules/auth/selectors'
import { comingSoonMoviesSelector } from './../../../redux/modules/coming-soon/selectors';

/** Components */
import View from './../../../components/View';
import Text from './../../../components/Text';
import NotificationsVideoItem from '../../../components/notifications-video-item';
import AppBar from './../../AppBar';

/** RNV Icons */
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { cacheImage } from './../../../utils/cacheImage';
import { useNavigation } from '@react-navigation/native';

import Echo from './../../../utils/echo'
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

    const handlePressToggleRemindMe = (show, message) => {
        dispatch(AUTH_ACTION.toggleRemindMeOfComingShowStart(show));
        message.length && setTimeout(() => ToastAndroid.show(message, ToastAndroid.SHORT), 100);
    }

    const handlePressInfo = (comingSoonShow) => navigation.navigate('TrailerInfo', { comingSoonShow });

    const runAfterInteractions = () => 
    {
        ComingSoonMovieCreatedEvent.listen(response => {
            ToastAndroid.show(`${ response.data.title } is Coming Soon.`, ToastAndroid.SHORT);
            dispatch(COMING_SOON_ACTION.createComingSoonMovie({ comingSoonMovie: response.data }));
        });

        ComingSoonMovieReleasedEvent.listen(response => {
            ToastAndroid.show(`${ response.data.title } is Released.`, ToastAndroid.SHORT);
            dispatch(COMING_SOON_ACTION.deleteComingSoonMovieById({ id: response.data.id }));
        });

        dispatch(COMING_SOON_ACTION.getComingSoonMoviesStart(notifications));

        COMING_SOON_MOVIE.comingSoonMovies.map(({ id, video, video_poster, poster, title_logo }) => {
            cacheImage(video, id, 'ComingSoon/Videos/');
            cacheImage(poster, id, 'ComingSoon/Posters/');
            cacheImage(video_poster, id, 'ComingSoon/VideoPosters/');
            cacheImage(title_logo, id, 'ComingSoon/TitleLogos/');
        });

        setIsInteractionsComplete(true);
    }

    useEffect(() => 
    {
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
            {/* Coming Soon Videos */}
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                onScroll={ handleOnScroll }
                data={ COMING_SOON_MOVIE.comingSoonMovies }
                renderItem={ ({ item, index }) => {

                    const isReminded = AUTH_PROFILE.reminded_coming_soon_shows.findIndex(({ id }) => id === item.id) !== -1;

                    return (
                        <NotificationsVideoItem 
                            comingSoon={ item } 
                            shouldPlay={ false } 
                            shouldShowPoster={ focusedIndex !== index }
                            shouldFocus={ focusedIndex === index }
                            handlePressToggleRemindMe={ () => handlePressToggleRemindMe(item, !isReminded ? 'Reminded' : '') }
                            handlePressInfo={ () => handlePressInfo(item) }
                            isReminded={ isReminded }
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