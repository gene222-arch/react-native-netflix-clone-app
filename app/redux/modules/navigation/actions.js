import ACTION_TYPES from './action.types';

const {
    TOGGLE_TAB_BAR_START,
    TOGGLE_TAB_BAR_SUCCESS,
    TOGGLE_TAB_BAR_FAILED
} = ACTION_TYPES;

export const toggleTabBarStart = (payload) => ({
    type: TOGGLE_TAB_BAR_START,
    payload
});

export const toggleTabBarSuccess = (payload) => ({
    type: TOGGLE_TAB_BAR_SUCCESS,
    payload
});

export const toggleTabBarFailed = (payload) => ({
    type: TOGGLE_TAB_BAR_FAILED,
    payload
});
