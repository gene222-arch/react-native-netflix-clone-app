import ACTION_TYPES from './action.types';

const {
    GET_COMING_SOON_MOVIES_START,
    GET_COMING_SOON_MOVIES_SUCCESS,
    GET_COMING_SOON_MOVIES_FAILED,
    CREATE_COMING_SOON_MOVIE,
    DELETE_COMING_SOON_MOVIE_BY_ID,
    INCREMENT_NEW_COMING_SOON_MOVIE_COUNT,
    VIEW_COMING_SOON_MOVIES,
    INCREMENT_COMING_SOON_MOVIE_VIEWS_START,
    INCREMENT_COMING_SOON_MOVIE_VIEWS_SUCCESS,
    INCREMENT_COMING_SOON_MOVIE_VIEWS_FAILED
} = ACTION_TYPES;

const initialState = {
    comingSoonMovies: [],
    totalUpcomingMovies: 0,
    isLoading: false,
    errors: []
};

export default (state = initialState, { type, payload }) => 
{
    const isLoading = false;
    const errors = [];

    switch (type) 
    {
        case GET_COMING_SOON_MOVIES_START:
        case INCREMENT_COMING_SOON_MOVIE_VIEWS_START:
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
            const newComingSoonMovie = payload.comingSoonMovie;
            const newComingSoonMovies = !state.comingSoonMovies ? [ newComingSoonMovie ] : [ newComingSoonMovie, ...state.comingSoonMovies ];
    
            return {
                ...state,
                comingSoonMovies: newComingSoonMovies, 
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

        case INCREMENT_NEW_COMING_SOON_MOVIE_COUNT:
            return {
                ...state,
                totalUpcomingMovies: state.totalUpcomingMovies + 1
            }

        case INCREMENT_COMING_SOON_MOVIE_VIEWS_SUCCESS:
            return {
                ...state,
                isLoading,
                errors
            }

        case VIEW_COMING_SOON_MOVIES:
            return {
                ...state,
                totalUpcomingMovies: 0,
                isLoading
            }

        case INCREMENT_COMING_SOON_MOVIE_VIEWS_FAILED:
        case GET_COMING_SOON_MOVIES_FAILED:
            return { 
                ...state,
                isLoading,
                errors: payload.message
            }

        default:
            return state
    }
}
