import ACTION_TYPES from './action.types';
import myList from './../../../services/data/myList';

const {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    DOWNLOAD_VIDEO_START,
    DOWNLOAD_VIDEO_SUCCESS,
    DOWNLOAD_VIDEO_FAILED,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED,
    TOGGLE_ADD_TO_MY_LIST_START,
    TOGGLE_ADD_TO_MY_LIST_SUCCESS,
    TOGGLE_ADD_TO_MY_LIST_FAILED,
    TOGGLE_LIKE_SHOW_START,
    TOGGLE_LIKE_SHOW_SUCCESS,
    TOGGLE_LIKE_SHOW_FAILED
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

const LIKED_SHOWS_DEFAULT_PROPS = [
    {
        id: '',
        title: '',
        poster: ''
    }
]

const initialState = {
    isAuthenticated: false,
    credentials: CREDENTIALS_DEFAULT_PROPS,
    user: USER_DEFAULT_PROPS,
    myList,
    downloads: [],
    likedShows: LIKED_SHOWS_DEFAULT_PROPS,
    remindedComingSoonShows: [],
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const {
        myList,
        remindedComingSoonShows,
        likedShows,
        downloads,
    } = state;

    const isLoading = true;
    const errors = [];

    switch (type) 
    {
        case DOWNLOAD_VIDEO_START:
        case LOGIN_START:
        case LOGOUT_START:
        case TOGGLE_ADD_TO_MY_LIST_START:
        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START:
        case TOGGLE_LIKE_SHOW_START:
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

        case DOWNLOAD_VIDEO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                downloads: [ ...downloads, payload.show ],
                errors
            }

        case DOWNLOAD_VIDEO_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: payload.message
            }

        case TOGGLE_ADD_TO_MY_LIST_SUCCESS:

            let newMyList = [];

            const isAlreadyInList = myList.findIndex(({ id }) => id === payload.show.id); 
            newMyList = isAlreadyInList === -1 ? [ ...myList, payload.show ] : myList.filter(({ id }) => id !== payload.show.id);

            return {
                ...state,
                myList: newMyList,
                isLoading: false,
                errors
            }            

        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS:

            const { comingSoonShowID } = payload;
            const hasComingSoonShow = remindedComingSoonShows.includes(comingSoonShowID); 
            
            let remindedComingSoonShows_ = [];

            if (!hasComingSoonShow) {
                remindedComingSoonShows_ = [ ...remindedComingSoonShows, comingSoonShowID ];
            }
            else {
                remindedComingSoonShows_ = remindedComingSoonShows.filter(id => id !== comingSoonShowID);
            }

            return {
                ...state,
                remindedComingSoonShows: remindedComingSoonShows_,
                isLoading: false,
                errors
            }

        case TOGGLE_LIKE_SHOW_SUCCESS:
            let newLikedShows = [];

            const showExists = likedShows.findIndex(({id }) => id === payload.show.id); 
            newLikedShows = showExists === -1 ? [ ...likedShows, payload.show ] : likedShows.filter(({ id }) => id !== payload.show.id);

            return {
                ...state,
                likedShows: newLikedShows,
                isLoading: false,
                errors
            }

        case TOGGLE_LIKE_SHOW_FAILED: 
            return {
                ...state,
                isLoading: false,
                errors: payload.message
            }

        case TOGGLE_ADD_TO_MY_LIST_FAILED:
        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: payload.message
            }

        default:
            return state
    }
}
