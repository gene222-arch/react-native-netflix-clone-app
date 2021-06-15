import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { TouchableOpacity, ImageBackground, InteractionManager } from 'react-native'

/** Selectors */
import { authSelector } from './../../../redux/modules/auth/selectors';

/** Actions */
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'

/** API */
import categories_ from './../../../services/data/categories';
import downloads from './../../../services/data/downloads';

/** RNE Components */
import { Tab, Button } from 'react-native-elements';

/** Components */
import AppBar from './../../AppBar';
import CategoriesMenu from './CategoriesMenu';
import Image from './../../../components/Image';
import ContinueWatchingForItem from './../../../components/continue-watching-for-item/ContinueWatchingForItem';
import View from './../../../components/View';
import Text from './../../../components/Text';
import HomeCategory from '../../../components/home-category/HomeCategory';

/** Icons */
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

/** Styles */
import styles from './../../../assets/stylesheets/homeScreen';
import recommendations_ from './../../../services/data/recommendations';
import frontPageShows from './../../../services/data/frontPageShows';
import { useNavigation } from '@react-navigation/native';
import Info from './../../../components/continue-watching-for-item/Info';
import { cacheImage } from './../../../utils/cacheImage';
import * as FileSystem from 'expo-file-system';
import { getExtension } from './../../../utils/file';


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

    const [ showFrontPageInfo, setShowFrontPageInfo ] = useState(false);
    const [ frontPage, setFrontPage ] = useState(DEFAULT_FRONT_PAGE);
    const [ categories, setCategories ] = useState([]);
    const [ recommendations, setRecommendations ] = useState([]);
    const [ showCategories, setShowCategories ] = useState(false);

    const handleClickShowInfo = () => setShowFrontPageInfo(!showFrontPageInfo);

    const handleToggleAddToMyList = () => dispatch(AUTH_ACTION.toggleAddToMyListStart(frontPage));

    const handlePressCategory = (categoryName) => navigation.navigate('CategoriesScreen', { categoryName, headerTitle: categoryName });

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
            cacheImage(poster, id, 'FrontPages/');
            cacheImage(backgroundImage, id, 'FrontPages/');
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
        setCategories(categories_);
        setFrontPage(frontPageShows[0]);
        setRecommendations(recommendations_);
        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            setCategories([]);
            setFrontPage(DEFAULT_FRONT_PAGE);
            setRecommendations([]);
            setIsInteractionsComplete(false);
        }
    }, []);


    if (!isInteractionsComplete) {
        return <Text h4>Loading ...</Text>
    }

    return (
        <View style={ styles.container }>
            {/* Display front page info */}
            <Info selectedShow={ frontPage } isVisible={ showFrontPageInfo } setIsVisible={ setShowFrontPageInfo } />

            {/* Display Categories */}
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
                                source={{ 
                                    uri: `${ FileSystem.cacheDirectory }FrontPages/${ frontPage.id }.${ getExtension(frontPage.backgroundImage) }` 
                                }}
                                style={ styles.homeFrontPage }
                            >
                            {/* Nav Bar */}
                            <View style={ styles.topMenuContainer }>
                                <AppBar />
                                <CategoriesMenu isVisible={ showCategories } setIsVisible={ setShowCategories }/>
                                <View style={ styles.tabContainer }>
                                    <Text 
                                        touchableOpacity={ true } 
                                        style={ styles.tabItem }
                                        onPress={ () => handlePressCategory('TV Shows') }
                                    >
                                        TV Shows
                                    </Text>
                                    <Text 
                                        touchableOpacity={ true } 
                                        style={ styles.tabItem }
                                        onPress={ () => handlePressCategory('Movies') }
                                    >
                                        Movies
                                    </Text>
                                    <TouchableOpacity onPress={ handleToggleCategories }>
                                        <View style={ styles.categoriesContainer }>
                                            <Text style={ styles.tabItem }>Categories</Text>
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
                                        uri: `${ FileSystem.cacheDirectory }FrontPages/${ frontPage.id }.${ getExtension(frontPage.poster) }` }}
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
                                        <TouchableOpacity onPress={ handleClickShowInfo }>
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
                        <View style={ styles.continueWatchingForContainer }>
                            <Text h4>Continue Watching For KNSM</Text>
                            <FlatList
                                keyExtractor={ item => item.id.toString() }
                                data={ recommendations }
                                renderItem={({ item }) =>  (
                                    <ContinueWatchingForItem 
                                        episode={ item } 
                                        handleToggleLikeRecommendation={ () => handleToggleLikeRecommendation(item.id, 'like') }
                                        handleToggleUnLikeRecommendation={ () => handleToggleLikeRecommendation(item.id, 'not for me') }
                                        handlePressRemoveRecommendation={ () => handlePressRemoveRecommendation(item.id) }
                                    />
                                )}
                                horizontal
                            />    
                        </View>   
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
