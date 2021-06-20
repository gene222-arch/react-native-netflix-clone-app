import React, { useState, useEffect } from 'react'
import View from './../../../components/View';
import Text from './../../../components/Text';
import { InteractionManager } from 'react-native'
import styles from './../../../assets/stylesheets/searchScreen';
import { FlatList } from 'react-native-gesture-handler';
import SearchItem from './../../../components/search-item/index';
import searchListAPI from './../../../services/data/searchList';
import SearchNotFound from './../../errors/SearchNotFound';
import { cacheImage, getCachedFile } from './../../../utils/cacheImage';
import LoadingScreen from './../../../components/LoadingScreen';
import SearchBar from './SearchBar';

const DisplaySearch = ({ searchList, searchListLength }) => 
{
    if (!searchListLength) {
        return <SearchNotFound styles={ styles } />
    }

    return (
        <View>
            <Text h4 style={ styles.searchHeaderTitle }>Top Researches</Text>
            <FlatList 
                keyExtractor={ ({ id }) => id.toString() }
                data={ searchList }
                renderItem={ ({ item }) => (
                    <SearchItem
                        uri={ getCachedFile('SearchList/', item.id, item.poster) } 
                        title={ item.title }
                        onPress={ () => console.log(`${ item.title } is now Playing`) }
                    />
                )}
            />
        </View>
    )
}

const SearchScreen = () => 
{
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    const [ searchList, setSearchList ] = useState([]);
    const [ searchInput, setSearchInput ] = useState('');

    const handleChangeSearchInput = (searchTextInput) => 
    {
        setSearchInput(searchTextInput);
        
        if (!searchTextInput) {
            setSearchList(searchListAPI);
        }
        else {  
            let filteredList = [];
            const text_ = searchTextInput.toLowerCase();

            const mapSearchList = searchListAPI.map(({ title, author, genre, ...props }) => ({ 
                ...props, 
                genre: genre.map(name => name.toLowerCase()),
                title: title.toLowerCase(), 
                author: author.toLowerCase() 
            }));

            for (let index = 0; index < mapSearchList.length; index++) 
            {
                const { title, author, genre } = mapSearchList[index];

                const genreExists = genre.find(name => name.indexOf(text_) !== -1);
                
                if (title.indexOf(text_) !== -1 || author.indexOf(text_) !== -1 || genreExists) {
                    filteredList.push(searchListAPI[index]);
                }
            }

            setSearchList(filteredList);
        }
    }

    const handleOnCancel = () => {
        setSearchInput('');
        setSearchList(searchListAPI);
    }

    const runAfterInteractions = () => {
        searchListAPI.map(({ id, poster }) => cacheImage(poster, id, 'SearchList/'));
        
        setSearchList(searchListAPI)
        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setIsInteractionsComplete(false);
        setSearchList([]);
        setSearchInput('');
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
            <SearchBar 
                searchInput={ searchInput } 
                handleChangeSearchInput={ handleChangeSearchInput } 
                handleOnCancel={ handleOnCancel }
            />
            <DisplaySearch searchList={ searchList } searchListLength={ searchList.length } />
        </View>
    )
}

export default SearchScreen
