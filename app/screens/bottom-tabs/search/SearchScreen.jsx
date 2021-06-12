import React, { useState } from 'react'
import View from './../../../components/View';
import Text from './../../../components/Text';
import { SearchBar, ListItem, Avatar } from 'react-native-elements';
import styles from './../../../assets/stylesheets/searchScreen';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import SearchItem from './../../../components/search-item/index';
import searchList_ from './../../../services/data/searchList';

const SearchScreen = () => 
{
    const [ searchList, setSearchList ] = useState(searchList_);
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
