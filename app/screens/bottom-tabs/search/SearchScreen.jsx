import React, { useState, useCallback, useEffect } from 'react'
import View from './../../../components/View';
import { InteractionManager } from 'react-native'
import styles from './../../../assets/stylesheets/searchScreen';
import * as MOVIE_ACTION from './../../../redux/modules/movie/actions';
import SearchBar from './SearchBar';
import DefaultSearchList from './DefaultSearchList';
import OnSearchList from './OnSearchList';
import ShowInfo from './../../../components/continue-watching-for-item/Info';
import SearchScreenLoader from '../../../components/loading-skeletons/SearchScreenLoader';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { movieSelector } from './../../../redux/modules/movie/selectors';
import { authProfileSelector } from './../../../redux/modules/auth/selectors';


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

const SearchScreen = ({ AUTH_PROFILE, MOVIE }) => 
{
    const dispatch = useDispatch();
    const [ isInteractionsComplete, setIsInteractionsComplete ] = useState(false);

    const [ movies, setMovies ] = useState(MOVIE.topSearches);
    const [ searchInput, setSearchInput ] = useState('');
    const [ show, setShow ] = useState(null);
    const [ isVisibleMovieInfo, setIsVisibleMovieInfo ] = useState(false);


    const handlePressDisplayShowInfo = (show) => {
        setShow(show);
        setIsVisibleMovieInfo(true);
    }

    const handleChangeSearchInput = (textInput) => 
    {
        setSearchInput(textInput);
        
        if (! textInput) {
            setMovies(MOVIE.topSearches);
        }
        else {  
            textInput = textInput.toLowerCase();

            const filteredList = MOVIE.topSearches.filter(({ title, authors, genres }) => {
                const authorsExists = authors.split(',').find(author => author.indexOf(textInput) !== -1);
                const genresExists = genres.split(',').find(genre => genre.indexOf(textInput) !== -1);
                
                return title.toLowerCase().indexOf(textInput) !== -1 || authorsExists || genresExists;
            });             

            setMovies(filteredList);
        }
    }

    const handleOnCancel = () => {
        setSearchInput('');
        setMovies(MOVIE.topSearches);
    }

    const runAfterInteractions = () => {
        dispatch(MOVIE_ACTION.getTopSearchedMoviesStart({ is_for_kids: AUTH_PROFILE.is_for_kids }));
        setIsInteractionsComplete(true);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(runAfterInteractions);
        return () => {
            setIsInteractionsComplete(false);
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            // prevent loading on the following navigation
            if (isInteractionsComplete) {
                dispatch(MOVIE_ACTION.getTopSearchedMoviesStart({ is_for_kids: AUTH_PROFILE.is_for_kids }));
            }
            return () => {
                setSearchInput('');
                setShow(null);
                setIsVisibleMovieInfo(false);
            }
        }, [])
    );

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
    AUTH_PROFILE: authProfileSelector,
    MOVIE: movieSelector
});

export default connect(mapStateToProps)(SearchScreen)
