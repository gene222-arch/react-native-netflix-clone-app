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
import recommendations_ from './../../../../services/data/recommendations';
import frontPageShows from './../../../../services/data/frontPageShows';
import CategoriesMenu from './../CategoriesMenu';
import { cacheImage, getCachedFile } from './../../../../utils/cacheImage';
import LoadingScreen from '../../../../components/LoadingScreen';
import MainCategoriesMenu from './../MainCategoriesMenu';
import Info from './../../../../components/continue-watching-for-item/Info';


const DEFAULT_FRONT_PAGE = {
    id: '',
    category: '',
    title: '',
    backgroundImage: null,
    poster: null,
    tags: [],
    isAddedToMyList: false
}

const DisplayContinueWatchingFor = ({ recommendations, handleToggleLikeRecommendation, handleToggleUnLikeRecommendation, handlePressRemoveRecommendation }) => {
    return (
        <View style={ styles.continueWatchingForContainer }>
            <Text h4>Continue Watching For KNSM</Text>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString()}
                data={ recommendations }
                renderItem={({ item }) =>  (
                    <ContinueWatchingForItem 
                        episode={ item } 
                        handleToggleLikeRecommendation={ handleToggleLikeRecommendation }
                        handleToggleUnLikeRecommendation={ handleToggleUnLikeRecommendation }
                        handlePressRemoveRecommendation={ handlePressRemoveRecommendation }
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
    const [ showFrontPageInfo, setShowFrontPageInfo ] =  useState(false);
    const [ categoryItems, setCategoryItems ] = useState([]);
    const [ recommendations, setRecommendations ] = useState([]);
    const [ showCategories, setShowCategories ] = useState(false);
    const [ showMainCategories, setShowMainCategories ] = useState(false);

    const handleToggleAddToMyList = () => dispatch(AUTH_ACTION.toggleAddToMyListStart(frontPage));

    const handlePressChangeMainCategory = (CATEGORY) => 
    {
        setFrontPage(frontPageShows.find(({ category }) => category === CATEGORY));

        const newCategories = categories_.items.map(category => {

            const filterMovies = category.movies.filter(({ show_type }) => show_type === CATEGORY);

            return { ...category, movies: filterMovies };
        });

        setCategoryItems(newCategories);
    }

    const handleToggleMainCategories = () => setShowMainCategories(!showMainCategories);

    const handleToggleCategories = () => setShowCategories(!showCategories);

    const handleToggleLikeRecommendation = (recommendationID, rate) => {
        const newRecommendations = recommendations.map((rec) => {

            if (rec.id === recommendationID) 
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

        setRecommendations(newRecommendations);
    }

    const handlePressRemoveRecommendation = (recommendationID) => {
        const newRecommendations = recommendations.filter(rec => rec.id !== recommendationID);

        setRecommendations(newRecommendations);
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

        /** Cache Recommendations */
        recommendations_.map(({ id, poster, video }) => {
            cacheImage(poster, id, 'Recommendations/');
            cacheImage(video, id, 'Recommendations/');
        });
    }

    const runAfterInteractions = () => 
    {
        cacheImages();
        handlePressChangeMainCategory(categoryName);
        setRecommendations(recommendations_);
        setIsInteractionsComplete(true);
    }
    
    const cleanUp = () => {
        setCategoryItems([]);
        setFrontPage(DEFAULT_FRONT_PAGE);
        setShowFrontPageInfo(false);
        setRecommendations([]);
        setIsInteractionsComplete(false);
        setShowCategories(false);
        setShowMainCategories(false);
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
            {/* Display front page info */}
            <Info selectedShow={ frontPage } isVisible={ showFrontPageInfo } setIsVisible={ setShowFrontPageInfo } />
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
                            {/* Nav Bar */}
                            <View style={ styles.topMenuContainer }>
                                <View style={ styles.tabContainer }>
                                    {/* Main Category List */}
                                    <MainCategoriesMenu 
                                        isVisible={ showMainCategories } 
                                        setIsVisible={ setShowMainCategories } 
                                        selectedMainCategory={ categoryName }
                                        setMainCategory={ handlePressChangeMainCategory }
                                    />

                                    {/* Category list */}
                                    <CategoriesMenu 
                                        isVisible={ showCategories } 
                                        setIsVisible={ setShowCategories }
                                        selectedMainCategory={ categoryName }
                                        handlePressChangeMainCategory={ handlePressChangeMainCategory }
                                    />
                                    <TouchableOpacity onPress={ handleToggleMainCategories }>
                                        <View style={ styles.categoriesContainer }>
                                            <Text style={ styles.tabItem }>TV Shows</Text>
                                            <FontAwesome5 
                                                name='sort-down'
                                                size={ 12 }
                                                color='#fff'
                                                style={ styles.categoriesIcon }
                                            />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ handleToggleCategories }>
                                        <View style={ styles.categoriesContainer }>
                                            <Text style={ styles.tabItem }>All Categories</Text>
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
                            
                            {/* Front Page Options/Action Buttons */}
                            <View style={ styles.frontPageOptions }>
                                <Image 
                                    source={{ 
                                        uri: getCachedFile('HomeCategoriesFrontPages/Poster/', frontPage.id, frontPage.poster) 
                                    }}
                                    style={ styles.homeFrontPageShowLogo }
                                />
                                <View style={ styles.tagsContainer }>
                                {
                                    frontPage.tags.map((name, index) => (
                                        <Text 
                                            key={ index }
                                            style={ styles.tagItem }
                                        >
                                            { (frontPage.tags.length - 1) !== index ? `${ name }  · ` : name }
                                        </Text>
                                    ))
                                }
                                </View>
                                <View style={ styles.actionBtnsContainer }>
                                    <TouchableOpacity onPress={ handleToggleAddToMyList }>
                                        <View style={ styles.myListInfoActionContainer }>
                                            <FeatherIcon 
                                                name={ !AUTH.myList.find(({ id }) => id === frontPage.id) ? 'check' : 'plus' }
                                                size={ 24 }
                                                color='#fff'
                                            />
                                            <Text style={ styles.myListInfoActionText }>My List</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <Button 
                                        title='   Play'
                                        icon={
                                            <FontAwesome5 
                                                name='play'
                                                size={ 16 }
                                                color='#000'
                                            />
                                        }
                                        iconPosition='left'
                                        onPress={ () => console.log('Dr. Stone is Playing...') }
                                        buttonStyle={ styles.playBtn }
                                        titleStyle={ styles.playBtnTitle }
                                    />
                                    <View style={ styles.myListInfoActionContainer }>
                                        <TouchableOpacity onPress={ () => setShowFrontPageInfo(true) }>
                                            <FeatherIcon 
                                                name='info'
                                                size={ 24 }
                                                color='#fff'
                                            />
                                            <Text style={ styles.myListInfoActionText }>Info</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>   

                        {/* Continue Watching For */}
                        <DisplayContinueWatchingFor 
                            recommendations={ recommendations }
                            handleToggleLikeRecommendation={ () => handleToggleLikeRecommendation(item.id, 'like') }
                            handleToggleUnLikeRecommendation={ () => handleToggleLikeRecommendation(item.id, 'not for me') }
                            handlePressRemoveRecommendation={ () => handlePressRemoveRecommendation(item.id) }
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
