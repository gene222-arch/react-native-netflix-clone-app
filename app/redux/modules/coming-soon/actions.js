import ACTION_TYPES from './action.types';

const {
    GET_COMING_SOON_MOVIES_START,
    GET_COMING_SOON_MOVIES_SUCCESS,
    GET_COMING_SOON_MOVIES_FAILED,
    CREATE_COMING_SOON_MOVIE,
    DELETE_COMING_SOON_MOVIE_BY_ID,
    INCREMENT_NEW_COMING_SOON_MOVIE_COUNT,
    VIEW_COMING_SOON_MOVIES,
    INCREMENT_COMING_SOON_MOVIE_VIEWS_START,
    INCREMENT_COMING_SOON_MOVIE_VIEWS_SUCCESS,
    INCREMENT_COMING_SOON_MOVIE_VIEWS_FAILED,
    NOTIFY_MOVIE_RELEASE_START,
    NOTIFY_MOVIE_RELEASE_SUCCESS,
    NOTIFY_MOVIE_RELEASE_FAILED,
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

/** 
 * Increment comign soon movie views
 */
 export const incrementComingSoonMovieViewsStart = (payload) => ({
    type: INCREMENT_COMING_SOON_MOVIE_VIEWS_START,
    payload
});

export const incrementComingSoonMovieViewsSuccess = (payload) => ({
    type: INCREMENT_COMING_SOON_MOVIE_VIEWS_SUCCESS,
    payload
});

export const incrementComingSoonMovieViewsFailed = (payload) => ({
    type: INCREMENT_COMING_SOON_MOVIE_VIEWS_FAILED,
    payload
});

/** 
 * Notify movie release
 */
 export const notifyMovieReleaseStart = (payload) => ({
    type: NOTIFY_MOVIE_RELEASE_START,
    payload
});

export const notifyMovieReleaseSuccess = (payload) => ({
    type: NOTIFY_MOVIE_RELEASE_SUCCESS,
    payload
});

export const notifyMovieReleaseFailed = (payload) => ({
    type: NOTIFY_MOVIE_RELEASE_FAILED,
    payload
});
