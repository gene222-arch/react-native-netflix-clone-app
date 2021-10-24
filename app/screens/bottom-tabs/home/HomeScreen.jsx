import React, { useState, useEffect } from 'react'
import { FlatList, Platform, StatusBar } from 'react-native';
import { ImageBackground, InteractionManager } from 'react-native'
import View from './../../../components/View';
import HomeCategory from '../../../components/home-category/HomeCategory';
import styles from './../../../assets/stylesheets/homeScreen';
import NavBar from './home-components/NavBar';
import FrontPageOptions from './home-components/FrontPageOptions';
import ContinueWatchingFor from './home-components/ContinueWatchingFor';
import { useDispatch, connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { movieSelector } from './../../../redux/modules/movie/selectors';
import * as MOVIE_ACTION from './../../../redux/modules/movie/actions';
import HomeFrontPageLoader from './../../../components/loading-skeletons/HomeFrontPageLoader';
import AppBar from './../../AppBar';
import * as MovieCreatedEvent from './../../../events/movie.created.event'
import { authProfileSelector } from './../../../redux/modules/auth/selectors';
import * as ComingSoonMovieReleasedEvent from './../../../events/coming.soon.movie.released.event'
import * as COMING_SOON_MOVIE_ACTION from './../../../redux/modules/coming-soon/actions'
import * as TOAST_ACTION from './../../../redux/modules/toast/actions'
import * as MOVIE_API from './../../../services/movie/movie'
import { useIsFocused } from '@react-navigation/core';
import * as NOTIFICATION_UTIL from './../../../utils/notification'

const DEFAULT_FRONT_PAGE_PROPS = {
    id: '',
    title: '',
    plot: '',
    genres: '',
    poster_path: null,
    wallpaper_path: null,
    title_logo_path: null
};

const HomeScreen = ({ AUTH_PROFILE, MOVIE }) => 
{
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    const isForKids = Boolean(AUTH_PROFILE.is_for_kids);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ frontPage, setFrontPage ] = useState(DEFAULT_FRONT_PAGE_PROPS);

    const onLoadSetFrontPage = async () => 
    {
        if (! MOVIE?.movies?.length) {
            try {
                const { data } = await MOVIE_API.findRandomlyAsync();
                setFrontPage(data);
            } catch ({ message }) {}
        } else {
            setFrontPage(MOVIE.movies[Math.floor(Math.random() * (MOVIE.movies.length - 1))]);
        }
    }    

    const notify = (movie) => 
    {
        const isReminded = AUTH_PROFILE.reminded_coming_soon_movies.find(({ coming_soon_movie_id }) => coming_soon_movie_id === movie.id);

        const title = !isReminded ? 'Release' : 'Reminder'
        const message = !isReminded ? `${ movie.title } is Released!` : `Reminding that ${ movie.title } is Released! 📣`;

        NOTIFICATION_UTIL.schedulePushNotification(title, message);
    }

    useEffect(() => 
    {
        batch(() => {
            dispatch(MOVIE_ACTION.getCategorizedMoviesStart({ is_for_kids: AUTH_PROFILE.is_for_kids }));
            dispatch(MOVIE_ACTION.getMoviesStart({ is_for_kids: AUTH_PROFILE.is_for_kids }));
            dispatch(MOVIE_ACTION.getMostLikedMoviesStart());
        });

        onLoadSetFrontPage();
    }, [AUTH_PROFILE.id]);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => 
        {
            NOTIFICATION_UTIL.schedulePushNotification('asdasd', 'asdasd');
            
            MovieCreatedEvent.listen(response => 
            {
                if (isForKids && response.data.age_restriction <= 12) {
                    dispatch(MOVIE_ACTION.createMovie({ movie: response.data }));
                }

                if (! isForKids) {
                    dispatch(MOVIE_ACTION.createMovie({ movie: response.data }));
                }
            });

            ComingSoonMovieReleasedEvent.listen(response => 
            {
                if (isForKids && response.data.age_restriction <= 12) {
                    notify(response.data);
                    dispatch(COMING_SOON_MOVIE_ACTION.deleteComingSoonMovieById({ id: response.data.id }));
                }

                if (! isForKids) {
                    notify(response.data);
                    dispatch(COMING_SOON_MOVIE_ACTION.deleteComingSoonMovieById({ id: response.data.id }));
                }
            });
            
            setIsInteractionsComplete(true);
        });

        return () => {
            MovieCreatedEvent.unListen();
            ComingSoonMovieReleasedEvent.unListen();
            setIsInteractionsComplete(false);
        }   
    }, []);

    if (! isInteractionsComplete) {
        return <HomeFrontPageLoader />
    }

    return (
        <View>
            { isFocused && <StatusBar backgroundColor='rgba(0, 0, 0, .5)' /> } 
            <FlatList
                keyExtractor={ (item, index) => index.toString() }
                data={ MOVIE.categories }
                renderItem={({ item }) => (
                    <HomeCategory
                        title={ item.title }
                        categorizedMovies={ item.movies } 
                    />  
                )}
                ListHeaderComponent={
                    <View>
                        <ImageBackground 
                            source={{ 
                                uri: frontPage.poster_path
                            }}
                            style={ styles.homeFrontPage }
                        >
                            <View style={ styles.appBarContainer }>
                                <AppBar marginTop={ Platform.OS === 'android' ? StatusBar.currentHeight : 0 } />
                                <NavBar />
                            </View>
                            <FrontPageOptions frontPage={ frontPage } />
                        </ImageBackground>  
                        <ContinueWatchingFor />
                    </View>       
                }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector,
    MOVIE: movieSelector
});

export default connect(mapStateToProps)(HomeScreen)
