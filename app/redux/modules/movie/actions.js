import ACTION_TYPES from './action.types';

const {
    GET_MOVIES_START,
    GET_MOVIES_SUCCESS,
    GET_MOVIES_FAILED
} = ACTION_TYPES;

export const getMoviesStart = (payload) => ({
    type: GET_MOVIES_START,
    payload
});

/** Login */
export const getMoviesSuccess = (payload) => ({
    type: GET_MOVIES_SUCCESS,
    payload
});

export const getMoviesFailed = (payload) => ({
    type: GET_MOVIES_FAILED,
    payload
});
