import ACTION_TYPES from './action.types';

const {
    GET_COMING_SOON_MOVIES_START,
    GET_COMING_SOON_MOVIES_SUCCESS,
    GET_COMING_SOON_MOVIES_FAILED,
    CREATE_COMING_SOON_MOVIE,
    DELETE_COMING_SOON_MOVIE_BY_ID
} = ACTION_TYPES;

const initialState = {
    comingSoonMovies: [],
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const {
        comingSoonMovies
    } = state; 

    const isLoading = false;
    const errors = [];

    switch (type) 
    {
        case GET_COMING_SOON_MOVIES_START:
            return { 
                ...state, 
                isLoading: true
            }

        case GET_COMING_SOON_MOVIES_SUCCESS:
            return { 
                ...state, 
                comingSoonMovies: payload.comingSoonMovies,
                isLoading,
                errors
            }

        case CREATE_COMING_SOON_MOVIE:
            return {
                ...state,
                comingSoonMovies: [ payload.comingSoonMovie, ...comingSoonMovies ], 
                isLoading,
                errors
            }

        case DELETE_COMING_SOON_MOVIE_BY_ID:
            return {
                ...state,
                comingSoonMovies: comingSoonMovies.filter(({ id }) => id !== payload.id), 
                isLoading,
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
