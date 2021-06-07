import ACTION_TYPES from './action.types';
import movieAPI from './../../../services/data/movies';

const {
    GET_MOVIES_START,
    GET_MOVIES_SUCCESS,
    GET_MOVIES_FAILED
} = ACTION_TYPES;

const initialState = {
    movies: movieAPI,
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const isLoading = true;
    const errors = [];

    switch (type) 
    {
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
