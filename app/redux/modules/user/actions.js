import ACTION_TYPES from './action.types';

const {
    GET_USERS_START,
    GET_USERS_SUCCESS,
    GET_USERS_FAILED
} = ACTION_TYPES;

export const getUsersStart = (payload) => ({
    type: GET_USERS_START,
    payload
});

export const getUsersSuccess = (payload) => ({
    type: GET_USERS_SUCCESS,
    payload
});

export const getUsersFailed = (payload) => ({
    type: GET_USERS_FAILED,
    payload
});
