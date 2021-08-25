import ACTION_TYPES from './action.types';
import movieAPI from './../../../services/data/movies';

const {
    CREATE_MOVIE,
    GET_CATEGORIZED_MOVIES_START,
    GET_CATEGORIZED_MOVIES_SUCCESS,
    GET_CATEGORIZED_MOVIES_FAILED,
    GET_MOVIES_START,
    GET_MOVIES_SUCCESS,
    GET_MOVIES_FAILED,
    GET_LATEST_TWENTY_MOVIES_START,
    GET_LATEST_TWENTY_MOVIES_SUCCESS,
    GET_LATEST_TWENTY_MOVIES_FAILED,
    GET_TOP_SEARCHED_MOVIES_START,
    GET_TOP_SEARCHED_MOVIES_SUCCESS,
    GET_TOP_SEARCHED_MOVIES_FAILED,
    INCREMENT_MOVIE_VIEWS_START,
    INCREMENT_MOVIE_VIEWS_SUCCESS,
    INCREMENT_MOVIE_VIEWS_FAILED,
    INCREMENT_MOVIE_SEARCH_COUNT_START,
    INCREMENT_MOVIE_SEARCH_COUNT_SUCCESS,
    INCREMENT_MOVIE_SEARCH_COUNT_FAILED,
} = ACTION_TYPES;

const CATEGORY_DEFAULT_PROPS = [
    {
        title: '',
        movies: []
    }
];

const initialState = {
    movies: [],
    categories: CATEGORY_DEFAULT_PROPS,
    topSearches: [],
    isLoading: false,
    errors: null
}

export default (state = initialState, { type, payload }) => 
{
    const isLoading = false;
    const errors = null;

    switch (type) 
    {
        case GET_CATEGORIZED_MOVIES_START:
        case INCREMENT_MOVIE_SEARCH_COUNT_START:
        case INCREMENT_MOVIE_VIEWS_START:
        case GET_LATEST_TWENTY_MOVIES_START:
        case GET_TOP_SEARCHED_MOVIES_START:
        case GET_MOVIES_START:
            return { 
                ...state, 
                isLoading: true
            }

        case CREATE_MOVIE:
            const newCategories = state
                .categories
                .map(category => {
                    return category.title === 'Recently Added Movies'
                            ? { ...category, movies: [ payload.movie, ...category.movies ] }
                            : category;
                });

            return {
                ...state,
                categories: newCategories,
                isLoading: false,
                errors
            }

        case INCREMENT_MOVIE_SEARCH_COUNT_SUCCESS:
            return {
                ...state,
                isLoading,
                errors
            }

        case GET_MOVIES_SUCCESS:
            return { 
                ...state, 
                movies: payload.movies,
                isLoading,
                errors
            }

        case GET_LATEST_TWENTY_MOVIES_SUCCESS:
            return { 
                ...state, 
                movies: payload.movies,
                isLoading,
                errors
            }

        case GET_TOP_SEARCHED_MOVIES_SUCCESS:
            return {
                ...state,
                topSearches: payload.movies,
                isLoading,
                errors
            }

        case GET_CATEGORIZED_MOVIES_SUCCESS: 
            return {
                ...state, 
                categories: payload.categorizedMovies,
                isLoading,
                errors
            }

        case INCREMENT_MOVIE_VIEWS_SUCCESS:
            return {
                ...state,
                isLoading,
                errors
            }

        case INCREMENT_MOVIE_SEARCH_COUNT_FAILED:
        case INCREMENT_MOVIE_VIEWS_FAILED:
        case GET_CATEGORIZED_MOVIES_FAILED:
        case GET_LATEST_TWENTY_MOVIES_FAILED:
        case GET_MOVIES_FAILED:
        case GET_TOP_SEARCHED_MOVIES_FAILED:
            return { 
                ...state,
                isLoading,
                errors: payload.message
            }

        default:
            return state
    }
}
