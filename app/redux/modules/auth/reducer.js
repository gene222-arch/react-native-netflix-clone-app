import ACTION_TYPES from './action.types';
import myList from './../../../services/data/myList';
import accountProfiles from './../../../services/data/accountProfiles';
import recentlyWatchedShows_ from './../../../services/data/recentlyWatchedShows';

const {
    ADD_TO_RECENT_WATCHES_START,
    ADD_TO_RECENT_WATCHES_SUCCESS,
    ADD_TO_RECENT_WATCHES_FAILED,
    RATE_SHOW_START,
    RATE_SHOW_SUCCESS,
    RATE_SHOW_FAILED,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    DOWNLOAD_VIDEO_START,
    DOWNLOAD_VIDEO_SUCCESS,
    DOWNLOAD_VIDEO_FAILED,
    SELECT_PROFILE_START,
    SELECT_PROFILE_SUCCESS,
    SELECT_PROFILE_FAILED,
    REMOVE_TO_RECENT_WATCHES_START,
    REMOVE_TO_RECENT_WATCHES_SUCCESS,
    REMOVE_TO_RECENT_WATCHES_FAILED,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED,
    TOGGLE_ADD_TO_MY_LIST_START,
    TOGGLE_ADD_TO_MY_LIST_SUCCESS,
    TOGGLE_ADD_TO_MY_LIST_FAILED,
} = ACTION_TYPES;


const CREDENTIALS_DEFAULT_PROPS = {
    email: '',
    password: '',
    remember_me: false
};

const PROFILE_DEFAULT_PROPS = {
    name: ''
};

const RATED_SHOWS_DEFAULT_PROPS = [
    {
        id: '',
        title: '',
        poster: '',
        rate: '',
        isRated: false
    }
]

const initialState = {
    isAuthenticated: false,
    credentials: CREDENTIALS_DEFAULT_PROPS,
    downloads: [],
    ratedShows: RATED_SHOWS_DEFAULT_PROPS,
    myList,
    profiles: accountProfiles,
    profile: PROFILE_DEFAULT_PROPS,
    recentlyWatchedShows: recentlyWatchedShows_,
    remindedComingSoonShows: [],
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const {
        myList,
        remindedComingSoonShows,
        ratedShows,
        downloads,
        profiles,
        recentlyWatchedShows
    } = state;

    const isLoading = true;
    const errors = [];

    switch (type) 
    {
        case ADD_TO_RECENT_WATCHES_START:
        case RATE_SHOW_START:
        case LOGIN_START:
        case LOGOUT_START:
        case DOWNLOAD_VIDEO_START:
        case REMOVE_TO_RECENT_WATCHES_START:
        case SELECT_PROFILE_START:
        case TOGGLE_ADD_TO_MY_LIST_START:
        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START:
            return { 
                ...state, 
                isLoading
            }

        case ADD_TO_RECENT_WATCHES_SUCCESS:
            return { 
                ...state,
                recentlyWatchedShows: [ ...recentlyWatchedShows, payload.show ],
                isLoading: false,
                errors
            }

        case ADD_TO_RECENT_WATCHES_FAILED:
            return { 
                ...state, 
                isLoading: false,
                errors: payload.message
            }

        case RATE_SHOW_SUCCESS:
            let newRatedShows = [];

            const ratedShowExists = ratedShows.findIndex(({ id }) => id === payload.show.id);

            if (ratedShowExists !== -1) 
            {
                newRatedShows = ratedShows.map((show) => {
                    if (show.id === payload.show.id) 
                    {
                        if (!show.isRated) {
                            return { ...show, isRated: true, rate: payload.rate };
                        }
        
                        if (show.isRated && show.rate !== payload.rate) {
                            return { ...show, rate: payload.rate };
                        }
                        else {
                            return { ...show, isRated: false, rate: '' };
                        }
                    }
    
                    return show;
                });
            }
            
            if (ratedShowExists === -1) {
                newRatedShows.push({ ...payload.show, isRated: true, rate: payload.rate });
            }

            return { 
                ...state,
                ratedShows: newRatedShows,
                isLoading: false,
                errors
            }

        case RATE_SHOW_FAILED:
            return { 
                ...state,
                isLoading: false,
                errors: payload.message
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

        case REMOVE_TO_RECENT_WATCHES_SUCCESS:
            return { 
                ...state,
                recentlyWatchedShows: recentlyWatchedShows.filter(({ id }) => id !== payload.showID),
                isLoading: false,
                errors
            }

        case REMOVE_TO_RECENT_WATCHES_FAILED:
            return { 
                ...state, 
                isLoading: false,
                errors: payload.message
            }

        case SELECT_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profile: profiles.find(({ id }) => id === payload.id),
                errors
            }

        case SELECT_PROFILE_FAILED:
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
