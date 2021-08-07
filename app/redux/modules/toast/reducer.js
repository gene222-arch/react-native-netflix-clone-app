import ACTION_TYPES from './action.types';

const {
    CREATE_TOAST_MESSAGE
} = ACTION_TYPES;

const initialState = {
    message: '',
    toastAndroid: 'SHORT'
}

export default (state = initialState, { type, payload }) => 
{
    switch (type) 
    {
        case CREATE_TOAST_MESSAGE:
            return { 
                ...state, 
                message: payload.message,
                toastAndroid: payload.toastAndroid
            }

        default:
            return state
    }
}
