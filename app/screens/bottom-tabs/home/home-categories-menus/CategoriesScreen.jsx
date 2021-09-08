import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { ImageBackground, InteractionManager, FlatList } from 'react-native'

import { authSelector, authProfileSelector } from './../../../../redux/modules/auth/selectors';
import categories_ from './../../../../services/data/categories';
import View from './../../../../components/View';
import HomeCategory from './../../../../components/home-category/HomeCategory';
import styles from './../../../../assets/stylesheets/categories';
import LoadingScreen from '../../../../components/LoadingScreen';
import FrontPageOptions from './../home-components/FrontPageOptions';
import NavBar from './categories-components/NavBar';
import ContinueWatchingFor from './../home-components/ContinueWatchingFor';
import { movieSelector } from './../../../../redux/modules/movie/selectors';
import CategoriesScreenLoader from './../../../../components/loading-skeletons/CategoriesScreenLoader';


const DEFAULT_FRONT_PAGE = {
    id: '',
    title: '',
    plot: '',
    genres: '',
    poster_path: null,
    wallpaper_path: null,
    title_logo_path: null
}

const CategoriesScreen = ({ AUTH, AUTH_PROFILE, MOVIE, route }) => 
{
    const { categoryName } = route.params;

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ frontPage, setFrontPage ] = useState(DEFAULT_FRONT_PAGE);
    const [ selectedMainCategory, setSelectedMainCategory ] = useState(categoryName);
    const [ categoryItems, setCategoryItems ] = useState([]);

    const handlePressChangeMainCategory = (selectedCategory) => 
    {
        setSelectedMainCategory(selectedCategory);
        setFrontPage(MOVIE.movies[Math.floor(Math.random() * (MOVIE.movies.length - 1))]);

        const newCategories = MOVIE.categories.map(category => 
        {
            const filterMovies = category
                .movies
                .filter(({ genres }) => genres.split(',').includes(selectedCategory));

            return { 
                ...category, 
                movies: filterMovies 
            };
        });

        setCategoryItems(newCategories);
    }

    const runAfterInteractions = () => 
    {
        handlePressChangeMainCategory(categoryName);
        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            setCategoryItems([]);
            setFrontPage(DEFAULT_FRONT_PAGE);
            setIsInteractionsComplete(false);
            setSelectedMainCategory('');
        }
    }, []);

    if (! isInteractionsComplete) return <CategoriesScreenLoader />
    
    return (
        <View style={ styles.container }>
            <FlatList 
                keyExtractor={ (item, index) => index.toString() }
                data={ categoryItems }
                renderItem={({ item }) => <HomeCategory title={ item.title } categorizedMovies={ item.movies }/> }
                ListHeaderComponent=
                {
                    <>
                        <ImageBackground 
                            source={{ uri: frontPage.poster_path }} 
                            style={ styles.homeFrontPage }
                        >
                            <NavBar 
                                selectedMainCategory={ selectedMainCategory }
                                handlePressChangeMainCategory={ handlePressChangeMainCategory }
                            />
                            <FrontPageOptions frontPage={ frontPage }/>
                        </ImageBackground>   
                        <ContinueWatchingFor />
                    </>             
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

export default connect(mapStateToProps)(CategoriesScreen)
