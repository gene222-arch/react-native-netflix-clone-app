import ACTION_TYPES from './action.types';

const {
    GET_USERS_START,
    GET_USERS_SUCCESS,
    GET_USERS_FAILED
} = ACTION_TYPES;

const initialState = {
    users: [],
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const isLoading = true;
    const errors = [];

    switch (type) 
    {
        case GET_USERS_START:
            return { 
                ...state, 
                isLoading
            }

        case GET_USERS_SUCCESS:
            return { 
                ...state, 
                users: payload.users,
                isLoading: false,
                errors
            }

        case GET_USERS_FAILED:
            return { 
                ...state, 
                isLoading: false,
                errors: payload.message
            }

        default:
            return state
    }
}
