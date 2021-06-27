import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { TouchableOpacity, ImageBackground, InteractionManager } from 'react-native'

/** Selectors */
import { authSelector } from './../../../../redux/modules/auth/selectors';

/** Actions */
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions'

/** API */
import categories_ from './../../../../services/data/categories';

/** RNE Components */
import {  Button } from 'react-native-elements';

/** Components */
import Image from './../../../../components/Image';
import ContinueWatchingForItem from './../../../../components/continue-watching-for-item/ContinueWatchingForItem';
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import HomeCategory from './../../../../components/home-category/HomeCategory';

/** Icons */
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

/** Styles */
import styles from './../../../../assets/stylesheets/categories';
import recentlyWatchedShows_ from './../../../../services/data/recentlyWatchedShows';
import frontPageShows from './../../../../services/data/frontPageShows';
import { cacheImage, getCachedFile } from './../../../../utils/cacheImage';
import LoadingScreen from '../../../../components/LoadingScreen';
import MainCategoriesMenu from './../MainCategoriesMenu';
import Info from './../../../../components/continue-watching-for-item/Info';
import { CATEGORY_NAMES } from '../../../../config/home.menu.main.category.list';
import FrontPageOptions from './../home-components/FrontPageOptions';
import CategoriesMenu from './../home-components/CategoriesMenu';


const DEFAULT_FRONT_PAGE = {
    id: '',
    category: '',
    title: '',
    backgroundImage: null,
    poster: null,
    tags: [],
    isAddedToMyList: false
}

const DisplayContinueWatchingFor = ({ recentlyWatchedShows, handleToggleLikeRecentlyWatchedShow, handleToggleUnLikeRecentlyWatchedShow, handlePressRemoveRecentlyWatchedShow }) => {
    return (
        <View style={ styles.continueWatchingForContainer }>
            <Text h4>Continue Watching For KNSM</Text>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString()}
                data={ recentlyWatchedShows }
                renderItem={({ item }) =>  (
                    <ContinueWatchingForItem 
                        episode={ item } 
                        handleToggleLikeRecentlyWatchedShow={ handleToggleLikeRecentlyWatchedShow }
                        handleToggleUnLikeRecentlyWatchedShow={ handleToggleUnLikeRecentlyWatchedShow }
                        handlePressRemoveRecentlyWatchedShow={ handlePressRemoveRecentlyWatchedShow }
                    />
                )}
                horizontal
            />    
        </View>
    )
}

const CategoriesScreen = ({ AUTH, route }) => 
{
    const dispatch = useDispatch();
    const { categoryName } = route.params;

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ frontPage, setFrontPage ] = useState(DEFAULT_FRONT_PAGE);
    const [ selectedMainCategory, setSelectedMainCategory ] = useState(categoryName);
    const [ categoryItems, setCategoryItems ] = useState([]);
    const [ showCategories, setShowCategories ] = useState(false);
    const [ showMainCategories, setShowMainCategories ] = useState(false);

    const handleToggleAddToMyList = () => dispatch(AUTH_ACTION.toggleAddToMyListStart(frontPage));

    const handlePressChangeMainCategory = (selectedCategory) => 
    {
        setSelectedMainCategory(selectedCategory);
        setFrontPage(frontPageShows.find(({ category }) => category === selectedCategory));

        const newCategories = categories_.items.map(category => {
            const filterMovies = category.movies.filter(({ show_type }) => show_type === selectedCategory);
            return { ...category, movies: filterMovies };
        });

        setCategoryItems(newCategories);
    }

    const handleToggleMainCategories = () => setShowMainCategories(!showMainCategories);

    const handleToggleCategories = () => setShowCategories(!showCategories);

    const handleToggleRateRecentlyWatchedShow = (recentlyWatchedShowID, rate) => 
    {
        const newRecentlyWatchedShows = AUTH.recentlyWatchedShows.map((rec) => {

            if (rec.id === recentlyWatchedShowID) 
            {
                if (!rec.isRated) {
                    return { ...rec, isRated: true, rate };
                }

                if (rec.isRated && rec.rate !== rate) {
                    return { ...rec, isRated: true, rate };
                }
                else {
                    return { ...rec, isRated: false, rate: '' };
                }
            }

            return rec;
        });
    }

    const handlePressRemoveRecentlyWatchedShows = (recentlyWatchedShowID) => {
        dispatch(AUTH_ACTION.removeToRecentWatchesStart(recentlyWatchedShowID));
    }

    const cacheImages = () => 
    {
        /** Cache Categories */
        categories_.items.map(({ movies }) => movies.map(({ id, poster }) => cacheImage(poster, id, 'Categories/')));

        /** Cache Front Page */
        frontPageShows.map(({ id, poster, backgroundImage }) => {
            cacheImage(poster, id, 'HomeCategoriesFrontPages/Poster/');
            cacheImage(backgroundImage, id, 'HomeCategoriesFrontPages/BackgroundImage/');
        });

        /** Cache RecentlyWatchedShowss */
        AUTH.recentlyWatchedShows.map(({ id, poster, video }) => {
            cacheImage(poster, id, 'RecentlyWatchedShowss/');
            cacheImage(video, id, 'RecentlyWatchedShowss/');
        });
    }

    const runAfterInteractions = () => 
    {
        cacheImages();
        handlePressChangeMainCategory(categoryName);
        setIsInteractionsComplete(true);
    }
    
    const cleanUp = () => {
        setCategoryItems([]);
        setFrontPage(DEFAULT_FRONT_PAGE);
        setIsInteractionsComplete(false);
        setShowCategories(false);
        setShowMainCategories(false);
        setSelectedMainCategory('');
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            cleanUp();
        }
    }, []);

    if (!isInteractionsComplete) {
        return <LoadingScreen />
    }
    
    return (
        <View style={ styles.container }>
            <FlatList 
                data={ categoryItems }
                renderItem={({ item }) => (
                    <HomeCategory 
                        title={ item.title }
                        categories={ item.movies }
                    />
                )}
                ListHeaderComponent=
                {
                    <>
                        <ImageBackground 
                            source={{ uri: getCachedFile('HomeCategoriesFrontPages/BackgroundImage/', frontPage.id, frontPage.backgroundImage)}} 
                            style={ styles.homeFrontPage }
                        >
                            <View style={ styles.topMenuContainer }>

                                {/* NavBar */}
                                <View style={ styles.tabContainer }>

                                    <MainCategoriesMenu 
                                        isVisible={ showMainCategories } 
                                        setIsVisible={ setShowMainCategories } 
                                        selectedMainCategory={ selectedMainCategory }
                                        setMainCategory={ handlePressChangeMainCategory }
                                    />

                                    <CategoriesMenu 
                                        isVisible={ showCategories } 
                                        setIsVisible={ setShowCategories }
                                        selectedMainCategory={ categoryName }
                                        handlePressChangeMainCategory={ handlePressChangeMainCategory }
                                    />
                                    
                                    {/* Main Categories */}
                                    <TouchableOpacity onPress={ handleToggleMainCategories }>
                                        <View style={ styles.categoriesContainer }>
                                            <Text style={styles.tabItemMainCategories}>{ selectedMainCategory }</Text>
                                            <FontAwesome5 
                                                name='sort-down'
                                                size={ 12 }
                                                color='#fff'
                                                style={ styles.categoriesIcon }
                                            />
                                        </View>
                                    </TouchableOpacity>

                                    {/* All Categories */}
                                    <TouchableOpacity onPress={ handleToggleCategories }>
                                        <View style={ styles.categoriesContainer }>
                                            <Text style={ styles.tabItemAllCategories }>All Categories</Text>
                                            <FontAwesome5 
                                                name='sort-down'
                                                size={ 12 }
                                                color='#fff'
                                                style={ styles.categoriesIcon }
                                            />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <FrontPageOptions 
                                frontPage={ frontPage } 
                                handleToggleAddToMyList={ handleToggleAddToMyList }
                                authUserMyList={ AUTH.myList }
                                frontPageCacheDirectory={ 'HomeCategoriesFrontPages/Poster/' }
                            />
                        </ImageBackground>   

                        {/* Continue Watching For */}
                        {
                            AUTH.recentlyWatchedShows.length > 0 && (
                                <DisplayContinueWatchingFor 
                                    recentlyWatchedShows={ AUTH.recentlyWatchedShows }
                                    handleToggleLikeRecentlyWatchedShow={ () => handleToggleRateRecentlyWatchedShow(item.id, 'like') }
                                    handleToggleUnLikeRecentlyWatchedShow={ () => handleToggleRateRecentlyWatchedShow(item.id, 'not for me') }
                                    handlePressRemoveRecentlyWatchedShow={ () => handlePressRemoveRecentlyWatchedShows(item.id) }
                                /> 
                            )
                        }
                    </>             
                }
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: authSelector
});

export default connect(mapStateToProps)(CategoriesScreen)
