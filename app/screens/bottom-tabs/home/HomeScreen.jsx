import React, { useState, useEffect } from 'react'
import SkeletonContent from 'react-native-skeleton-content'
import { FlatList } from 'react-native';
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

    const handlePressCategory = (categoryName) => navigation.navigate('CategoriesScreen', { categoryName, headerTitle: categoryName });

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
                                    <ImageBackground source={{ uri: getCachedFile('FrontPages/', frontPage.id, frontPage.wallpaper_path) }}
                                        style={ styles.homeFrontPage }>
                                        <NavBar handlePressCategory={ handlePressCategory } />
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
