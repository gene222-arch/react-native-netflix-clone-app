import ACTION_TYPES from './action.types';

const {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED
} = ACTION_TYPES;

const CREDENTIALS_DEFAULT_PROPS = {
    email: '',
    password: '',
    remember_me: false
};

const USER_DEFAULT_PROPS = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
};

const initialState = {
    isAuthenticated: false,
    credentials: CREDENTIALS_DEFAULT_PROPS,
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
        case LOGOUT_START:
            return { 
                ...state, 
                isLoading
            }

        case LOGIN_SUCCESS:
            return { 
                ...state, 
                credentials: payload.credentials,
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