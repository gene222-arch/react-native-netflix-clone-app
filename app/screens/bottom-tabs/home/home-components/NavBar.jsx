import React, { useState, useEffect } from 'react'
import { Platform, StatusBar, TouchableOpacity } from 'react-native'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import styles from './../../../../assets/stylesheets/homeScreen';
import AppBar from './../../../AppBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CategoriesMenu from './CategoriesMenu';


const NavBar = ({ handlePressCategory }) => 
{
    const [ showCategories, setShowCategories ] = useState(false);

    const handleToggleCategories = () => setShowCategories(!showCategories);

    useEffect(() => {
        return () => {
            setShowCategories(false);
        }
    }, []);

    return (
        <View style={ styles.topMenuContainer }>
            <AppBar marginTop={ Platform.OS === 'android' ? StatusBar.currentHeight : 0 } />
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
    
    )
}

export default NavBar
