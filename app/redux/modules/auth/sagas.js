import { all, take, put, call } from 'redux-saga/effects'
import ACTION_TYPES from './action.types'
import * as RootNavigation from './../../../navigation/RootNavigation'
import * as LOGIN_API from './../../../services/auth/login'
import * as AUTH_API from './../../../services/auth/auth'
import * as REMIND_ME_API from './../../../services/movie/remind.me'
import * as MY_DOWNLOADS_API from './../../../services/movie/my.downloads'
import * as RECENTLY_WATCHED_MOVIE_API from './../../../services/recently-watched-movie/recently.watched.movie'
import * as SecureStoreInstance from '../../../utils/SecureStoreInstance'
import * as ACTION from './actions'
import * as SERVER_EXPO_NOTIF from './../../../services/expo-notifications/server.expo.notification'

const {
    ADD_TO_RECENT_WATCHES_START,
    CLEAR_RECENT_WATCHES_START,
    CREATE_PROFILE_START,
    DELETE_PROFILE_START,
    DOWNLOAD_VIDEO_START,
    LOGIN_START,
    LOGOUT_START,
    MANAGE_PIN_CODE_START,
    MARK_REMINDED_MOVIE_AS_READ_START,
    RATE_SHOW_START,
    RATE_RECENTLY_WATCHED_MOVIE_START,
    REMOVE_TO_MY_DOWNLOADS_START,
    REMOVE_TO_RECENT_WATCHES_START,
    SELECT_PROFILE_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_ADD_TO_MY_LIST_START,
    UPDATE_AUTHENTICATED_PROFILE_START,
    UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_START,
    VIEW_DOWNLOADS_START
} = ACTION_TYPES;


/** Sagas */
function* addToRecentWatchesSaga(payload)  
{
    try {
        const { user_profile_id, movie, duration_in_millis } = payload;

        yield put(ACTION.addToRecentWatchesSuccess(payload));
        yield call(RECENTLY_WATCHED_MOVIE_API.createAsync, { movie_id: movie.id, user_profile_id, duration_in_millis });
    } catch ({ message }) {
        yield put(ACTION.addToRecentWatchesFailed({ message }));
    }
}

function* clearRecentWatchesSaga(payload)  
{
    try {
        yield put(ACTION.clearRecentWatchesSuccess());
        yield call(RECENTLY_WATCHED_MOVIE_API.clearAsync, payload);
    } catch ({ message }) {
        yield put(ACTION.clearRecentWatchesFailed({ message }));
    }
}

function* createProfileSaga(payload)  
{
    try {
        const { data: profile } = yield call(AUTH_API.createProfileAsync, payload);

        yield put(ACTION.createProfileSuccess({ profile }));
        RootNavigation.navigate('SelectProfile');
    } catch ({ message }) {
        yield put(ACTION.createProfileFailed({ message }));
    }
}

function* deleteProfileSaga(payload)  
{
    try {
        yield put(ACTION.deleteProfileSuccess({ profileID: payload }));

        yield call(AUTH_API.deleteProfileByIdAsync, payload);
        RootNavigation.navigate('SelectProfile');
    } catch ({ message }) {
        yield put(ACTION.deleteProfileFailed({ message }));
    }
}

function* managePinCodeSaga(payload)  
{
    try {
        yield put(ACTION.managePinCodeSuccess(payload));
        yield call(AUTH_API.managePinCodeAsync, payload);
    } catch ({ message }) {
        yield put(ACTION.managePinCodeFailed({ message }));
    }
}

function* markRemindedMovieAsReadSaga(payload)  
{
    try {
        yield call(REMIND_ME_API.markAsReadAsync, payload);
        yield put(ACTION.markRemindedMovieAsReadSuccess(payload));
    } catch ({ message }) {
        yield put(ACTION.markRemindedMovieAsReadFailed({ message }));
    }
}

function* rateShowSaga(payload)  
{
    try {
        const { movie, ...rest } = payload;

        yield put(ACTION.rateShowSuccess(payload));
        yield call(AUTH_API.rateMovieAsync, { movie_id: movie.id, ...rest });
    } catch ({ message }) {
        yield put(ACTION.rateShowFailed({ message }));
    }
}

function* rateRecentlyWatchedMovieSaga(payload)  
{
    try {
        const { movie, ...rest } = payload;
        
        yield put(ACTION.rateRecentlyWatchedMovieSuccess(payload));
        yield call(AUTH_API.rateMovieAsync, { movie_id: movie.id, ...rest });
    } catch ({ message }) {
        yield put(ACTION.rateRecentlyWatchedMovieFailed({ message }));
    }
}

function* loginSaga(payload)  
{
    try {
        const { data } = yield call(LOGIN_API.loginAsync, payload);

        const { access_token, data: auth } = data;
        const {  profiles, ...userDetails } = auth;
        const loginSuccessData = { 
            auth: { 
                ...userDetails, 
                user: {
                    ...userDetails.user,
                    password: payload.password
                } 
            }, 
            profiles 
        };

        const expoToken = yield call(SecureStoreInstance.getExpoNotificationToken)
        yield call(SecureStoreInstance.storeAccessToken, access_token);
        yield put(ACTION.loginSuccess(loginSuccessData)); 
        yield call(SERVER_EXPO_NOTIF.subscribe, { expo_token: expoToken });
        RootNavigation.navigate('SelectProfile');
    } catch ({ message }) {
        yield put(ACTION.loginFailed({ message }));    
    }
}

function* logoutSaga()  
{
    try {
        yield call(SERVER_EXPO_NOTIF.unsubscribe);
        const { status } = yield call(LOGIN_API.logoutAsync);
        
        if (status === 'success') {
            yield put(ACTION.logoutSuccess());
            yield call(SecureStoreInstance.removeExpoNotificationToken);
            yield call(SecureStoreInstance.removeAccessToken);
            RootNavigation.navigate('Login');
        }
    } catch ({ message }) {
        console.log(message)
        yield put(ACTION.logoutFailed({ message }));
    }
}

function* downloadVideoSaga(payload)  
{
    try {
        yield put(ACTION.downloadVideoSuccess(payload));
        yield call(MY_DOWNLOADS_API.createDownloadAsync, {
            user_profile_id: payload.profile.id,
            movie_id: payload.movie.id,
            uri: payload.downloaded_file_uri
        });
    } catch ({ message }) {
        yield put(ACTION.downloadVideoFailed({ message }));
        console.log(message);
    }
}

function* removeToMyDownloadsSaga(payload)  
{
    try {
        const { movie_id, user_profile_id } = payload;
        const ids = Array.isArray(movie_id) ? movie_id : [ movie_id ];

        yield put(ACTION.removeToMyDownloadsSuccess({ showID: movie_id }));
        yield call(MY_DOWNLOADS_API.deleteDownloadAsync, { ids, user_profile_id });
    } catch ({ message }) {
        yield put(ACTION.removeToMyDownloadsFailed({ message }));
    }
}

function* removeToRecentWatchesSaga(payload)  
{
    try {
        const { movie_id } = payload;
        yield call(RECENTLY_WATCHED_MOVIE_API.destroyAsync, payload);
        yield put(ACTION.removeToRecentWatchesSuccess({ movie_id }));
    } catch ({ message }) {
        yield put(ACTION.removeToRecentWatchesFailed({ message }));
    }
}

function* selectProfileSaga(payload)  
{
    try {
        const { data: profile } = yield call(AUTH_API.findProfileByIdAsync, payload.id)
        yield put(ACTION.selectProfileSuccess({ profile }));
        RootNavigation.navigate('Home');
    } catch ({ message }) {
        yield put(ACTION.selectProfileFailed({ message }));
    }
}

function* toggleAddToMyListSaga(payload)
{
    try {
        const { movie, user_profile_id } = payload;

        yield put(ACTION.toggleAddToMyListSuccess({ movie }));
        yield call(AUTH_API.toggleMyListAsync, { movie_id: movie.id, user_profile_id });
    } catch ({ message }) {
        yield put(ACTION.toggleAddToMyListFailed({ message }));
    }
}

function* toggleRemindMeOfComingShowSaga(payload)
{
    try {
        const { user_profile_id, movieID: coming_soon_movie_id } = payload;

        yield put(ACTION.toggleRemindMeOfComingShowSuccess({ movieID: coming_soon_movie_id }));
        yield call(AUTH_API.toggleRemindMeAsync, { user_profile_id, coming_soon_movie_id });
    } catch ({ message }) {
        yield put(ACTION.toggleRemindMeOfComingShowFailed({ message }));
    }
}

function* updateAuthenticatedProfileSaga(payload)
{
    try {
        yield put(ACTION.updateAuthenticatedProfileSuccess({ profile: payload }));
        RootNavigation.navigate('SelectProfile');
        yield call(AUTH_API.updateProfileAsync, payload);
    } catch ({ message }) {
        yield put(ACTION.updateAuthenticatedProfileFailed({ message }));
    }
}

function* updateRecentlyWatchedAtPositionMillisSaga(payload)
{
    try {
        const { movieId: movie_id, user_profile_id, positionMillis: last_played_position_millis } = payload;

        yield put(ACTION.updateRecentlyWatchedAtPositionMillisSuccess(payload));
        yield call(RECENTLY_WATCHED_MOVIE_API.updatePositionMillisAsync, { movie_id, user_profile_id, last_played_position_millis });
    } catch ({ message }) {
        yield put(ACTION.updateRecentlyWatchedAtPositionMillisFailed({ message }));
    }
}

function* viewDownloadsSaga()
{
    try {
        yield put(ACTION.viewDownloadsSuccess());
    } catch ({ message }) {
        yield put(ACTION.viewDownloadsFailed({ message }));
    }
}

/** Watchers or Observers */
function* addToRecentWatchesWatcher()
{
    while (true) {
        const { payload } = yield take(ADD_TO_RECENT_WATCHES_START);
        yield call(addToRecentWatchesSaga, payload);
    }
}

function* clearRecentWatchesWatcher()
{
    while (true) {
        const { payload } = yield take(CLEAR_RECENT_WATCHES_START);
        yield call(clearRecentWatchesSaga, payload);
    }
}


function* createProfileWatcher()
{
    while (true) {
        const { payload } = yield take(CREATE_PROFILE_START);
        yield call(createProfileSaga, payload);
    }
}

function* deleteProfileWatcher()
{
    while (true) {
        const { payload } = yield take(DELETE_PROFILE_START);
        yield call(deleteProfileSaga, payload);
    }
}

function* downloadVideoWatcher()
{
    while (true) {
        const { payload } = yield take(DOWNLOAD_VIDEO_START);
        yield call(downloadVideoSaga, payload);
    }
}

function* loginWatcher()
{
    while (true) {
        const { payload } = yield take(LOGIN_START);
        yield call(loginSaga, payload);
    }
}

function* logoutWatcher()
{
    while (true) {
        yield take(LOGOUT_START);
        yield call(logoutSaga);
    }
}

function* managePinCodeWatcher()
{
    while (true) {
        const { payload } = yield take(RATE_SHOW_START);
        yield call(managePinCodeSaga, payload);
    }
}

function* markRemindedMovieAsReadWatcher()
{
    while (true) {
        const { payload } = yield take(MARK_REMINDED_MOVIE_AS_READ_START);
        yield call(markRemindedMovieAsReadSaga, payload);
    }
}

function* rateShowWatcher()
{
    while (true) {
        const { payload } = yield take(RATE_SHOW_START);
        yield call(rateShowSaga, payload);
    }
}

function* rateRecentlyWatchedMovieWatcher()
{
    while (true) {
        const { payload } = yield take(RATE_RECENTLY_WATCHED_MOVIE_START);
        yield call(rateRecentlyWatchedMovieSaga, payload);
    }
}


function* removeToMyDownloadsWatcher()
{
    while (true) {
        const { payload } = yield take(REMOVE_TO_MY_DOWNLOADS_START);
        yield call(removeToMyDownloadsSaga, payload);
    }
}

function* removeToRecentWatchesWatcher()
{
    while (true) {
        const { payload } = yield take(REMOVE_TO_RECENT_WATCHES_START);
        yield call(removeToRecentWatchesSaga, payload);
    }
}

function* selectProfileWatcher()
{
    while (true) {
        const { payload } = yield take(SELECT_PROFILE_START);
        yield call(selectProfileSaga, payload);
    }
}

function* toggleAddToMyListWatcher()
{
    while (true) {
        const { payload } = yield take(TOGGLE_ADD_TO_MY_LIST_START);
        yield call(toggleAddToMyListSaga, payload);
    }
}

function* toggleRemindMeOfComingShowWatcher()
{
    while (true) {
        const { payload } = yield take(TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START);
        yield call(toggleRemindMeOfComingShowSaga, payload);
    }
}

function* updateAuthenticatedProfileWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_AUTHENTICATED_PROFILE_START);
        yield call(updateAuthenticatedProfileSaga, payload);
    }
}

function* updateRecentlyWatchedAtPositionMillisWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_RECENTLY_WATCHED_AT_POSITION_MILLIS_START);
        yield call(updateRecentlyWatchedAtPositionMillisSaga, payload);
    }
}

function* viewDownloadsWatcher()
{
    while (true) {
        yield take(VIEW_DOWNLOADS_START);
        yield call(viewDownloadsSaga);
    }
}



export default function* ()
{
    yield all([
        addToRecentWatchesWatcher(),
        clearRecentWatchesWatcher(),
        createProfileWatcher(),
        deleteProfileWatcher(),
        downloadVideoWatcher(),
        loginWatcher(),
        logoutWatcher(),
        managePinCodeWatcher(),
        markRemindedMovieAsReadWatcher(),
        rateShowWatcher(),
        rateRecentlyWatchedMovieWatcher(),
        removeToMyDownloadsWatcher(),
        removeToRecentWatchesWatcher(),
        selectProfileWatcher(),
        toggleAddToMyListWatcher(),
        toggleRemindMeOfComingShowWatcher(),
        updateAuthenticatedProfileWatcher(),
        updateRecentlyWatchedAtPositionMillisWatcher(),
        viewDownloadsWatcher()
    ]);
}

