import ACTION_TYPES from './action.types';

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
