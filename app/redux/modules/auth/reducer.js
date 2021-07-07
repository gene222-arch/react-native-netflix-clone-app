import ACTION_TYPES from './action.types';
import accountProfiles from './../../../services/data/accountProfiles';

const {
    ADD_TO_RECENT_WATCHES_START,
    ADD_TO_RECENT_WATCHES_SUCCESS,
    ADD_TO_RECENT_WATCHES_FAILED,
    CREATE_PROFILE_START,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAILED,
    DELETE_PROFILE_START,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAILED,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    DOWNLOAD_VIDEO_START,
    DOWNLOAD_VIDEO_SUCCESS,
    DOWNLOAD_VIDEO_FAILED,
    RATE_SHOW_START,
    RATE_SHOW_SUCCESS,
    RATE_SHOW_FAILED,
    REMOVE_TO_MY_DOWNLOADS_START,
    REMOVE_TO_MY_DOWNLOADS_SUCCESS,
    REMOVE_TO_MY_DOWNLOADS_FAILED,
    REMOVE_TO_RECENT_WATCHES_START,
    REMOVE_TO_RECENT_WATCHES_SUCCESS,
    REMOVE_TO_RECENT_WATCHES_FAILED,
    SELECT_PROFILE_START,
    SELECT_PROFILE_SUCCESS,
    SELECT_PROFILE_FAILED,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED,
    TOGGLE_ADD_TO_MY_LIST_START,
    TOGGLE_ADD_TO_MY_LIST_SUCCESS,
    TOGGLE_ADD_TO_MY_LIST_FAILED,
    UPDATE_AUTHENTICATED_PROFILE_START,
    UPDATE_AUTHENTICATED_PROFILE_SUCCESS,
    UPDATE_AUTHENTICATED_PROFILE_FAILED,
    VIEW_DOWNLOADS_START,
    VIEW_DOWNLOADS_SUCCESS,
    VIEW_DOWNLOADS_FAILED
} = ACTION_TYPES;


const CREDENTIALS_DEFAULT_PROPS = 
{
    id: 1,
    email: '',
    password: '',
    remember_me: false
};

const PROFILE_DEFAULT_PROPS = 
{
    id: '',
    name: '',
    email: '',
    profile_photo: '',
    my_downloads: [],
    recentlyWatchedShows: [] 
};

const RATED_SHOWS_DEFAULT_PROPS = 
[
    {
        id: '',
        title: '',
        poster: '',
        rate: '',
        isRated: false
    }
]

const initialState = 
{
    isAuthenticated: false,
    credentials: CREDENTIALS_DEFAULT_PROPS,
    profiles: accountProfiles,
    profile: PROFILE_DEFAULT_PROPS,
    ratedShows: RATED_SHOWS_DEFAULT_PROPS,
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const {
        profiles,
        profile,
    } = state;

    const SELECT_AUTHENTICATED_PROFILE = profiles.find(({ id }) => id === profile.id);
    const isLoading = false;
    const errors = [];
    let NEW_PROFILES = [];

    switch (type) 
    {
        case ADD_TO_RECENT_WATCHES_START:
        case CREATE_PROFILE_START:
        case DELETE_PROFILE_START:
        case DOWNLOAD_VIDEO_START:
        case LOGIN_START:
        case LOGOUT_START:
        case RATE_SHOW_START:
        case REMOVE_TO_MY_DOWNLOADS_START:
        case REMOVE_TO_RECENT_WATCHES_START:
        case SELECT_PROFILE_START:
        case TOGGLE_ADD_TO_MY_LIST_START:
        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START:
        case UPDATE_AUTHENTICATED_PROFILE_START:
        case VIEW_DOWNLOADS_START:
            return { 
                ...state, 
                isLoading: true,
                errors
            }

        case ADD_TO_RECENT_WATCHES_SUCCESS:

            const findShowIndex = SELECT_AUTHENTICATED_PROFILE.recently_watched_shows.findIndex(({ id }) => id === payload.show.id);

            /** The show already exists, remove and prepend it */
            if (findShowIndex !== -1) {
                SELECT_AUTHENTICATED_PROFILE.recently_watched_shows.splice(findShowIndex, 1);
                SELECT_AUTHENTICATED_PROFILE.recently_watched_shows.unshift(payload.show);
            }
            else {
                SELECT_AUTHENTICATED_PROFILE.recently_watched_shows.push(payload.show);
            }

            /** Update profiles */
            const profiles_ = profiles.map((prof) => (prof.id === profile.id) ? SELECT_AUTHENTICATED_PROFILE : prof);

            return { 
                ...state,
                profiles: profiles_,
                isLoading,
                errors
            }

        case CREATE_PROFILE_SUCCESS: 

            const newProfile = {
                ...payload.profile,
                my_downloads: [],
                recently_watched_shows: [],
                my_list: [],
                reminded_coming_soon_shows: [],
                liked_shows: [],
                has_new_downloads: false,
            }

            return {
                ...state,
                profiles: [ ...profiles, newProfile ],
                isLoading,
                errors
            }

        case DELETE_PROFILE_SUCCESS: 
            return {
                ...state,
                profiles: profiles.filter(({ id }) => id !== payload.profileID),
                isLoading,
                errors
            }

        case RATE_SHOW_SUCCESS:

            /** Update auth profile liked shows */
            let newLikedShows = [];
            let hasLikedShow = SELECT_AUTHENTICATED_PROFILE.liked_shows.findIndex(({ id }) => id === payload.show.id);

            if (hasLikedShow !== -1) {
                newLikedShows = SELECT_AUTHENTICATED_PROFILE.liked_shows.filter(({ id }) => id !== payload.show.id);
            }
            else {
                newLikedShows.push(payload.show);
            }

            /** Update auth profile recently watched shows shows */
            let recentlyWatchedShows_ = SELECT_AUTHENTICATED_PROFILE
                .recently_watched_shows.map((show) => {
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

            /** Update profiles */
            let newProfiles = profiles.map((prof) => {
                return (prof.id === profile.id) 
                    ? { ...prof, recently_watched_shows: recentlyWatchedShows_, liked_shows: newLikedShows } 
                    : prof;
            });

            return { 
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case LOGIN_SUCCESS:
            return { 
                ...state, 
                credentials: payload.credentials,
                isAuthenticated: true,
                isLoading,
                errors
            }

        case LOGIN_FAILED:
            return { 
                ...state, 
                isAuthenticated: false,
                isLoading,
                errors: payload.message
            }

        case LOGOUT_SUCCESS:
            return { 
                ...state, 
                isAuthenticated: false,
                isLoading,
                errors
            }

        case LOGOUT_FAILED:
            return { 
                ...state, 
                isAuthenticated: true,
                isLoading,
                errors: payload.message
            }

        case DOWNLOAD_VIDEO_SUCCESS:

            const updateProfileDownloads = profiles.map(({ id, my_downloads, ...profileInfo }) => {
                return (id === payload.profile.id)
                    ? { id, ...profileInfo, my_downloads: [ ...my_downloads, payload.show ], has_new_downloads: true }
                    : { id, my_downloads, ...profileInfo }
            });

            return {
                ...state,
                profiles: updateProfileDownloads,
                isLoading,
                errors
            }

        case REMOVE_TO_MY_DOWNLOADS_SUCCESS: 
            let filteredMyDownloads = SELECT_AUTHENTICATED_PROFILE
                .my_downloads
                .filter(({ id }) => id !== payload.showID);

            /** Update profiles */
            NEW_PROFILES = profiles.map((prof) => {
                return (prof.id === SELECT_AUTHENTICATED_PROFILE.id) 
                    ? { ...prof, my_downloads: filteredMyDownloads } 
                    : prof;
            });

            return {
                ...state,
                profiles: NEW_PROFILES,
                isLoading,
                errors
            }

        case REMOVE_TO_RECENT_WATCHES_SUCCESS:

            let filteredRecentlyWatchedShows = SELECT_AUTHENTICATED_PROFILE
                .recently_watched_shows
                .filter(({ id }) => id !== payload.showID);

            /** Update profiles */
            NEW_PROFILES = profiles.map((prof) => {
                return (prof.id === profile.id) 
                    ? { ...prof, recently_watched_shows: filteredRecentlyWatchedShows } 
                    : prof;
            });

            return { 
                ...state,
                profiles: NEW_PROFILES,
                isLoading,
                errors
            }

        case SELECT_PROFILE_SUCCESS:
            return {
                ...state,
                profile: profiles.find(({ id }) => id === payload.id),
                isLoading,
                errors
            }

        case TOGGLE_ADD_TO_MY_LIST_SUCCESS:

            const isAlreadyInList = SELECT_AUTHENTICATED_PROFILE.my_list.findIndex(({ id }) => id === payload.show.id); 

            let newMyList = (isAlreadyInList === -1) 
                ? [ ...SELECT_AUTHENTICATED_PROFILE.my_list, payload.show ] 
                : SELECT_AUTHENTICATED_PROFILE.my_list.filter(({ id }) => id !== payload.show.id);

            NEW_PROFILES = profiles.map((prof) => {
                return (prof.id === profile.id) 
                    ? { ...prof, my_list: newMyList } 
                    : prof;
            });
        
            return {
                ...state,
                profiles: NEW_PROFILES,
                isLoading,
                errors
            }            

        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS:
            
            let authProfileRemindedShows = SELECT_AUTHENTICATED_PROFILE.reminded_coming_soon_shows;

            if (authProfileRemindedShows.length) 
            {
                const indexOfShow = authProfileRemindedShows.findIndex(({ id }) => id === payload.show.id); 
                
                for (let index = 0; index < authProfileRemindedShows.length; index++) 
                {
                    if (indexOfShow === -1) {
                        authProfileRemindedShows.push(payload.show);
                    } else {
                        authProfileRemindedShows.splice(indexOfShow, 1);
                    }
                }
            }
            else {
                authProfileRemindedShows.push(payload.show);
            }

            NEW_PROFILES = profiles.map((prof) => {
                return (prof.id === profile.id) 
                    ? { ...prof, reminded_coming_soon_shows: authProfileRemindedShows } 
                    : prof;
            });

            return {
                ...state,
                profiles: NEW_PROFILES,
                isLoading,
                errors
            }

        case UPDATE_AUTHENTICATED_PROFILE_SUCCESS: 

            NEW_PROFILES = profiles.map(prevProfile => {
                return prevProfile.id === payload.profile.id 
                    ? { ...prevProfile, ...payload.profile }
                    : prevProfile
            });

            return {
                ...state,
                profiles: NEW_PROFILES,
                isLoading,
                errors
            }

        case VIEW_DOWNLOADS_SUCCESS: 

            NEW_PROFILES = profiles.map((prof) => {
                return (prof.id === profile.id) 
                    ? { ...prof, has_new_downloads: false } 
                    : prof;
            });

            return {
                ...state,
                profiles: NEW_PROFILES,
                isLoading,
                errors
            }

        case ADD_TO_RECENT_WATCHES_FAILED:
        case CREATE_PROFILE_FAILED:
        case DELETE_PROFILE_FAILED:
        case DOWNLOAD_VIDEO_FAILED:
        case SELECT_PROFILE_FAILED:
        case RATE_SHOW_FAILED:
        case REMOVE_TO_MY_DOWNLOADS_FAILED:
        case REMOVE_TO_RECENT_WATCHES_FAILED:
        case TOGGLE_ADD_TO_MY_LIST_FAILED:
        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED:
        case UPDATE_AUTHENTICATED_PROFILE_FAILED:
        case VIEW_DOWNLOADS_FAILED:
            return {
                ...state,
                isLoading,
                errors: payload.message
            }

        default:
            return state
    }
}
