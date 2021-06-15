import React, { useState, useEffect } from 'react'
import View from './../../../components/View';
import Text from './../../../components/Text';
import { InteractionManager } from 'react-native'
import { SearchBar, ListItem, Avatar } from 'react-native-elements';
import styles from './../../../assets/stylesheets/searchScreen';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import SearchItem from './../../../components/search-item/index';
import searchListAPI from './../../../services/data/searchList';
import SearchNotFound from './../../errors/SearchNotFound';
import { cacheImage } from './../../../utils/cacheImage';
import * as FileSystem from 'expo-file-system'
import { getExtension } from './../../../utils/file';

const SearchScreen = () => 
{
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    const [ searchList, setSearchList ] = useState([]);
    const [ searchInput, setSearchInput ] = useState('');

    const handleChangeSearchInput = (text) => {
        setSearchInput(text);
        setSearchList(searchList.filter(({ title }) => (title.toLowerCase()).includes(text)));
    }

    const handleOnCancel = () => setSearchList(searchListAPI);

    const runAfterInteractions = () => {
        searchListAPI.map(({ id, poster }) => cacheImage(poster, id, 'SearchList/'));
        
        setSearchList(searchListAPI)
        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            setSearchList([]);
        }
    }, []);

    
    if (!isInteractionsComplete) {
        return <Text>Loading ...</Text>
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
                onCancel={ handleOnCancel }
                showLoading={ true }
            />
            {
                (!searchList.length) 
                    ? <SearchNotFound styles={ styles } />
                    : (
                        <>
                            <Text h4 style={ styles.searchHeaderTitle }>Top Researches</Text>
                            <FlatList 
                                keyExtractor={ ({ id }) => id.toString() }
                                data={ searchList }
                                renderItem={ ({ item }) => (
                                    <SearchItem 
                                        uri={ `${ FileSystem.cacheDirectory }SearchList/${ item.id }.${ getExtension(item.poster) }` } 
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
