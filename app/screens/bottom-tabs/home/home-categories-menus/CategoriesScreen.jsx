import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { TouchableOpacity, ImageBackground } from 'react-native'

/** Selectors */
import { authSelector } from './../../../../redux/modules/auth/selectors';

/** Actions */
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions'

/** API */
import categories_ from './../../../../services/data/categories';
import downloads from './../../../../services/data/downloads';

/** RNE Components */
import { Tab, Button } from 'react-native-elements';

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
import styles from './../../../../assets/stylesheets/homeScreen';
import recommendations_ from './../../../../services/data/recommendations';
import frontPageShows from './../../../../services/data/frontPageShows';


const CategoriesScreen = ({ AUTH, route }) => 
{
    const dispatch = useDispatch();
    const { categoryName } = route.params;

    const [ frontPage, setFrontPage ] = useState(frontPageShows.find(({ category }) => category === categoryName));
    const [ categories, setCategories ] = useState(categories_);
    const [ recommendations, setRecommendations ] = useState(recommendations_);
    const [ showCategories, setShowCategories ] = useState(false);

    const handleToggleAddToMyList = () => dispatch(AUTH_ACTION.toggleAddToMyListStart(frontPage));

    const handlePressCategory = (CATEGORY) => 
    {
        setFrontPage(frontPageShows.find(({ category }) => category === CATEGORY));

        const newCategories = categories_.items.map(category => {

            const filterMovies = category.movies.filter(({ show_type }) => show_type === CATEGORY);

            return { ...category, movies: filterMovies };
        });

        setCategories(newCategories);
    }

    const handleToggleCategories = () => setShowCategories(!showCategories);

    const handleToggleLikeRecommendation = (recommendationID) => {
        const newRecommendations = recommendations.map((rec) => 
            (rec.id === recommendationID) && (!rec.isLiked)
                ? { ...rec, isLiked: true }
                : { ...rec, isLiked: false }
        );

        setRecommendations(newRecommendations);
    }

    const handlePressRemoveRecommendation = (recommendationID) => {
        const newRecommendations = recommendations.filter(rec => rec.id !== recommendationID);

        setRecommendations(newRecommendations);
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
                        <ImageBackground
                                source={ frontPage.backgroundImage }
                                style={ styles.homeFrontPage }
                            >
                            {/* Nav Bar */}
                            <View style={ styles.topMenuContainer }>
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
                                    source={ frontPage.poster }
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
                                        <FeatherIcon 
                                            name='info'
                                            size={ 24 }
                                            color='#fff'
                                        />
                                        <Text style={ styles.myListInfoActionText }>Info</Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>   

                        {/* Continue Watching For */}
                        <View style={ styles.continueWatchingForContainer }>
                            <Text h4>Continue Watching For KNSM</Text>
                            <FlatList 
                                keyExtractor={ ({ id }) => id.toString()}
                                data={ recommendations }
                                renderItem={({ item }) =>  (
                                    <ContinueWatchingForItem 
                                        episode={ item } 
                                        handleToggleLikeRecommendation={ () => handleToggleLikeRecommendation(item.id) }
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

export default connect(mapStateToProps)(CategoriesScreen)
