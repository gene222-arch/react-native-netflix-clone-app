import ACTION_TYPES from './action.types';

const {
    GET_COMING_SOON_MOVIES_START,
    GET_COMING_SOON_MOVIES_SUCCESS,
    GET_COMING_SOON_MOVIES_FAILED,
    CREATE_COMING_SOON_MOVIE,
    DELETE_COMING_SOON_MOVIE_BY_ID,
    INCREMENT_NEW_COMING_SOON_MOVIE_COUNT
} = ACTION_TYPES;

/** 
 * Get coming soon movies
 */
export const getComingSoonMoviesStart = (payload) => ({
    type: GET_COMING_SOON_MOVIES_START,
    payload
});

export const getComingSoonMoviesSuccess = (payload) => ({
    type: GET_COMING_SOON_MOVIES_SUCCESS,
    payload
});

export const getComingSoonMoviesFailed = (payload) => ({
    type: GET_COMING_SOON_MOVIES_FAILED,
    payload
});


/**
 * Create coming soon movie
 */
export const createComingSoonMovie = (payload) => ({
    type: CREATE_COMING_SOON_MOVIE,
    payload
});


/**
 * Delete coming soon movie by id
 */
export const deleteComingSoonMovieById = (payload) => ({
    type: DELETE_COMING_SOON_MOVIE_BY_ID,
    payload
});


/**
 * Increment coming soon movie count
 */
 export const incrementComingSoonMovieCount = (payload) => ({
    type: INCREMENT_NEW_COMING_SOON_MOVIE_COUNT,
    payload
});


