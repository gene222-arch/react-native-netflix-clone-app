import React, { useState, useEffect } from 'react'
import View from './../../../components/View';
import { InteractionManager } from 'react-native'
import styles from './../../../assets/stylesheets/searchScreen';
import searchListAPI from './../../../services/data/searchList';
import { cacheImage } from './../../../utils/cacheImage';
import LoadingScreen from './../../../components/LoadingScreen';
import SearchBar from './SearchBar';
import DefaultSearchList from './DefaultSearchList';
import OnSearchList from './OnSearchList';
import ShowInfo from './../../../components/continue-watching-for-item/Info';


const SearchScreen = () => 
{
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    const [ searchList, setSearchList ] = useState([]);
    const [ searchInput, setSearchInput ] = useState('');
    const [ show, setShow ] = useState(null);
    const [ shouldDisplayShowInfo, setShouldDisplayShowInfo ] = useState(false);

    const handlePressDisplayShowInfo = (show) => {
        setTimeout(() => {
            setShow(show);
            setShouldDisplayShowInfo(true);
        }, 1);
    }

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
        searchListAPI.map(({ id, poster, wallpaper }) => {
            cacheImage(poster, id, 'SearchList/Posters/');
            cacheImage(wallpaper, id, 'SearchList/Wallpapers/');
        });
        
        setSearchList(searchListAPI)
        setIsInteractionsComplete(true);
    }

    const cleanUp = () => {
        setIsInteractionsComplete(false);
        setSearchList([]);
        setSearchInput('');
        setShow(null);
        setShouldDisplayShowInfo(false);
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
            <ShowInfo  
                selectedShow={ show }
                isVisible={ shouldDisplayShowInfo }
                setIsVisible={ setShouldDisplayShowInfo }
            />
            <SearchBar 
                searchInput={ searchInput } 
                handleChangeSearchInput={ handleChangeSearchInput } 
                handleOnCancel={ handleOnCancel }
            />
            {
                !searchInput.length  
                    ? <DefaultSearchList searchList={ searchList } handlePressDisplayShowInfo={ handlePressDisplayShowInfo }/>
                    : <OnSearchList searchList={ searchList } handlePressDisplayShowInfo={ handlePressDisplayShowInfo }/>
            }
        </View>
    )
}

export default SearchScreen
