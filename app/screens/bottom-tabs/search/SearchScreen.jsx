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
import SearchScreenLoader from '../../../components/loading-skeletons/SearchScreenLoader';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';


const DisplayList = ({ isLoading = false, searchInput = '', movies, handlePressDisplayShowInfo }) => 
{
    if (isLoading) {
        return <SearchScreenLoader />
    }

    return (
        !searchInput.length  
            ? <DefaultSearchList movies={ movies } handlePressDisplayShowInfo={ handlePressDisplayShowInfo }/>
            : <OnSearchList movies={ movies } handlePressDisplayShowInfo={ handlePressDisplayShowInfo }/>
    )
}

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
        setShow(show);
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

            setMovies(filteredList);
        }
    }

    const handleOnCancel = () => {
        setSearchInput('');
        setMovies(searchListAPI);
    }

    const runAfterInteractions = () => {
        setMovies(searchListAPI)
        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);

        return () => {
            setMovies([]);
            setSearchInput('');
            setShow(null);
            setIsVisibleMovieInfo(false);
            setIsInteractionsComplete(false);
        }
    }, []);

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
            <DisplayList 
                isLoading={ !isInteractionsComplete }
                movies={ movies } 
                searchInput={ searchInput }
                handlePressDisplayShowInfo={ handlePressDisplayShowInfo } 
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(SearchScreen)
