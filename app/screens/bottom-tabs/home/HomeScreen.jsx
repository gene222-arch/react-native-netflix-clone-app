import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, Platform, StatusBar } from 'react-native';
import { ImageBackground, InteractionManager } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import frontPageShows from './../../../services/data/frontPageShows';
import View from './../../../components/View';
import HomeCategory from '../../../components/home-category/HomeCategory';
import styles from './../../../assets/stylesheets/homeScreen';
import { cacheImage, getCachedFile } from './../../../utils/cacheImage';
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
import FadeInOutView from '../../../components/animated/FadeInOutView';

const DEFAULT_FRONT_PAGE = {
    id: '',
    category: '',
    title: '',
    wallpaper_path: null,
    poster: null,
    tags: [],
    isAddedToMyList: false
}

const HomeScreen = ({ MOVIE }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ frontPage, setFrontPage ] = useState(DEFAULT_FRONT_PAGE);
    const [ yOffset, setYOffset ] = useState(0);

    const handlePressCategory = (categoryName) => navigation.navigate('CategoriesScreen', { categoryName, headerTitle: categoryName });

    const handleOnScroll = useCallback((e) => {
        const y = Math.round(e.nativeEvent.contentOffset.y);
        console.log('y:', y);
        setYOffset(y);
    }, [yOffset]);

    const runAfterInteractions = () => 
    {
        batch(() => {
            dispatch(MOVIE_ACTION.getCategorizedMoviesStart());
            dispatch(MOVIE_ACTION.getMoviesStart());
        });

        MOVIE.categories.map(({ movies }) => {
            movies.map(({ id, poster_path }) => cacheImage(poster_path, id, 'Categories/'))
        });

        frontPageShows.map(({ id, poster_path, wallpaper_path }) => {
            cacheImage(poster_path, id, 'FrontPages/');
            cacheImage(wallpaper_path, id, 'FrontPages/');
        });

        setFrontPage(frontPageShows[0]);
        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            setFrontPage(DEFAULT_FRONT_PAGE);
            setIsInteractionsComplete(false);
        }
    }, []);

    if (! isInteractionsComplete) {
        return <LoadingSpinner />
    }

    return (
        <View style={ styles.container }>
            {
                yOffset > 75 && (
                    <FadeInOutView shouldFadeIn={ yOffset > 72 }>
                        <NavBar show={ yOffset > 72 } handlePressCategory={ handlePressCategory } />
                    </FadeInOutView>
                )
            }
            <FlatList
                onScroll={ handleOnScroll }
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
                                            uri: getCachedFile('FrontPages/', frontPage.id, frontPage.wallpaper_path) 
                                        }}
                                        style={ styles.homeFrontPage }
                                    >
                                        <View>
                                            <AppBar marginTop={ Platform.OS === 'android' ? StatusBar.currentHeight : 0 } />
                                            <NavBar yOffset={ yOffset } handlePressCategory={ handlePressCategory } />
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
    MOVIE: movieSelector
});

export default connect(mapStateToProps)(HomeScreen)
