import React, { useState, useEffect } from 'react'
import { FlatList, Platform, StatusBar } from 'react-native';
import { ImageBackground, InteractionManager } from 'react-native'
import frontPageShows from './../../../services/data/frontPageShows';
import View from './../../../components/View';
import HomeCategory from '../../../components/home-category/HomeCategory';
import styles from './../../../assets/stylesheets/homeScreen';
import NavBar from './home-components/NavBar';
import FrontPageOptions from './home-components/FrontPageOptions';
import ContinueWatchingFor from './home-components/ContinueWatchingFor';
import LoadingSpinner from './../../../components/LoadingSpinner';
import { useDispatch, connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { movieSelector } from './../../../redux/modules/movie/selectors';
import * as MOVIE_ACTION from './../../../redux/modules/movie/actions';
import HomeFrontPageLoader from './../../../components/loading-skeletons/HomeFrontPageLoader';
import AppBar from './../../AppBar';
import * as MovieCreatedEvent from './../../../events/movie.created.event'
import { authProfileSelector } from './../../../redux/modules/auth/selectors';

const DEFAULT_FRONT_PAGE = {
    id: '',
    category: '',
    title: '',
    wallpaper_path: null,
    poster: null,
    tags: [],
    isAddedToMyList: false
}

const HomeScreen = ({ AUTH_PROFILE, MOVIE }) => 
{
    const dispatch = useDispatch();

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ frontPage, setFrontPage ] = useState(frontPageShows[0]);

    const runAfterInteractions = () => 
    {
        MovieCreatedEvent.listen(response => {
            dispatch(MOVIE_ACTION.createMovie({ movie: response.data }));
        });

        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            setFrontPage(DEFAULT_FRONT_PAGE);
            setIsInteractionsComplete(false);
            MovieCreatedEvent.unListen();
        }   
    }, []);

    useEffect(() => {
        batch(() => {
            dispatch(MOVIE_ACTION.getCategorizedMoviesStart({ is_for_kids: AUTH_PROFILE.is_for_kids }));
            dispatch(MOVIE_ACTION.getMoviesStart({ is_for_kids: AUTH_PROFILE.is_for_kids }));
        });
    }, [AUTH_PROFILE])

    
    if (! isInteractionsComplete) {
        return <LoadingSpinner />
    }

    return (
        <View style={ styles.container }>
            <FlatList
                keyExtractor={ (item, index) => index.toString() }
                data={ MOVIE.categories }
                renderItem={({ item }) => (
                    <HomeCategory 
                        isLoading={ MOVIE.isLoading }
                        title={ item.title }
                        categorizedMovies={ item.movies } 
                    />  
                )}
                ListHeaderComponent={
                    <View>
                        {
                            MOVIE.isLoading
                                ? <HomeFrontPageLoader />
                                : (
                                    <ImageBackground 
                                        source={{ 
                                            uri: frontPage.wallpaper_path
                                        }}
                                        style={ styles.homeFrontPage }
                                    >
                                        <View>
                                            <AppBar marginTop={ Platform.OS === 'android' ? StatusBar.currentHeight : 0 } />
                                            <NavBar />
                                        </View>
                                        <FrontPageOptions frontPage={ frontPage } />
                                    </ImageBackground>  
                                )
                        }

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
