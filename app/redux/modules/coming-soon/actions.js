import ACTION_TYPES from './action.types';

const {
    GET_COMING_SOON_SHOWS_START,
    GET_COMING_SOON_SHOWS_SUCCESS,
    GET_COMING_SOON_SHOWS_FAILED
} = ACTION_TYPES;

export const getComingSoonShowsStart = (payload) => ({
    type: GET_COMING_SOON_SHOWS_START,
    payload
});

/** Login */
export const getComingSoonShowsSuccess = (payload) => ({
    type: GET_COMING_SOON_SHOWS_SUCCESS,
    payload
});

export const getComingSoonShowsFailed = (payload) => ({
    type: GET_COMING_SOON_SHOWS_FAILED,
    payload
});
