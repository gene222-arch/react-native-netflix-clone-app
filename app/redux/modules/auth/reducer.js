import ACTION_TYPES from './action.types';

const {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED
} = ACTION_TYPES;

const USER_DEFAULT_PROPS = {
    first_name: 'Gene Phillip',
    last_name: 'Artista'
};

const initialState = {
    isAuthenticated: false,
    user: USER_DEFAULT_PROPS,
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const isLoading = true;
    const errors = [];

    switch (type) 
    {
        case LOGIN_START:
        case LOGIN_START:
            return { 
                ...state, 
                isLoading
            }

        case LOGIN_SUCCESS:
            return { 
                ...state, 
                isAuthenticated: true,
                isLoading: false,
                errors
            }

        case LOGIN_FAILED:
            return { 
                ...state, 
                isAuthenticated: false,
                isLoading: false,
                errors: payload.message
            }

        case LOGOUT_SUCCESS:
            return { 
                ...state, 
                isAuthenticated: false,
                isLoading: false,
                errors
            }

        case LOGOUT_FAILED:
            return { 
                ...state, 
                isAuthenticated: true,
                isLoading: false,
                errors: payload.message
            }

        default:
            return state
    }
}
