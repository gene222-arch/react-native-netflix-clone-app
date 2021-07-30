import ACTION_TYPES from './action.types';

const {
    GET_COMING_SOON_MOVIES_START,
    GET_COMING_SOON_MOVIES_SUCCESS,
    GET_COMING_SOON_MOVIES_FAILED
} = ACTION_TYPES;

export const getComingSoonMoviesStart = (payload) => ({
    type: GET_COMING_SOON_MOVIES_START,
    payload
});

/** Login */
export const getComingSoonMoviesSuccess = (payload) => ({
    type: GET_COMING_SOON_MOVIES_SUCCESS,
    payload
});

export const getComingSoonMoviesFailed = (payload) => ({
    type: GET_COMING_SOON_MOVIES_FAILED,
    payload
});
