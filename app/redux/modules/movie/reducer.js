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
    GET_LATEST_TWENTY_MOVIES_FAILED
} = ACTION_TYPES;

const initialState = {
    movies: [],
    categories: [],
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const isLoading = true;
    const errors = [];

    switch (type) 
    {
        case GET_CATEGORIZED_MOVIES_START:
        case GET_LATEST_TWENTY_MOVIES_START:
        case GET_MOVIES_START:
            return { 
                ...state, 
                isLoading
            }

        case GET_MOVIES_SUCCESS:
            return { 
                ...state, 
                movies: payload.movies,
                isLoading: false,
                errors
            }

        case GET_LATEST_TWENTY_MOVIES_SUCCESS:
            return { 
                ...state, 
                movies: payload.movies,
                isLoading: false,
                errors
            }

        case GET_CATEGORIZED_MOVIES_SUCCESS: 
            return {
                ...state, 
                categories: payload.categorizedMovies,
                isLoading: false,
                errors
            }

        case GET_CATEGORIZED_MOVIES_FAILED:
        case GET_LATEST_TWENTY_MOVIES_FAILED:
        case GET_MOVIES_FAILED:
            return { 
                ...state,
                isLoading: false,
                errors: payload.message
            }

        default:
            return state
    }
}
