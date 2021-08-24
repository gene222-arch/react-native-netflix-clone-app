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
    RATE_RECENTLY_WATCHED_MOVIE_START,
    RATE_RECENTLY_WATCHED_MOVIE_SUCCESS,
    RATE_RECENTLY_WATCHED_MOVIE_FAILED,
    CLEAR_RECENT_WATCHES_START,
    CLEAR_RECENT_WATCHES_SUCCESS,
    CLEAR_RECENT_WATCHES_FAILED,
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
    VIEW_DOWNLOADS_FAILED,
    CLEAR_ERRORS_PROPERTY
} = ACTION_TYPES;


const CREDENTIALS_DEFAULT_PROPS = {
    id: '',
    email: '',
    password: '',
    remember_me: false
};

const PROFILE_DEFAULT_PROPS = {
    id: '',
    name: '',
    email: '',
    avatar: null,
    is_for_kids: false,
    my_downloads: [],
    recently_watched_shows: [],
    my_list: [],
    reminded_coming_soon_movies: [],
    liked_movies: [],
    liked_coming_soon_movies: [],
    has_new_downloads: false,
};

const DEFAULT_ERROR_MESSAGE_PROPS = {
    name: '',
    password: '',
    email: '',
    avatar: '',
}

const initialState = {
    auth: null,
    credentials: CREDENTIALS_DEFAULT_PROPS,
    profile: PROFILE_DEFAULT_PROPS,
    profiles: [],
    isAuthenticated: false,
    isLoading: false,
    errors: DEFAULT_ERROR_MESSAGE_PROPS
}

export default (state = initialState, { type, payload }) => 
{
    const { profiles, profile } = state;

    const isLoading = false;
    const errors = DEFAULT_ERROR_MESSAGE_PROPS;
    const loggedInProfile = profiles.find(profil => profil.id === profile.id);
    let newProfiles = [];

    switch (type) 
    {
        case ADD_TO_RECENT_WATCHES_START:
        case CREATE_PROFILE_START:
        case DELETE_PROFILE_START:
        case DOWNLOAD_VIDEO_START:
        case LOGIN_START:
        case LOGOUT_START:
        case RATE_SHOW_START:
        case RATE_RECENTLY_WATCHED_MOVIE_START:
        case CLEAR_RECENT_WATCHES_START:
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

            const { movie } = payload;
            const movieIndex = loggedInProfile.recently_watched_shows.findIndex(({ id }) => id === movie.id);

            const movie_ = { ...movie, user_ratings: [] };

            if (movieIndex === -1) {
                loggedInProfile.recently_watched_shows.unshift(movie_);
            }
            
            if (movieIndex !== -1) {
                loggedInProfile.recently_watched_shows.splice(movieIndex, 1);
                loggedInProfile.recently_watched_shows.unshift(movie_);
            }

            newProfiles = profiles.map(prof => (prof.id === loggedInProfile.id) ? loggedInProfile : prof);

            return { 
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case CREATE_PROFILE_SUCCESS: 

            const newProfile = {
                ...PROFILE_DEFAULT_PROPS,
                ...payload.profile,
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
            let newLikedShows = [];
            
            let isMovieLiked = loggedInProfile.liked_shows.find(({ id }) => id === payload.show.id);

            if (! isMovieLiked) {
                newLikedShows.push(payload.show);
            }
            else {
                newLikedShows = loggedInProfile.liked_shows.filter(({ id }) => id !== payload.show.id);
            }

            newProfiles = profiles.map(prof => {
                return (prof.id === loggedInProfile.id) 
                    ? { ...prof, liked_shows: newLikedShows } 
                    : prof;
            });

            return { 
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case RATE_RECENTLY_WATCHED_MOVIE_SUCCESS:
            let newLikedShows_ = [];
            
            let isMovieLiked_ = loggedInProfile.liked_shows.find(({ id }) => id === payload.show.id);

            if (isMovieLiked_) {
                newLikedShows_.push(payload.show);
            }

            if (! isMovieLiked) {
                newLikedShows_ = loggedInProfile.liked_shows.filter(({ id }) => id !== payload.show.id);
            }

            let recentlyWatchedMovies = loggedInProfile
                .recently_watched_shows.map(show => {
                    if (show.id === payload.show.id) 
                    {
                        if (! show.isRated) {
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

            newProfiles = profiles.map(prof => {
                return (prof.id === loggedInProfile.id) 
                    ? { ...prof, recently_watched_shows: recentlyWatchedMovies, liked_shows: newLikedShows_ } 
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
                auth: payload.auth,
                profiles: payload.profiles.map(profile => ({ ...PROFILE_DEFAULT_PROPS, ...profile })),
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
                auth: null,
                profiles: [],
                profile: PROFILE_DEFAULT_PROPS,
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
            const updateProfileDownloads = profiles.map(prof => {
                return (prof.id === payload.profile.id)
                    ? { 
                        ...prof, 
                        my_downloads: [ ...prof.my_downloads, payload.show ], 
                        has_new_downloads: true 
                    }
                    : prof
            });

            return {
                ...state,
                profiles: updateProfileDownloads,
                isLoading,
                errors
            }

        case CLEAR_RECENT_WATCHES_SUCCESS:
            newProfiles = profiles.map(prof => {
                return (prof.id === loggedInProfile.id)
                    ? { ...prof, recently_watched_movies: [] }
                    : prof
            });

            return {
                ...state,
                profiles: newProfiles,
                isLoading,
                errors 
            }

        case REMOVE_TO_MY_DOWNLOADS_SUCCESS: 
            let filteredMyDownloads = loggedInProfile
                .my_downloads
                .filter(({ id }) => id !== payload.showID);

            newProfiles = profiles.map(prof => {
                return (prof.id === loggedInProfile.id) 
                    ? { ...prof, my_downloads: filteredMyDownloads } 
                    : prof;
            });

            return {
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

            
        case REMOVE_TO_RECENT_WATCHES_SUCCESS:

            const filteredRecentlyWatchedMovies = loggedInProfile
                .recently_watched_shows
                .filter(({ id }) => id !== payload.movie_id);

            newProfiles = profiles.map(prof => {
                return (prof.id === loggedInProfile.id) 
                    ? { ...prof, recently_watched_shows: filteredRecentlyWatchedMovies } 
                    : prof;
            });

            return { 
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case SELECT_PROFILE_SUCCESS:
            const { profile: profile_ } = payload;
            
            newProfiles = profiles.map(prof => 
                prof.id === profile_.id 
                    ? { 
                        ...prof,
                        ...profile_
                    } 
                    : prof
            );

            return {
                ...state,
                profile: profile_,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case TOGGLE_ADD_TO_MY_LIST_SUCCESS:

            const currentMyList = loggedInProfile.my_list;
            const isAddedToList = currentMyList.find(({ id }) => id === payload.show.id); 

            const myList = (! isAddedToList) 
                ? [ ...currentMyList, payload.show ] 
                : currentMyList.filter(({ id }) => id !== payload.show.id);

            newProfiles = profiles.map((prof) => {
                return (prof.id === loggedInProfile.id) 
                    ? { ...prof, my_list: myList } 
                    : prof;
            });
        
            return {
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }            

        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS:

            const { movieID } = payload;
            let remindedMovies = loggedInProfile.reminded_coming_soon_movies;

            let isReminded = remindedMovies.find(id => id === movieID);

            if (! isReminded) {
                remindedMovies.push(movieID)
            }
            else {
                 remindedMovies = remindedMovies.filter(id => id !== movieID);
            }

            newProfiles = profiles.map(prof => {
                return (prof.id === loggedInProfile.id) 
                    ? { ...prof, reminded_coming_soon_movies: remindedMovies } 
                    : prof;
            });

            return {
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case UPDATE_AUTHENTICATED_PROFILE_SUCCESS: 
            newProfiles = profiles.map(prevProfile => {
                return prevProfile.id === payload.profile.id 
                    ? { ...prevProfile, ...payload.profile }
                    : prevProfile
            });

            return {
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case VIEW_DOWNLOADS_SUCCESS: 
            newProfiles = profiles.map(prof => (prof.id === loggedInProfile.id) ? { ...prof, has_new_downloads: false } : prof);

            return {
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case CLEAR_ERRORS_PROPERTY:
            return {
                ...state,
                errors
            }

        case ADD_TO_RECENT_WATCHES_FAILED:
        case CREATE_PROFILE_FAILED:
        case DELETE_PROFILE_FAILED:
        case DOWNLOAD_VIDEO_FAILED:
        case SELECT_PROFILE_FAILED:
        case RATE_SHOW_FAILED:
        case RATE_RECENTLY_WATCHED_MOVIE_FAILED:
        case CLEAR_RECENT_WATCHES_FAILED:
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
