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
    const [ searchInput, setSearchInput ] = useState('sss');
    const [ showLoading, setShowLoading ] = useState(false);

    const handleChangeSearchInput = (text) => 
    {
        setShowLoading(true);
        setSearchInput(text);
        
        if (!text) {
            setSearchList(searchListAPI);
        }
        else {
            setTimeout(() => {
                setSearchList(searchListAPI.filter(({ title }) => title.toLowerCase().includes(text.toLowerCase())));
                setShowLoading(false);
            }, 100);
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
                showLoading={ showLoading }
            />
            <DisplaySearch searchList={ searchList } searchListLength={ searchList.length } />
        </View>
    )
}

export default SearchScreen
