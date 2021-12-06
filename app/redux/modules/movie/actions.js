import ACTION_TYPES from './action.types';

const {
    CREATE_MOVIE,
    GET_CATEGORIZED_MOVIES_START,
    GET_CATEGORIZED_MOVIES_SUCCESS,
    GET_CATEGORIZED_MOVIES_FAILED,
    GET_MOVIES_START,
    GET_MOVIES_SUCCESS,
    GET_MOVIES_FAILED,
    GET_MOVIE_NOTIFICATIONS_START,
    GET_MOVIE_NOTIFICATIONS_SUCCESS,
    GET_MOVIE_NOTIFICATIONS_FAILED,
    GET_LATEST_TWENTY_MOVIES_START,
    GET_LATEST_TWENTY_MOVIES_SUCCESS,
    GET_LATEST_TWENTY_MOVIES_FAILED,
    GET_TOP_SEARCHED_MOVIES_START,
    GET_TOP_SEARCHED_MOVIES_SUCCESS,
    GET_TOP_SEARCHED_MOVIES_FAILED,
    GET_MOST_LIKED_MOVIES_START,
    GET_MOST_LIKED_MOVIES_SUCCESS,
    GET_MOST_LIKED_MOVIES_FAILED,
    INCREMENT_MOVIE_VIEWS_START,
    INCREMENT_MOVIE_VIEWS_SUCCESS,
    INCREMENT_MOVIE_VIEWS_FAILED,
    INCREMENT_MOVIE_SEARCH_COUNT_START,
    INCREMENT_MOVIE_SEARCH_COUNT_SUCCESS,
    INCREMENT_MOVIE_SEARCH_COUNT_FAILED,
} = ACTION_TYPES;

/** 
 * Create Movie
 */
export const createMovie = (payload) => ({
    type: CREATE_MOVIE,
    payload
});

/** 
 * Get categorized movies
 */
export const getCategorizedMoviesStart = (payload) => ({
    type: GET_CATEGORIZED_MOVIES_START,
    payload
});

export const getCategorizedMoviesSuccess = (payload) => ({
    type: GET_CATEGORIZED_MOVIES_SUCCESS,
    payload
});

export const getCategorizedMoviesFailed = (payload) => ({
    type: GET_CATEGORIZED_MOVIES_FAILED,
    payload
});

/** 
 * Get movies
 */
export const getMoviesStart = (payload) => ({
    type: GET_MOVIES_START,
    payload
});

export const getMoviesSuccess = (payload) => ({
    type: GET_MOVIES_SUCCESS,
    payload
});

export const getMoviesFailed = (payload) => ({
    type: GET_MOVIES_FAILED,
    payload
});

/** 
 * Get movies notifications
 */
 export const getMovieNotificationsStart = (payload) => ({
    type: GET_MOVIE_NOTIFICATIONS_START,
    payload
});

export const getMovieNotificationsSuccess = (payload) => ({
    type: GET_MOVIE_NOTIFICATIONS_SUCCESS,
    payload
});

export const getMovieNotificationsFailed = (payload) => ({
    type: GET_MOVIE_NOTIFICATIONS_FAILED,
    payload
});

/** 
 * Get latest twenty movies
 */
export const getLatestTwentyMoviesStart = (payload) => ({
    type: GET_LATEST_TWENTY_MOVIES_START,
    payload
});

export const getLatestTwentyMoviesSuccess = (payload) => ({
    type: GET_LATEST_TWENTY_MOVIES_SUCCESS,
    payload
});

export const getLatestTwentyMoviesFailed = (payload) => ({
    type: GET_LATEST_TWENTY_MOVIES_FAILED,
    payload
});


/** 
 * Get top searched movies
 */
export const getTopSearchedMoviesStart = (payload) => ({
    type: GET_TOP_SEARCHED_MOVIES_START,
    payload
});

export const getTopSearchedMoviesSuccess = (payload) => ({
    type: GET_TOP_SEARCHED_MOVIES_SUCCESS,
    payload
});

export const getTopSearchedMoviesFailed = (payload) => ({
    type: GET_TOP_SEARCHED_MOVIES_FAILED,
    payload
});

/** 
 * Get most liked movies
 */
export const getMostLikedMoviesStart = (payload) => ({
    type: GET_MOST_LIKED_MOVIES_START,
    payload
});

export const getMostLikedMoviesSuccess = (payload) => ({
    type: GET_MOST_LIKED_MOVIES_SUCCESS,
    payload
});

export const getMostLikedMoviesFailed = (payload) => ({
    type: GET_MOST_LIKED_MOVIES_FAILED,
    payload
});


/** 
 * Increment movie views
 */
export const incrementMovieViewsStart = (payload) => ({
    type: INCREMENT_MOVIE_VIEWS_START,
    payload
});

export const incrementMovieViewsSuccess = (payload) => ({
    type: INCREMENT_MOVIE_VIEWS_SUCCESS,
    payload
});

export const incrementMovieViewsFailed = (payload) => ({
    type: INCREMENT_MOVIE_VIEWS_FAILED,
    payload
});

/** 
 * Increment movie views
 */
export const incrementMovieSearchCountStart = (payload) => ({
    type: INCREMENT_MOVIE_SEARCH_COUNT_START,
    payload
});

export const incrementMovieSearchCountSuccess = (payload) => ({
    type: INCREMENT_MOVIE_SEARCH_COUNT_SUCCESS,
    payload
});

export const incrementMovieSearchCountFailed = (payload) => ({
    type: INCREMENT_MOVIE_SEARCH_COUNT_FAILED,
    payload
});
