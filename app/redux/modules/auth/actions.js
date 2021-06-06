import ACTION_TYPES from './action.types';

const {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED
} = ACTION_TYPES;

export const loginStart = (payload) => ({
    type: LOGIN_START,
    payload
});

/** Login */
export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
});

export const loginFailed = (payload) => ({
    type: LOGIN_FAILED,
    payload
});

/** Logout */
export const logoutStart = (payload) => ({
    type: LOGOUT_START,
    payload
});

export const logoutSuccess = (payload) => ({
    type: LOGOUT_SUCCESS,
    payload
});

export const logoutFailed = (payload) => ({
    type: LOGOUT_FAILED,
    payload
});
