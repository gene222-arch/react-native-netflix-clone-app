import ACTION_TYPES from './action.types';
import movieAPI from './../../../services/data/movies';

const {
    GET_CATEGORIZED_MOVIES_START,
    GET_CATEGORIZED_MOVIES_SUCCESS,
    GET_CATEGORIZED_MOVIES_FAILED,
    GET_MOVIES_START,
    GET_MOVIES_SUCCESS,
    GET_MOVIES_FAILED,
    GET_LATEST_TWENTY_MOVIES_START,
    GET_LATEST_TWENTY_MOVIES_SUCCESS,
    GET_LATEST_TWENTY_MOVIES_FAILED,
    INCREMENT_MOVIE_VIEWS_START,
    INCREMENT_MOVIE_VIEWS_SUCCESS,
    INCREMENT_MOVIE_VIEWS_FAILED
} = ACTION_TYPES;

const initialState = {
    movies: [],
    categories: [],
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const isLoading = false;
    const errors = [];

    switch (type) 
    {
        case GET_CATEGORIZED_MOVIES_START:
        case INCREMENT_MOVIE_VIEWS_START:
        case GET_LATEST_TWENTY_MOVIES_START:
        case GET_MOVIES_START:
            return { 
                ...state, 
                isLoading: true
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

        case GET_CATEGORIZED_MOVIES_FAILED:
        case GET_LATEST_TWENTY_MOVIES_FAILED:
        case GET_MOVIES_FAILED:
        case INCREMENT_MOVIE_VIEWS_FAILED:
            return { 
                ...state,
                isLoading,
                errors: payload.message
            }

        default:
            return state
    }
}
