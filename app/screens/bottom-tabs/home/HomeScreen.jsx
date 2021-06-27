import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { ImageBackground, InteractionManager } from 'react-native'
import { useNavigation } from '@react-navigation/native';

/** Selectors */
import { authSelector } from './../../../redux/modules/auth/selectors';

/** Actions */
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'

/** API */
import categories_ from './../../../services/data/categories';
import frontPageShows from './../../../services/data/frontPageShows';

/** Components */
import ContinueWatchingForItem from './../../../components/continue-watching-for-item/ContinueWatchingForItem';
import View from './../../../components/View';
import Text from './../../../components/Text';
import HomeCategory from '../../../components/home-category/HomeCategory';
import LoadingScreen from './../../../components/LoadingScreen';

/** Styles */
import styles from './../../../assets/stylesheets/homeScreen';

/** Utils */
import { cacheImage, getCachedFile } from './../../../utils/cacheImage';
import NavBar from './home-components/NavBar';
import FrontPageOptions from './home-components/FrontPageOptions';


const DEFAULT_FRONT_PAGE = {
    id: '',
    category: '',
    title: '',
    backgroundImage: null,
    poster: null,
    tags: [],
    isAddedToMyList: false
}

const HomeScreen = ({ AUTH }) => 
{
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);
    const [ frontPage, setFrontPage ] = useState(DEFAULT_FRONT_PAGE);
    const [ categories, setCategories ] = useState([]);

    const handleToggleAddToMyList = () => dispatch(AUTH_ACTION.toggleAddToMyListStart(frontPage));

    const handlePressCategory = (categoryName) => navigation.navigate('CategoriesScreen', { categoryName, headerTitle: categoryName });

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
        categories_.items.map(({ movies }) => {
            movies.map(({ id, poster }) => cacheImage(poster, id, 'Categories/'))
        });

        /** Cache Front Page */
        frontPageShows.map(({ id, poster, backgroundImage }) => {
            cacheImage(poster, id, 'FrontPages/');
            cacheImage(backgroundImage, id, 'FrontPages/');
        });

        /** Cache Recommendations */
        AUTH.recentlyWatchedShows.map(({ id, poster, video }) => {
            cacheImage(poster, id, 'Recommendations/');
            cacheImage(video, id, 'Recommendations/');
        });
    }

    const runAfterInteractions = () => 
    {
        cacheImages();
        setCategories(categories_);
        setFrontPage(frontPageShows[0]);
        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setCategories([]);
        setFrontPage(DEFAULT_FRONT_PAGE);
        setIsInteractionsComplete(false);
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
                data={ categories.items }
                renderItem={({ item }) => (
                    <HomeCategory 
                        title={ item.title }
                        categories={ item.movies }
                    />
                )}
                ListHeaderComponent=
                {
                    <>
                        {/* Front page */}
                        <ImageBackground
                            source={{  uri: getCachedFile('FrontPages/', frontPage.id, frontPage.backgroundImage) }}
                            style={ styles.homeFrontPage }
                        >
                            <NavBar handlePressCategory={ handlePressCategory } />
                            <FrontPageOptions 
                                frontPage={ frontPage } 
                                handleToggleAddToMyList={ handleToggleAddToMyList }
                                authUserMyList={ AUTH.myList }
                                frontPageCacheDirectory={ 'FrontPages/' }
                            />
                        </ImageBackground>   

                        {/* Continue Watching For */}
                        {
                            AUTH.recentlyWatchedShows.length > 0 && (
                                <View style={ styles.continueWatchingForContainer }>
                                    <Text h4 style={ styles.continueWatchingForTitle }>Continue Watching For { AUTH.profile.name }</Text>
                                    <FlatList
                                        keyExtractor={ ({ id }) => id.toString() }
                                        data={ AUTH.recentlyWatchedShows }
                                        renderItem={({ item }) =>  (
                                            <ContinueWatchingForItem 
                                                episode={ item } 
                                                handleToggleLikeRecentlyWatchedShow={ () => handleToggleRateRecentlyWatchedShow(item.id, 'like') }
                                                handleToggleUnLikeRecentlyWatchedShow={ () => handleToggleRateRecentlyWatchedShow(item.id, 'not for me') }
                                                handlePressRemoveRecentlyWatchedShow={ () => handlePressRemoveRecentlyWatchedShow(item.id) }
                                            />
                                        )}
                                        horizontal
                                    />    
                                </View> 
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

export default connect(mapStateToProps)(HomeScreen)
