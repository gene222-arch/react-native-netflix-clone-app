import ACTION_TYPES from './action.types';

const {
    GET_COMING_SOON_MOVIES_START,
    GET_COMING_SOON_MOVIES_SUCCESS,
    GET_COMING_SOON_MOVIES_FAILED,
    CREATE_COMING_SOON_MOVIE,
    DELETE_COMING_SOON_MOVIE_BY_ID,
    INCREMENT_NEW_COMING_SOON_MOVIE_COUNT,
    VIEW_COMING_SOON_MOVIES
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

export const createComingSoonMovie = (payload) => ({
    type: CREATE_COMING_SOON_MOVIE,
    payload
});

export const deleteComingSoonMovieById = (payload) => ({
    type: DELETE_COMING_SOON_MOVIE_BY_ID,
    payload
});

 export const incrementComingSoonMovieCount = (payload) => ({
    type: INCREMENT_NEW_COMING_SOON_MOVIE_COUNT,
    payload
});

 export const viewComingSoonMovies = (payload) => ({
    type: VIEW_COMING_SOON_MOVIES,
    payload
});


