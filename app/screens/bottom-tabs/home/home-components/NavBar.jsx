import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Animated } from 'react-native'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import styles from './../../../../assets/stylesheets/homeScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CategoriesMenu from './CategoriesMenu';
import FadeInOutView from './../../../../components/animated/FadeInOutView';

const Navigation = ({ handlePressTvShows, handlePressMovies, handleToggleCategories, }) => {
    return (
        <View style={ styles.tabContainer }>
            <Text 
                touchableOpacity={ true } 
                style={ styles.tabItem }
                onPress={ handlePressTvShows }
            >
                TV Shows
            </Text>
            <Text 
                touchableOpacity={ true } 
                style={ styles.tabItem }
                onPress={ handlePressMovies }
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
    )
}

const NavBar = ({ show = true, handlePressCategory }) => 
{
    const [ showCategories, setShowCategories ] = useState(false);

    const handleToggleCategories = () => setShowCategories(!showCategories);

    useEffect(() => {
        return () => {
            setShowCategories(false);
        }
    }, []);

    return (
        <FadeInOutView shouldFadeIn={ show }>
            <CategoriesMenu isVisible={ showCategories } setIsVisible={ setShowCategories }/>
            <Navigation 
                handlePressTvShows={ () => handlePressCategory('TV Shows') }
                handlePressMovies={ () => handlePressCategory('Movies') }
                handleToggleCategories={ handleToggleCategories }
            />
        </FadeInOutView>
    )
}

export default NavBar
