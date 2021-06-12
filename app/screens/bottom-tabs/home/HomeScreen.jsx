import React, { useState } from 'react'
import { TouchableOpacity, ImageBackground } from 'react-native'
import View from './../../../components/View';
import Text from './../../../components/Text';
import styles from './../../../assets/stylesheets/homeScreen';
import HomeCategory from '../../../components/home-category/HomeCategory';
import categories from './../../../services/data/categories';
import { FlatList } from 'react-native-gesture-handler';
import { Tab, Button } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AppBar from './../../AppBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CategoriesMenu from './CategoriesMenu';
import Image from './../../../components/Image';
import downloads from './../../../services/data/downloads';
import ContinueWatchingForItem from './../../../components/continue-watching-for-item/ContinueWatchingForItem';

const DEFAULT_FRONT_PAGE = {
    id: 1,
    category: 'anime',
    title: 'Dr. Stone',
    uri: { 
        uri: 'https://occ-0-1722-1723.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABQ00YbpcuYCWDLWuZV3FxmpsniecSR3aAH36OkK8j1CMzc5kAI33gF10HoJq9rYXv5y56b_KPF-TQR9HWN007KcKDZuI63mDnir8.png?r=522'
    },
    tags: [
        'Exciting',
        'Sci-Fi Anime',
        'Wilderness Survival',
        'Japanese'
    ]
}

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
                                source={{ 
                                    uri: 'https://m.media-amazon.com/images/I/615pBkyPODL._AC_.jpg'
                                }}
                                style={ styles.homeFrontPage }
                            >
                            <View style={ styles.topMenuContainer }>
                                <AppBar />
                                <CategoriesMenu isVisible={ showCategories } setIsVisible={ setShowCategories }/>
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
                            </View>
                            <View style={ styles.frontPageOptions }>
                                <Image 
                                    source={ DEFAULT_FRONT_PAGE.uri }
                                    style={ styles.homeFrontPageShowLogo }
                                />
                                <View style={ styles.tagsContainer }>
                                {
                                    DEFAULT_FRONT_PAGE.tags.map((name, index) => (
                                        <Text 
                                            key={ index }
                                            style={ styles.tagItem }
                                        >
                                            { (DEFAULT_FRONT_PAGE.tags.length - 1) !== index ? `${ name }  · ` : name }
                                        </Text>
                                    ))
                                }
                                </View>
                                <View style={ styles.actionBtnsContainer }>
                                    <View style={ styles.myListInfoActionContainer }>
                                        <FeatherIcon 
                                            name='check'
                                            size={ 24 }
                                            color='#fff'
                                        />
                                        <Text style={ styles.myListInfoActionText }>My List</Text>
                                    </View>
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
                        <View style={ styles.continueWatchingForContainer }>
                            <Text h4>Continue Watching For KNSM</Text>
                            <FlatList 
                                keyExtractor={ ({ id }) => id.toString()}
                                data={ downloads }
                                renderItem={({ item }) => <ContinueWatchingForItem episode={ item } /> }
                                horizontal
                            />    
                        </View>   
                    </>             
                }
            />
        </View>
    )
}

export default HomeScreen
