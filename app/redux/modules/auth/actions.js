import ACTION_TYPES from './action.types';

const {
    ADD_TO_RECENT_WATCHES_START,
    ADD_TO_RECENT_WATCHES_SUCCESS,
    ADD_TO_RECENT_WATCHES_FAILED,
    CREATE_PROFILE_START,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAILED,
    DELETE_PROFILE_START,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAILED,
    DOWNLOAD_VIDEO_START,
    DOWNLOAD_VIDEO_SUCCESS,
    DOWNLOAD_VIDEO_FAILED,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    MANAGE_PIN_CODE_START,
    MANAGE_PIN_CODE_SUCCESS,
    MANAGE_PIN_CODE_FAILED,
    MARK_REMINDED_MOVIE_AS_READ_START,
    MARK_REMINDED_MOVIE_AS_READ_SUCCESS,
    MARK_REMINDED_MOVIE_AS_READ_FAILED,
    RATE_SHOW_START,
    RATE_SHOW_SUCCESS,
    RATE_SHOW_FAILED,
    RATE_RECENTLY_WATCHED_MOVIE_START,
    RATE_RECENTLY_WATCHED_MOVIE_SUCCESS,
    RATE_RECENTLY_WATCHED_MOVIE_FAILED,
    REMOVE_TO_MY_DOWNLOADS_START,
    REMOVE_TO_MY_DOWNLOADS_SUCCESS,
    REMOVE_TO_MY_DOWNLOADS_FAILED,
    REMOVE_TO_RECENT_WATCHES_START,
    REMOVE_TO_RECENT_WATCHES_SUCCESS,
    REMOVE_TO_RECENT_WATCHES_FAILED,
    CLEAR_RECENT_WATCHES_START,
    CLEAR_RECENT_WATCHES_SUCCESS,
    CLEAR_RECENT_WATCHES_FAILED,
    SELECT_PROFILE_START,
    SELECT_PROFILE_SUCCESS,
    SELECT_PROFILE_FAILED,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED,
    TOGGLE_ADD_TO_MY_LIST_START,
    TOGGLE_ADD_TO_MY_LIST_SUCCESS,
    TOGGLE_ADD_TO_MY_LIST_FAILED,
    UPDATE_AUTHENTICATED_PROFILE_START,
    UPDATE_AUTHENTICATED_PROFILE_SUCCESS,
    UPDATE_AUTHENTICATED_PROFILE_FAILED,
    UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_START,
    UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_SUCCESS,
    UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_FAILED,
    VIEW_DOWNLOADS_START,
    VIEW_DOWNLOADS_SUCCESS,
    VIEW_DOWNLOADS_FAILED,
    UPDATE_USER_PROFILE,
    CLEAR_ERRORS_PROPERTY
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

/** Create Profile */
export const createProfileStart = (payload) => ({
    type: CREATE_PROFILE_START,
    payload
});

export const createProfileSuccess = (payload) => ({
    type: CREATE_PROFILE_SUCCESS,
    payload
});

export const createProfileFailed = (payload) => ({
    type: CREATE_PROFILE_FAILED,
    payload
});

/** Delete Profile */
export const deleteProfileStart = (payload) => ({
    type: DELETE_PROFILE_START,
    payload
});

export const deleteProfileSuccess = (payload) => ({
    type: DELETE_PROFILE_SUCCESS,
    payload
});

export const deleteProfileFailed = (payload) => ({
    type: DELETE_PROFILE_FAILED,
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

/** Manage Pin Code */
export const managePinCodeStart = (payload) => ({
    type: MANAGE_PIN_CODE_START,
    payload
});

export const managePinCodeSuccess = (payload) => ({
    type: MANAGE_PIN_CODE_SUCCESS,
    payload
});

export const managePinCodeFailed = (payload) => ({
    type: MANAGE_PIN_CODE_FAILED,
    payload
});

/** Mark reminded movie as read */
export const markRemindedMovieAsReadStart = (payload) => ({
    type: MARK_REMINDED_MOVIE_AS_READ_START,
    payload
});

export const markRemindedMovieAsReadSuccess = (payload) => ({
    type: MARK_REMINDED_MOVIE_AS_READ_SUCCESS,
    payload
});

export const markRemindedMovieAsReadFailed = (payload) => ({
    type: MARK_REMINDED_MOVIE_AS_READ_FAILED,
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

/** Rate Recently Watched Movie */
export const rateRecentlyWatchedMovieStart = (payload) => ({
    type: RATE_RECENTLY_WATCHED_MOVIE_START,
    payload
});

export const rateRecentlyWatchedMovieSuccess = (payload) => ({
    type: RATE_RECENTLY_WATCHED_MOVIE_SUCCESS,
    payload
});

export const rateRecentlyWatchedMovieFailed = (payload) => ({
    type: RATE_RECENTLY_WATCHED_MOVIE_FAILED,
    payload
});

/** Remove to my downloads */
export const removeToMyDownloadsStart = (payload) => ({
    type: REMOVE_TO_MY_DOWNLOADS_START,
    payload
});

export const removeToMyDownloadsSuccess = (payload) => ({
    type: REMOVE_TO_MY_DOWNLOADS_SUCCESS,
    payload
});

export const removeToMyDownloadsFailed = (payload) => ({
    type: REMOVE_TO_MY_DOWNLOADS_FAILED,
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


/** Remove to recent watches nultiple*/
export const clearRecentWatchesStart = (payload) => ({
    type: CLEAR_RECENT_WATCHES_START,
    payload
});

export const clearRecentWatchesSuccess = (payload) => ({
    type: CLEAR_RECENT_WATCHES_SUCCESS,
    payload
});

export const clearRecentWatchesFailed = (payload) => ({
    type: CLEAR_RECENT_WATCHES_FAILED,
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

/** Update authenticated profile */
export const updateAuthenticatedProfileStart = (payload) => ({
    type: UPDATE_AUTHENTICATED_PROFILE_START,
    payload
});

export const updateAuthenticatedProfileSuccess = (payload) => ({
    type: UPDATE_AUTHENTICATED_PROFILE_SUCCESS,
    payload
});

export const updateAuthenticatedProfileFailed = (payload) => ({
    type: UPDATE_AUTHENTICATED_PROFILE_FAILED,
    payload
});


/** Update recently watched at position millis */
export const updateRecentlyWatchedAtPositionMillisStart = (payload) => ({
    type: UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_START,
    payload
});

export const updateRecentlyWatchedAtPositionMillisSuccess = (payload) => ({
    type: UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_SUCCESS,
    payload
});

export const updateRecentlyWatchedAtPositionMillisFailed = (payload) => ({
    type: UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_FAILED,
    payload
});


/** View downloads */
export const viewDownloadsStart = (payload) => ({
    type: VIEW_DOWNLOADS_START,
    payload
});

export const viewDownloadsSuccess = (payload) => ({
    type: VIEW_DOWNLOADS_SUCCESS,
    payload
});

export const viewDownloadsFailed = (payload) => ({
    type: VIEW_DOWNLOADS_FAILED,
    payload
});

export const updateUserProfile = (payload) => ({
    type: UPDATE_USER_PROFILE,
    payload
});

export const clearErrorProperty = (payload) => ({
    type: CLEAR_ERRORS_PROPERTY,
    payload
});