import ACTION_TYPES from './action.types';

const {
    GET_COMING_SOON_SHOWS_START,
    GET_COMING_SOON_SHOWS_SUCCESS,
    GET_COMING_SOON_SHOWS_FAILED
} = ACTION_TYPES;

const initialState = {
    comingSoonShows: [],
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const isLoading = true;
    const errors = [];

    switch (type) 
    {
        case GET_COMING_SOON_SHOWS_START:
            return { 
                ...state, 
                isLoading
            }

        case GET_COMING_SOON_SHOWS_SUCCESS:
            return { 
                ...state, 
                comingSoonShows: payload.comingSoonShows,
                isLoading: false,
                errors
            }

        case GET_COMING_SOON_SHOWS_FAILED:
            return { 
                ...state,
                isLoading: false,
                errors: payload.message
            }

        default:
            return state
    }
}
