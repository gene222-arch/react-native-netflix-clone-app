import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import View from './../../../components/View';
import Text from './../../../components/Text';
import styles from './../../../assets/stylesheets/homeScreen';
import HomeCategory from '../../../components/home-category/HomeCategory';
import categories from './../../../services/data/categories';
import { FlatList } from 'react-native-gesture-handler';
import { Tab } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AppBar from './../../AppBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CategoriesMenu from './CategoriesMenu';

const HomeScreen = () => 
{
    const [ showCategories, setShowCategories ] = useState(false);
    const [ tabIndex, setTabIndex ] = useState(0);

    const handlePressTabs = (index) => setTabIndex(index);

    const handlePressTvShows = () => console.log('TV Shows clicked!');

    const handlePressMovies = () => console.log('Movies clicked!');

    const handlePressCategories = () => setShowCategories(true);

    return (
        <View style={ styles.container }>
            <AppBar />
            <CategoriesMenu isVisible={ showCategories } setIsVisible={ setShowCategories }/>
            <View style={ styles.tabContainer }>
                <Text 
                    touchableOpacity={ true } 
                    style={ styles.tabItem }
                    onPress={ handlePressTvShows }
                >TV Shows</Text>
                <Text 
                    touchableOpacity={ true } 
                    style={ styles.tabItem }
                    onPress={ handlePressMovies }
                >Movies</Text>
                <TouchableOpacity onPress={ handlePressCategories }>
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
            <FlatList 
                data={ categories.items }
                renderItem={({ item }) => (
                    <HomeCategory 
                        title={ item.title }
                        categories={ item.movies }
                    />
                )}
            />
        </View>
    )
}

export default HomeScreen
