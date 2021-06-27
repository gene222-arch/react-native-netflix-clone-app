import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { ImageBackground, InteractionManager } from 'react-native'

/** Selectors */
import { authSelector } from './../../../../redux/modules/auth/selectors';

/** Actions */
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions'

/** API */
import categories_ from './../../../../services/data/categories';

/** Components */
import View from './../../../../components/View';
import HomeCategory from './../../../../components/home-category/HomeCategory';

/** Styles */
import styles from './../../../../assets/stylesheets/categories';
import frontPageShows from './../../../../services/data/frontPageShows';
import { cacheImage, getCachedFile } from './../../../../utils/cacheImage';
import LoadingScreen from '../../../../components/LoadingScreen';
import FrontPageOptions from './../home-components/FrontPageOptions';
import NavBar from './categories-components/NavBar';
import ContinueWatchingFor from './../home-components/ContinueWatchingFor';


const DEFAULT_FRONT_PAGE = {
    id: '',
    category: '',
    title: '',
    backgroundImage: null,
    poster: null,
    tags: [],
    isAddedToMyList: false
}

const CategoriesScreen = ({ AUTH, route }) => 
{
    const dispatch = useDispatch();
    const { categoryName } = route.params;

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ frontPage, setFrontPage ] = useState(DEFAULT_FRONT_PAGE);
    const [ selectedMainCategory, setSelectedMainCategory ] = useState(categoryName);
    const [ categoryItems, setCategoryItems ] = useState([]);

    const handleToggleAddToMyList = () => dispatch(AUTH_ACTION.toggleAddToMyListStart(frontPage));

    const handlePressChangeMainCategory = (selectedCategory) => 
    {
        setSelectedMainCategory(selectedCategory);
        setFrontPage(frontPageShows.find(({ category }) => category === selectedCategory));

        const newCategories = categories_.items.map(category => {
            const filterMovies = category.movies.filter(({ show_type }) => show_type === selectedCategory);

            return { 
                ...category, 
                movies: filterMovies 
            };
        });

        setCategoryItems(newCategories);
    }

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

    const handlePressRemoveRecentlyWatchedShow = (recentlyWatchedShowID) => {
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
                renderItem={({ item }) => <HomeCategory title={ item.title } categories={ item.movies }/> }
                ListHeaderComponent=
                {
                    <>
                        <ImageBackground 
                            source={{ 
                                uri: getCachedFile('HomeCategoriesFrontPages/BackgroundImage/', frontPage.id, frontPage.backgroundImage)
                            }} 
                            style={ styles.homeFrontPage }
                        >
                            <NavBar 
                                selectedMainCategory={ selectedMainCategory }
                                handlePressChangeMainCategory={ handlePressChangeMainCategory }
                            />

                            <FrontPageOptions 
                                frontPage={ frontPage } 
                                handleToggleAddToMyList={ handleToggleAddToMyList }
                                authUserMyList={ AUTH.myList }
                                frontPageCacheDirectory={ 'HomeCategoriesFrontPages/Poster/' }
                            />
                        </ImageBackground>   

                        {/* Continue Watching For */}
                        <ContinueWatchingFor 
                            handleToggleRateRecentlyWatchedShow={ handleToggleRateRecentlyWatchedShow }
                            handlePressRemoveRecentlyWatchedShow={ handlePressRemoveRecentlyWatchedShow }
                        />
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
