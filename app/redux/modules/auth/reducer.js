import ACTION_TYPES from './action.types';
import myList from './../../../services/data/myList';

const {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED,
    TOGGLE_ADD_TO_MY_LIST_START,
    TOGGLE_ADD_TO_MY_LIST_SUCCESS,
    TOGGLE_ADD_TO_MY_LIST_FAILED
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
    myList,
    remindedComingSoonShows: [],
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const {
        myList,
        remindedComingSoonShows,
    } = state;

    const isLoading = true;
    const errors = [];

    switch (type) 
    {
        case LOGIN_START:
        case LOGOUT_START:
        case TOGGLE_ADD_TO_MY_LIST_START:
        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START:
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

        case TOGGLE_ADD_TO_MY_LIST_SUCCESS:

            let newMyList = [];
            const { show } = payload;

            const isAlreadyInList = myList.find(list => list.id === show.id); 

            if (!isAlreadyInList) {
                newMyList = [ ...myList, show ];
            }
            else {
                newMyList = myList.filter(({ id }) => id !== show.id);
            }

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
