import React, { useState } from 'react'
import View from './../../../components/View';
import Text from './../../../components/Text';
import { SearchBar, ListItem, Avatar } from 'react-native-elements';
import styles from './../../../assets/stylesheets/searchScreen';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import SearchItem from './../../../components/search-item/index';

const list = [
    {
        id: 1,
        title: 'Attack On Titan',
        poster: 'https://i.pinimg.com/originals/55/39/54/553954c0f30a23848c5ba63ee45cdbd5.jpg'
    },
    {
        id: 2,
        title: 'My Hero Academia',
        poster: 'https://wallpapercave.com/wp/wp1874038.png'
    },
    {
        id: 3,
        title: 'Naruto',
        poster: 'https://i.pinimg.com/originals/be/e6/f5/bee6f5c0314a5e9711e0582dc659a292.jpg'
    },
    {
        id: 4,
        title: 'Jujutsu Kaisen',
        poster: 'https://wallpaperaccess.com/full/5252278.jpg'
    },        
    {
        id: 5,
        title: 'Love is War',
        poster: 'https://wallpapercave.com/wp/wp4051792.jpg'
    },
    {
        id: 6,
        title: 'Eyeshield 21',
        poster: 'https://wallpaperaccess.com/full/2096531.jpg'
    },   
    {
        id: 7,
        title: '7 Deadly Sins',
        poster: 'https://wallpaper.dog/large/16992856.jpg'
    },   
    {
        id: 8,
        title: 'Haikyuu',
        poster: 'https://wallpapercave.com/wp/wp1818242.png'
    },   
    {
        id: 9,
        title: 'Promise Neverland',
        poster: 'https://wallpapercave.com/wp/wp3951103.jpg'
    }
];

const SearchScreen = () => 
{
    const [ searchList, setSearchList ] = useState(list);
    const [ searchInput, setSearchInput ] = useState('');

    const handleChangeSearchInput = text => {
        setSearchInput(text);
        setSearchList(list.filter(({ title }) => (title.toLowerCase()).includes(text)));
    }
    

    return (
        <View style={ styles.container }>
            <SearchBar
                placeholder="Search for a show, movie, genre, etc.."
                onChangeText={ handleChangeSearchInput }
                value={ searchInput }
                inputStyle={ styles.searchInput }
                containerStyle={ styles.searchContainer }
                inputContainerStyle={ styles.searchInputContainer }
                showLoading
            />
            {
                (!searchList.length) 
                    ? (
                        <View style={ styles.emptyList }>
                            <Text h4>Oh darn. We don't have that.</Text>
                            <Text style={ styles.notFoundCaption }>Try searching for another movie, show, actor, director, or genre.</Text>
                        </View>
                    )
                    : (
                        <>
                            <Text h4 style={ styles.searchHeaderTitle }>Top Researches</Text>
                            <FlatList 
                                keyExtractor={ ({ id }) => id.toString() }
                                data={ searchList }
                                renderItem={ ({ item }) => (
                                    <SearchItem 
                                        uri={ item.poster } 
                                        title={ item.title }
                                        onPress={ () => console.log(`${ item.title } is now Playing`) }
                                    />
                                )}
                            />
                        </>
                    )
            }
        </View>
    )
}

export default SearchScreen
