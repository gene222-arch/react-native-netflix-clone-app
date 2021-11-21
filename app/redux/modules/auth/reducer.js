import ACTION_TYPES from './action.types';
import accountProfiles from './../../../services/data/accountProfiles';

const {
    ADD_TO_RECENT_WATCHES_START,
    ADD_TO_RECENT_WATCHES_SUCCESS,
    ADD_TO_RECENT_WATCHES_FAILED,
    BROADCAST_CREATE_PROFILE,
    BROADCAST_DELETE_PROFILE_BY_ID,
    BROADCAST_UPDATE_PROFILE,
    CREATE_PROFILE_START,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAILED,
    DELETE_PROFILE_START,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAILED,
    DOWNLOAD_VIDEO_START,
    DOWNLOAD_VIDEO_SUCCESS,
    DOWNLOAD_VIDEO_FAILED,
    DISABLE_PROFILE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    MANAGE_PIN_CODE_START,
    MANAGE_PIN_CODE_SUCCESS,
    MANAGE_PIN_CODE_FAILED,
    MARK_REMINDED_MOVIE_AS_READ_START,
    MARK_REMINDED_MOVIE_AS_READ_SUCCESS,
    MARK_REMINDED_MOVIE_AS_READ_FAILED,
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
    SET_PROFILE_COUNT_TO_DISABLE,
    SHOW_SUBSCRIBER_START,
    SHOW_SUBSCRIBER_SUCCESS,
    SHOW_SUBSCRIBER_FAILED,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED,
    TOGGLE_ADD_TO_MY_LIST_START,
    TOGGLE_ADD_TO_MY_LIST_SUCCESS,
    TOGGLE_ADD_TO_MY_LIST_FAILED,
    UPDATE_AUTHENTICATED_PROFILE_START,
    UPDATE_AUTHENTICATED_PROFILE_SUCCESS,
    UPDATE_AUTHENTICATED_PROFILE_FAILED,
    UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_START,
    UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_SUCCESS,
    UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_FAILED,
    VIEW_DOWNLOADS_START,
    VIEW_DOWNLOADS_SUCCESS,
    VIEW_DOWNLOADS_FAILED,
    UPDATE_USER_PROFILE,
    UPDATE_SUBSCRIPTION_DETAILS,
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
    previous_avatar: null,
    is_for_kids: false,
    is_profiled_locked: false,
    enabled: 1,
    pin_code: '',
    my_downloads: [],
    recently_watched_movies: [],
    my_lists: [],
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

const SUBSCRIPTION_DETAILS_DEFAULT_PROPS = {
    id: '',
    user_id: '',
    type: '',
    cost: '',
    is_first_subscription: false,
    is_cancelled: false,
    is_expired: false,
    subscribed_at: null,
    expired_at: null,
    cancelled_at: null,
    status: 'subscribed'
};

const initialState = {
    auth: null,
    credentials: CREDENTIALS_DEFAULT_PROPS,
    profile: PROFILE_DEFAULT_PROPS,
    profiles: [],
    profileCountToDisable: 0,
    isAuthenticated: false,
    isLoading: false,
    errors: DEFAULT_ERROR_MESSAGE_PROPS,
    subscription_details: SUBSCRIPTION_DETAILS_DEFAULT_PROPS
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
        case CLEAR_RECENT_WATCHES_START:
        case CREATE_PROFILE_START:
        case DELETE_PROFILE_START:
        case DOWNLOAD_VIDEO_START:
        case LOGIN_START:
        case LOGOUT_START:
        case MANAGE_PIN_CODE_START:
        case MARK_REMINDED_MOVIE_AS_READ_START:
        case RATE_SHOW_START:
        case RATE_RECENTLY_WATCHED_MOVIE_START:
        case REMOVE_TO_MY_DOWNLOADS_START:
        case REMOVE_TO_RECENT_WATCHES_START:
        case SELECT_PROFILE_START:
        case SHOW_SUBSCRIBER_START:
        case TOGGLE_ADD_TO_MY_LIST_START:
        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START:
        case UPDATE_AUTHENTICATED_PROFILE_START:
        case UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_START:
        case VIEW_DOWNLOADS_START:
            return { 
                ...state, 
                isLoading: true,
                errors
            }

        case ADD_TO_RECENT_WATCHES_SUCCESS:

            const { movie } = payload;
            const movieIndex = loggedInProfile.recently_watched_movies.findIndex(({ id }) => id === movie.id);

            let newLoggedInProfile = loggedInProfile;

            const movie_ = { ...movie, user_ratings: [] };

            if (movieIndex === -1) {
                newLoggedInProfile.recently_watched_movies.unshift(movie_);
            }
            
            if (movieIndex !== -1) {
                newLoggedInProfile.recently_watched_movies.splice(movieIndex, 1);
                newLoggedInProfile.recently_watched_movies.unshift(movie_);
            }

            newProfiles = profiles.map(prof => (prof.id === newLoggedInProfile.id) ? newLoggedInProfile : prof);

            return { 
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case BROADCAST_CREATE_PROFILE:
            newProfiles = [...state.profiles, {
                ...PROFILE_DEFAULT_PROPS,
                ...payload.profile,
            }];

            return {
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case BROADCAST_UPDATE_PROFILE:
            const payloadProfile = payload.profile;
            newProfiles = profiles.map(profile => (
                profile.id === payload.profile.id 
                    ? ({ ...profile, ...payloadProfile }) 
                    : profile
            ));

            return {
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case BROADCAST_DELETE_PROFILE_BY_ID:
            newProfiles = profiles.filter(({ id }) => id !== payload.id)

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

        case DISABLE_PROFILE:
            newProfiles = profiles.map(profile => {
                return payload.profileIds.includes(profile.id)
                    ? ({ ...profile, enabled: 0 })
                    : profile
            });

        return {
            ...state,
            profileCountToDisable: 0,
            profiles: newProfiles,
            isLoading,
            errors
        }

        case RATE_SHOW_SUCCESS:
            const { model_type } = payload;
            let newRatedMovies = [];

            if (model_type === 'Movie') 
            {
                let isMovieLiked = loggedInProfile.liked_movies.find(({ movie_id }) => movie_id === payload.movie.id);

                if (! isMovieLiked) {
                    newRatedMovies.push({ ...payload.movie, movie_id: payload.movie.id });
                }
                else {
                    newRatedMovies = loggedInProfile.liked_movies.filter(({ movie_id }) => movie_id !== payload.movie.id);
                }
            } else {
                let isMovieLiked = loggedInProfile.liked_coming_soon_movies.find(({ movie_id }) => movie_id === payload.movie.id);

                if (! isMovieLiked) {
                    newRatedMovies.push({ ...payload.movie, movie_id: payload.movie.id });
                }
                else {
                    newRatedMovies = loggedInProfile.liked_coming_soon_movies.filter(({ movie_id }) => movie_id !== payload.movie.id);
                }
            }

            newProfiles = profiles.map(profile => {
                if (profile.id !== loggedInProfile.id) return profile;

                if (model_type === 'Movie') {
                    return { 
                        ...profile, 
                        liked_movies: newRatedMovies 
                    };
                } 

                return { 
                    ...profile, 
                    liked_coming_soon_movies: newRatedMovies 
                };
            });

            return { 
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case RATE_RECENTLY_WATCHED_MOVIE_SUCCESS:
            let newLikedMovies_ = [];
            
            let isMovieLiked_ = loggedInProfile.liked_movies.find(({ movie_id }) => movie_id === payload.movie.id);
            
            if (! isMovieLiked_) {
                newLikedMovies_.push(payload.movie);
            }
            else {
                newLikedMovies_ = loggedInProfile.liked_movies.filter(({ movie_id }) => movie_id !== payload.movie.id);
            }
            
            let user_ratings = [];
            
            let recentlyWatchedMovies = loggedInProfile
                .recently_watched_movies.map(movie => {
                    if (movie.id === payload.movie.id) 
                    {
                        if (! movie.rate || movie.rate) {
                            user_ratings = [{
                                movie_id: movie.id,
                                model_type: payload.model,
                                rate: payload.rate
                            }];

                            return { ...movie, user_ratings };
                        } else {
                            return { ...movie, user_ratings: [] };
                        }
                    }
            
                    return movie;
            });

            newProfiles = profiles.map(prof => {
                return (prof.id === loggedInProfile.id) 
                    ? { ...prof, recently_watched_movies: recentlyWatchedMovies, liked_movies: newLikedMovies_ } 
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
                errors,
                subscription_details: payload.subscription_details
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

        case MANAGE_PIN_CODE_SUCCESS:
            newProfiles = profiles.map(prof => {
                return (prof.id === payload.user_profile_id)
                    ? { ...prof, pin_code: payload.pin_code, is_profiled_locked: payload.is_profiled_locked }
                    : prof
            });

            return {
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case MARK_REMINDED_MOVIE_AS_READ_SUCCESS: 

            const remindedComingSoonMovies = loggedInProfile
                .reminded_coming_soon_movies
                .map(movie => movie.coming_soon_movie_id === payload.coming_soon_movie_id 
                    ? ({
                        ...movie,
                        read_at: new Date()
                    })
                    : movie
                );

            newProfiles = profiles.map(profile => 
                profile.id === payload.user_profile_id 
                    ? 
                        ({
                            ...profile,
                            reminded_coming_soon_movies: remindedComingSoonMovies
                        })
                    : profile
            )

            return {
                ...state,
                profiles: newProfiles,
                errors,
                isLoading
            }

        case DOWNLOAD_VIDEO_SUCCESS:
            const updateProfileDownloads = profiles.map(prof => {
                return (prof.id === payload.profile.id)
                    ? { 
                        ...prof, 
                        my_downloads: [ ...prof.my_downloads, { movie_id: payload.movie.id, movie: payload.movie, uri: payload.downloaded_file_uri } ], 
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
                .filter(({ movie_id }) => movie_id !== payload.showID);

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
                .recently_watched_movies
                .filter(({ id }) => id !== payload.movie_id);

            newProfiles = profiles.map(prof => {
                return (prof.id === loggedInProfile.id) 
                    ? { ...prof, recently_watched_movies: filteredRecentlyWatchedMovies } 
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

        case SET_PROFILE_COUNT_TO_DISABLE:
            return {
                ...state,
                profileCountToDisable: payload.profileCount,
                isLoading,
                errors
            }

        case SHOW_SUBSCRIBER_SUCCESS:
            return { 
                ...state, 
                auth: {
                    user: {
                        ...payload.auth.user,
                        password: state.auth.user.password
                    }
                },
                profiles: payload.profiles.map(profile => ({ ...PROFILE_DEFAULT_PROPS, ...profile })),
                isAuthenticated: true,
                isLoading,
                errors,
                subscription_details: payload.subscription_details
            }

        case TOGGLE_ADD_TO_MY_LIST_SUCCESS:

            const currentMyList = loggedInProfile.my_lists;
            const movieExistsInMyList = currentMyList.find(({ movie_id }) => movie_id === payload.movie.id); 

            let newMyList = [];

            if (! movieExistsInMyList) {
                newMyList = [
                    ...currentMyList,
                    {
                        movie: payload.movie,
                        movie_id: payload.movie.id
                    }
                ];
            } else {
                newMyList = currentMyList.filter(({ movie_id }) => movie_id !== payload.movie.id);;
            }

            newProfiles = profiles.map(prof => {
                return (prof.id === loggedInProfile.id) 
                    ? { ...prof, my_lists: newMyList } 
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

            let isReminded = remindedMovies.find(({ coming_soon_movie_id }) => coming_soon_movie_id === movieID);

            if (! isReminded) {
                remindedMovies.push({
                    coming_soon_movie_id: movieID
                });
            }
            else {
                 remindedMovies = remindedMovies.filter(({ coming_soon_movie_id }) => coming_soon_movie_id !== movieID);
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
        
        case UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_SUCCESS:

            const recentlyWatchedMovies_ = loggedInProfile
                .recently_watched_movies.map(movie => 
                {
                    return movie.id === payload.movieId 
                        ? {
                            ...movie,
                            last_played_position_millis: payload.positionMillis,
                            duration_in_millis: payload.duration_in_millis
                        } 
                        : movie
                });

            newProfiles = profiles.map(prof => {
                return (prof.id === loggedInProfile.id) 
                    ? { ...prof, recently_watched_movies: recentlyWatchedMovies_ } 
                    : prof;
            });

            return {
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }


        case UPDATE_SUBSCRIPTION_DETAILS:
            newProfiles = profiles.map(profile => ({ ...profile, enabled: 1 }));

            return {
                ...state,
                profiles: newProfiles,
                isLoading,
                errors,
                subscription_details: {
                    ...state.subscription_details,
                    ...payload.subscription_details
                }
            }


        case VIEW_DOWNLOADS_SUCCESS: 
            newProfiles = profiles.map(prof => (prof.id === loggedInProfile.id) ? { ...prof, has_new_downloads: false } : prof);

            return {
                ...state,
                profiles: newProfiles,
                isLoading,
                errors
            }

        case UPDATE_USER_PROFILE:

            newProfiles = profiles.map(prof => {
                return prof.id === payload.user_profile_id
                    ? { ...prof, ...payload }
                    : prof;
            })

            return {
                ...state,
                profiles: newProfiles
            }

        case CLEAR_ERRORS_PROPERTY:
            return {
                ...state,
                errors
            }

        case ADD_TO_RECENT_WATCHES_FAILED:
        case CLEAR_RECENT_WATCHES_FAILED:
        case CREATE_PROFILE_FAILED:
        case DELETE_PROFILE_FAILED:
        case DOWNLOAD_VIDEO_FAILED:
        case MANAGE_PIN_CODE_FAILED:
        case MARK_REMINDED_MOVIE_AS_READ_FAILED:
        case SELECT_PROFILE_FAILED:
        case SHOW_SUBSCRIBER_FAILED:
        case RATE_SHOW_FAILED:
        case RATE_RECENTLY_WATCHED_MOVIE_FAILED:
        case REMOVE_TO_MY_DOWNLOADS_FAILED:
        case REMOVE_TO_RECENT_WATCHES_FAILED:
        case TOGGLE_ADD_TO_MY_LIST_FAILED:
        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED:
        case UPDATE_AUTHENTICATED_PROFILE_FAILED:
        case UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_FAILED:
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
