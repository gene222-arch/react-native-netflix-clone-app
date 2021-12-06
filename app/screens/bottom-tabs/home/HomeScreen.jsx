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
import * as AUTH_ACTION from './../../../redux/modules/auth/actions';
import HomeFrontPageLoader from './../../../components/loading-skeletons/HomeFrontPageLoader';
import AppBar from './../../AppBar';
import * as MovieCreatedEvent from './../../../events/movie.created.event'
import { authProfileSelector, authSelector } from './../../../redux/modules/auth/selectors';
import * as ComingSoonMovieReleasedEvent from './../../../events/coming.soon.movie.released.event'
import * as COMING_SOON_MOVIE_ACTION from './../../../redux/modules/coming-soon/actions'
import * as MOVIE_API from './../../../services/movie/movie'
import { useIsFocused } from '@react-navigation/core';


const DEFAULT_FRONT_PAGE_PROPS = {
    id: '',
    title: '',
    plot: '',
    genres: '',
    poster_path: null,
    wallpaper_path: null,
    title_logo_path: null
};

const HomeScreen = ({ AUTH, AUTH_PROFILE, MOVIE }) => 
{
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    const isForKids = Boolean(AUTH_PROFILE.is_for_kids);
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ frontPage, setFrontPage ] = useState(DEFAULT_FRONT_PAGE_PROPS);


    const onLoadSetFrontPage = async () => 
    {
        let movies_ = [ ...MOVIE.movies ];

        if (! movies_.length) 
        {
            try {
                const { data } = await MOVIE_API.findRandomlyAsync(isForKids);
                setFrontPage(data);
            } catch ({ message }) {}
        }

        if (movies_.length) 
        {
            if (isForKids) {
                movies_ = movies_.filter(({ age_restriction }) => isForKids ? age_restriction <= 12 : age_restriction > 0);
            }

            setFrontPage(movies_[Math.floor(Math.random() * (movies_.length - 1))]);
        }
    }    

    const handleCreateMovie = (movieParam) => 
    {
        dispatch(MOVIE_ACTION.createMovie({ movie: movieParam }));
    }

    const handleReleasedMovie = (comingSoonMovieId) => 
    {
        const payload = {
            id: comingSoonMovieId
        };

        batch(() => 
        {
            dispatch(COMING_SOON_MOVIE_ACTION.deleteComingSoonMovieById(payload));
            dispatch(AUTH_ACTION.updateRemindMeIsReleasedProperty(payload));
        });
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
        InteractionManager.runAfterInteractions(async () => 
        {
            MovieCreatedEvent.listen(response => 
            {
                if (isForKids && response.data.age_restriction <= 12) {
                    handleCreateMovie(response.data);
                }

                if (! isForKids) {
                    handleCreateMovie(response.data);
                }
            });

            ComingSoonMovieReleasedEvent.listen(response => 
            {
                if (isForKids && response.data.age_restriction <= 12) {
                    handleReleasedMovie(response.data.id);
                }

                if (! isForKids) {
                    handleReleasedMovie(response.data.id);
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

    if (! isInteractionsComplete) return <HomeFrontPageLoader />

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
    AUTH: authSelector,
    AUTH_PROFILE: authProfileSelector,
    MOVIE: movieSelector
});

export default connect(mapStateToProps)(HomeScreen)
