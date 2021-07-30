import ACTION_TYPES from './action.types';

const {
    GET_COMING_SOON_MOVIES_START,
    GET_COMING_SOON_MOVIES_SUCCESS,
    GET_COMING_SOON_MOVIES_FAILED
} = ACTION_TYPES;

const initialState = {
    comingSoonMovies: [],
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const isLoading = true;
    const errors = [];

    switch (type) 
    {
        case GET_COMING_SOON_MOVIES_START:
            return { 
                ...state, 
                isLoading
            }

        case GET_COMING_SOON_MOVIES_SUCCESS:
            return { 
                ...state, 
                comingSoonMovies: payload.comingSoonMovies,
                isLoading: false,
                errors
            }

        case GET_COMING_SOON_MOVIES_FAILED:
            return { 
                ...state,
                isLoading: false,
                errors: payload.message
            }

        default:
            return state
    }
}
