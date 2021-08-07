import ACTION_TYPES from './action.types';

const {
    CREATE_TOAST_MESSAGE
} = ACTION_TYPES;

export const createToastMessageStart = (payload) => ({
    type: CREATE_TOAST_MESSAGE,
    payload
});

