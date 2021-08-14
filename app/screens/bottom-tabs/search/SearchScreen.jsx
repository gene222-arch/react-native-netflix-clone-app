import React, { useState, useEffect, useMemo } from 'react'
import View from './../../../components/View';
import { InteractionManager } from 'react-native'
import styles from './../../../assets/stylesheets/searchScreen';
import searchListAPI from './../../../services/data/searchList';
import { cacheImage, getCachedFile } from './../../../utils/cacheImage';
import SearchBar from './SearchBar';
import DefaultSearchList from './DefaultSearchList';
import OnSearchList from './OnSearchList';
import ShowInfo from './../../../components/continue-watching-for-item/Info';
import LoadingSpinner from './../../../components/LoadingSpinner';


const SearchScreen = () => 
{
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    const [ movies, setMovies ] = useState([]);
    const [ searchInput, setSearchInput ] = useState('');
    const [ show, setShow ] = useState(null);
    const [ isVisibleMovieInfo, setIsVisibleMovieInfo ] = useState(false);

    const memoizedSearchList = useMemo(() => {
        const memoizedSearchList = searchListAPI.map(({ title, authors, genres, ...props }) => ({ 
            ...props, 
            genres: genres.split(',').map(genre => genre.toLowerCase().trim()),
            title: title.toLowerCase(), 
            authors: authors.split(',').map(author => author.toLowerCase().trim())
        }));

        return memoizedSearchList;
    }, []);

    const handlePressDisplayShowInfo = (show) => {
        setShow({ ...show, poster_path: getCachedFile('SearchList/Posters/', show.id, show.poster_path) });
        setIsVisibleMovieInfo(true);
    }

    const handleChangeSearchInput = (textInput) => 
    {
        setSearchInput(textInput);
        
        if (! textInput) {
            setMovies(searchListAPI);
        }
        else {  
            textInput = textInput.toLowerCase();

            const filteredList = memoizedSearchList.filter(movie => {
                const genresExists = movie.genres.find(genre => genre.indexOf(textInput) !== -1);
                const authorsExists = movie.authors.find(author => author.indexOf(textInput) !== -1);

                return movie.title.indexOf(textInput) !== -1 || authorsExists || genresExists;
            });          

            console.log("total num of filtered: ", filteredList.length)

            setMovies(filteredList);
        }
    }

    const handleOnCancel = () => {
        setSearchInput('');
        setMovies(searchListAPI);
    }

    const runAfterInteractions = () => {
        searchListAPI.map(movie => {
            cacheImage(movie.poster_path, movie.id, 'SearchList/Posters/');
            cacheImage(movie.wallpaper_path, movie.id, 'SearchList/Wallpapers/');
        });
        
        setMovies(searchListAPI)
        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            console.log('CLEAN UP SEARCH SCREEN');
            setMovies([]);
            setSearchInput('');
            setShow(null);
            setIsVisibleMovieInfo(false);
            setIsInteractionsComplete(false);
        }
    }, []);
    
    if (! isInteractionsComplete) {
        return <LoadingSpinner />
    }

    return (
        <View style={ styles.container }>
            <ShowInfo  
                selectedShow={ show }
                isVisible={ isVisibleMovieInfo }
                setIsVisible={ setIsVisibleMovieInfo }
            />
            <SearchBar 
                searchInput={ searchInput } 
                handleChangeSearchInput={ handleChangeSearchInput } 
                handleOnCancel={ handleOnCancel }
            />
            {
                !searchInput.length  
                    ? <DefaultSearchList movies={ movies } handlePressDisplayShowInfo={ handlePressDisplayShowInfo }/>
                    : <OnSearchList movies={ movies } handlePressDisplayShowInfo={ handlePressDisplayShowInfo }/>
            }
        </View>
    )
}

export default SearchScreen
