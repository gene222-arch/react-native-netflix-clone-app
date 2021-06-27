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
import View from './../../../components/View';
import HomeCategory from '../../../components/home-category/HomeCategory';
import LoadingScreen from './../../../components/LoadingScreen';

/** Styles */
import styles from './../../../assets/stylesheets/homeScreen';

/** Utils */
import { cacheImage, getCachedFile } from './../../../utils/cacheImage';
import NavBar from './home-components/NavBar';
import FrontPageOptions from './home-components/FrontPageOptions';
import ContinueWatchingFor from './home-components/ContinueWatchingFor';


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

    const handleToggleRateRecentlyWatchedShow = (show, rate) => dispatch(AUTH_ACTION.rateShowStart({ show, rate }));

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
                renderItem={({ item }) => <HomeCategory title={ item.title } categories={ item.movies } />}
                ListHeaderComponent={
                    <>
                        <ImageBackground
                            source={{  uri: getCachedFile('FrontPages/', frontPage.id, frontPage.backgroundImage) }}
                            style={ styles.homeFrontPage }
                        >
                            {/* NavBar */}
                            <NavBar handlePressCategory={ handlePressCategory } />

                            {/* Front Page Options */}
                            <FrontPageOptions 
                                frontPage={ frontPage } 
                                handleToggleAddToMyList={ handleToggleAddToMyList }
                                authUserMyList={ AUTH.myList }
                                frontPageCacheDirectory={ 'FrontPages/' }
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

export default connect(mapStateToProps)(HomeScreen)
