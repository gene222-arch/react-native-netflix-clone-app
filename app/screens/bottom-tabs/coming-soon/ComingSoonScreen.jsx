import React, { useCallback, useState, useEffect } from 'react'
import { InteractionManager } from 'react-native'
import { FlatList, Platform, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/core'
import { createStructuredSelector } from 'reselect';
import { useDispatch, connect, batch } from 'react-redux';
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'
import * as COMING_SOON_MOVIE_ACTION from './../../../redux/modules/coming-soon/actions'
import styles from './../../../assets/stylesheets/comingSoon';
import { authProfileSelector } from './../../../redux/modules/auth/selectors'
import { comingSoonMoviesSelector } from './../../../redux/modules/coming-soon/selectors';
import View from './../../../components/View';
import ComingSoonMovieItem from '../../../components/notifications-video-item';
import AppBar from './../../AppBar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as ComingSoonMovieCreatedEvent from './../../../events/coming.soon.movie.created.event'
import * as TOAST_ACTION from './../../../redux/modules/toast/actions'
import ComingSoonScreenLoader from '../../../components/loading-skeletons/ComingSoonScreenLoader';
import NotificationHeader from '../../../components/coming-soon-screen/NotificationHeader';

const ComingSoonScreen = ({ AUTH_PROFILE, COMING_SOON_MOVIE }) => 
{
    const isForKids = Boolean(AUTH_PROFILE.is_for_kids);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ focusedIndex, setFocusedIndex ] = useState(0);

    const handleOnScroll = useCallback((e) => {
        const offset = Math.round(e.nativeEvent.contentOffset.y / 410);
        setFocusedIndex(offset);
    }, [focusedIndex]);

    const handlePressToggleRemindMe = (movieID, isReminded = false) => {
        batch(() => {
            dispatch(AUTH_ACTION.toggleRemindMeOfComingShowStart({ user_profile_id: AUTH_PROFILE.id, movieID }));
            setTimeout(() => {
                !isReminded && dispatch(TOAST_ACTION.createToastMessageStart({ message: 'Reminded' }));
            }, 10);
        });
    }

    const handlePressInfo = (id) => navigation.navigate('TrailerInfo', { id });

    const runAfterInteractions = () => 
    {
        ComingSoonMovieCreatedEvent.listen(response => 
        {
            if (isForKids && response.data.age_restriction <= 12) {
                batch(() => {
                    dispatch(TOAST_ACTION.createToastMessageStart({ message: `Coming Soon ${ response.data.title }` }));
                    dispatch(COMING_SOON_MOVIE_ACTION.createComingSoonMovie({ comingSoonMovie: response.data }));
                    dispatch(COMING_SOON_MOVIE_ACTION.incrementComingSoonMovieCount());
                });
            }

            if (! isForKids) {
                batch(() => {
                    dispatch(TOAST_ACTION.createToastMessageStart({ message: `Coming Soon ${ response.data.title }` }));
                    dispatch(COMING_SOON_MOVIE_ACTION.createComingSoonMovie({ comingSoonMovie: response.data }));
                    dispatch(COMING_SOON_MOVIE_ACTION.incrementComingSoonMovieCount());
                });
            }
        });

        dispatch(COMING_SOON_MOVIE_ACTION.getComingSoonMoviesStart({ is_for_kids: isForKids }));
        
        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            ComingSoonMovieCreatedEvent.unListen();
            setIsInteractionsComplete(false);
        }
    }, [AUTH_PROFILE.id]); 


    const handleRenderItem = ({ item, index }) => 
    {
        let isReminded = AUTH_PROFILE
            .reminded_coming_soon_movies
            .find(({ coming_soon_movie_id }) => coming_soon_movie_id === item.id);

        return  (
            <ComingSoonMovieItem 
                movie={ item }
                shouldShowPoster={ focusedIndex !== index }
                shouldFocus={ focusedIndex === index }
                shouldPlay={ focusedIndex === index && isFocused }
                handlePressToggleRemindMe={ () => handlePressToggleRemindMe(item.id, isReminded) }
                handlePressInfo={ () => handlePressInfo(item.id) }
                isReminded={ Boolean(isReminded) }
            />
        )
    }

    useFocusEffect(
        useCallback(() => {
            if (COMING_SOON_MOVIE.totalUpcomingMovies) {
                dispatch(COMING_SOON_MOVIE_ACTION.viewComingSoonMovies());
            }

            return () => {
                setFocusedIndex(0);
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
                            renderItem={ handleRenderItem }
                            ListHeaderComponent={ 
                                isInteractionsComplete && <NotificationHeader />
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