import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native';
import { ImageBackground, InteractionManager } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import categories_ from './../../../services/data/categories';
import frontPageShows from './../../../services/data/frontPageShows';
import View from './../../../components/View';
import HomeCategory from '../../../components/home-category/HomeCategory';
import styles from './../../../assets/stylesheets/homeScreen';
import { cacheImage, getCachedFile } from './../../../utils/cacheImage';
import NavBar from './home-components/NavBar';
import FrontPageOptions from './home-components/FrontPageOptions';
import ContinueWatchingFor from './home-components/ContinueWatchingFor';
import LoadingSpinner from './../../../components/LoadingSpinner';


const DEFAULT_FRONT_PAGE = {
    id: '',
    category: '',
    title: '',
    backgroundImage: null,
    poster: null,
    tags: [],
    isAddedToMyList: false
}

const HomeScreen = () => 
{
    const navigation = useNavigation();

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ frontPage, setFrontPage ] = useState(DEFAULT_FRONT_PAGE);
    const [ categories, setCategories ] = useState([]);    

    const handlePressCategory = (categoryName) => navigation.navigate('CategoriesScreen', { categoryName, headerTitle: categoryName });

    const runAfterInteractions = () => 
    {
        categories_.items.map(({ movies }) => {
            movies.map(({ id, poster_path }) => cacheImage(poster_path, id, 'Categories/'))
        });

        frontPageShows.map(({ id, poster_path, backgroundImage }) => {
            cacheImage(poster_path, id, 'FrontPages/');
            cacheImage(backgroundImage, id, 'FrontPages/');
        });

        setCategories(categories_);
        setFrontPage(frontPageShows[0]);
        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            setCategories([]);
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
                data={ categories.items }

                renderItem={({ item }) => (
                    <HomeCategory 
                        title={ item.title } 
                        categories={ item.movies } 
                    />
                )}

                ListHeaderComponent={
                    <View>
                         <ImageBackground source={{ uri: getCachedFile('FrontPages/', frontPage.id, frontPage.wallpaper_path) }}
                            style={ styles.homeFrontPage }>
                            <NavBar handlePressCategory={ handlePressCategory } />
                            <FrontPageOptions frontPage={ frontPage } />
                        </ImageBackground>   

                        <ContinueWatchingFor />
                    </View>          
                }
            />
        </View>
    )
}

export default HomeScreen
