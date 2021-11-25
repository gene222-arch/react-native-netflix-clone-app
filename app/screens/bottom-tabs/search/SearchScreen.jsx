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


const DisplayList = ({ isLoading = false, searchInput = '', filteredMovies, defaultMovies, handlePressDisplayShowInfo }) => 
{
    return (
        !searchInput.length  
            ? <DefaultSearchList key={ String(isLoading) } movies={ defaultMovies } handlePressDisplayShowInfo={ handlePressDisplayShowInfo }/>
            : <OnSearchList key={ String(isLoading) } movies={ filteredMovies } handlePressDisplayShowInfo={ handlePressDisplayShowInfo }/>
    )
}

const SearchScreen = ({ AUTH_PROFILE, MOVIE, route }) => 
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
        setTimeout(() => dispatch(MOVIE_ACTION.incrementMovieSearchCountStart({ movieId: show.id })), 10)
    }

    const handleChangeSearchInput = useCallback((textInput) => 
    {
        setSearchInput(textInput);
        
        if (! textInput) {
            setMovies(MOVIE.movies);
        }
        else {  
            textInput = textInput.toLowerCase();

            let filteredList = [];

            const filterByTitles = MOVIE.movies
                .filter(({ title }) => title.toLowerCase().indexOf(textInput) !== -1)
                .sort((movieOne, movieTwo) => 
                {
                    const titleOne = movieOne.title.toLowerCase();
                    const titleTwo = movieTwo.title.toLowerCase();

                    if (titleOne < titleTwo) return -1;

                    if (titleTwo > titleOne) return 1;

                    return 0;
                });

            const filterByAuthors = MOVIE.movies.filter(({ authors }) => authors.split(',').find(author => author.indexOf(textInput) !== -1));
            const filterByGenres = MOVIE.movies.filter(({ genres }) => genres.split(',').find(genre => genre.indexOf(textInput) !== -1));

            filteredList = [
                ...filterByTitles,
                ...filterByAuthors,
                ...filterByGenres
            ];

            setMovies(filteredList);
        }
    }, [searchInput])

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
    }, [AUTH_PROFILE.id])

    useFocusEffect(
        useCallback(() => {
            setIsInteractionsComplete(true);
            return () => {
                setSearchInput('');
                setShow(null);
                setIsVisibleMovieInfo(false);
                setIsInteractionsComplete(false);
                setMovies(MOVIE.topSearches);
            }
        }, [])
    );

    if (! isInteractionsComplete) return <SearchScreenLoader />

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
                isLoading={ !isInteractionsComplete && MOVIE.isLoading }
                filteredMovies={ movies }
                defaultMovies={ MOVIE.topSearches } 
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
