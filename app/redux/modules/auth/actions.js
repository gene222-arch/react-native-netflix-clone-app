import ACTION_TYPES from './action.types';

const {
    ADD_TO_RECENT_WATCHES_START,
    ADD_TO_RECENT_WATCHES_SUCCESS,
    ADD_TO_RECENT_WATCHES_FAILED,
    DOWNLOAD_VIDEO_START,
    DOWNLOAD_VIDEO_SUCCESS,
    DOWNLOAD_VIDEO_FAILED,
    RATE_SHOW_START,
    RATE_SHOW_SUCCESS,
    RATE_SHOW_FAILED,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    REMOVE_TO_RECENT_WATCHES_START,
    REMOVE_TO_RECENT_WATCHES_SUCCESS,
    REMOVE_TO_RECENT_WATCHES_FAILED,
    SELECT_PROFILE_START,
    SELECT_PROFILE_SUCCESS,
    SELECT_PROFILE_FAILED,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED,
    TOGGLE_ADD_TO_MY_LIST_START,
    TOGGLE_ADD_TO_MY_LIST_SUCCESS,
    TOGGLE_ADD_TO_MY_LIST_FAILED,
} = ACTION_TYPES;


/** Add to recent watches */
export const addToRecentWatchesStart = (payload) => ({
    type: ADD_TO_RECENT_WATCHES_START,
    payload
});

export const addToRecentWatchesSuccess = (payload) => ({
    type: ADD_TO_RECENT_WATCHES_SUCCESS,
    payload
});

export const addToRecentWatchesFailed = (payload) => ({
    type: ADD_TO_RECENT_WATCHES_FAILED,
    payload
});

/** Rate show */
export const rateShowStart = (payload) => ({
    type: RATE_SHOW_START,
    payload
});

export const rateShowSuccess = (payload) => ({
    type: RATE_SHOW_SUCCESS,
    payload
});

export const rateShowFailed = (payload) => ({
    type: RATE_SHOW_FAILED,
    payload
});

/** Login */
export const loginStart = (payload) => ({
    type: LOGIN_START,
    payload
});

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


/** Downloads */
export const downloadVideoStart = (payload) => ({
    type: DOWNLOAD_VIDEO_START,
    payload
});

export const downloadVideoSuccess = (payload) => ({
    type: DOWNLOAD_VIDEO_SUCCESS,
    payload
});

export const downloadVideoFailed = (payload) => ({
    type: DOWNLOAD_VIDEO_FAILED,
    payload
});

/** Remove to recent watches */
export const removeToRecentWatchesStart = (payload) => ({
    type: REMOVE_TO_RECENT_WATCHES_START,
    payload
});

export const removeToRecentWatchesSuccess = (payload) => ({
    type: REMOVE_TO_RECENT_WATCHES_SUCCESS,
    payload
});

export const removeToRecentWatchesFailed = (payload) => ({
    type: REMOVE_TO_RECENT_WATCHES_FAILED,
    payload
});

/** Select profile */
export const selectProfileStart = (payload) => ({
    type: SELECT_PROFILE_START,
    payload
});

export const selectProfileSuccess = (payload) => ({
    type: SELECT_PROFILE_SUCCESS,
    payload
});

export const selectProfileFailed = (payload) => ({
    type: SELECT_PROFILE_FAILED,
    payload
});

/** Remind me of coming soon show */
export const toggleRemindMeOfComingShowStart = (payload) => ({
    type: TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    payload
});

export const toggleRemindMeOfComingShowSuccess = (payload) => ({
    type: TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS,
    payload
});

export const toggleRemindMeOfComingShowFailed = (payload) => ({
    type: TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED,
    payload
});

/** Toggle add to my list */
export const toggleAddToMyListStart = (payload) => ({
    type: TOGGLE_ADD_TO_MY_LIST_START,
    payload
});

export const toggleAddToMyListSuccess = (payload) => ({
    type: TOGGLE_ADD_TO_MY_LIST_SUCCESS,
    payload
});

export const toggleAddToMyListFailed = (payload) => ({
    type: TOGGLE_ADD_TO_MY_LIST_FAILED,
    payload
});
