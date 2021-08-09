import { all, take, put, call } from 'redux-saga/effects'
import ACTION_TYPES from './action.types'
import * as RootNavigation from './../../../navigation/RootNavigation'
import * as LOGIN_API from './../../../services/auth/login'
import * as AUTH_API from './../../../services/auth/auth'
import * as SecureStoreInstance from '../../../utils/SecureStoreInstance'
import * as ACTION from './actions'

const {
    ADD_TO_RECENT_WATCHES_START,
    CREATE_PROFILE_START,
    DELETE_PROFILE_START,
    DOWNLOAD_VIDEO_START,
    LOGIN_START,
    LOGOUT_START,
    RATE_SHOW_START,
    RATE_RECENTLY_WATCHED_MOVIE_START,
    REMOVE_TO_MY_DOWNLOADS_START,
    REMOVE_TO_RECENT_WATCHES_START,
    SELECT_PROFILE_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_ADD_TO_MY_LIST_START,
    UPDATE_AUTHENTICATED_PROFILE_START,
    VIEW_DOWNLOADS_START
} = ACTION_TYPES;


/** Sagas */
function* addToRecentWatchesSaga(payload)  
{
    try {
        yield put(ACTION.addToRecentWatchesSuccess({ show: payload }));
    } catch ({ message }) {
        yield put(ACTION.addToRecentWatchesFailed({ message }));
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

/**
 * Todo: Test API Request to Server
 */
function* rateShowSaga(payload)  
{
    try {
        yield put(ACTION.rateShowSuccess(payload));
        // yield put(ACTION.AUTH_API.rateMovieAsync, payload);
    } catch ({ message }) {
        yield put(ACTION.rateShowFailed({ message }));
    }
}

/**
 * Todo: Test API Request to Server
 */
function* rateRecentlyWatchedMovieSaga(payload)  
{
    try {
        yield put(ACTION.rateRecentlyWatchedMovieSuccess(payload));
        // yield put(ACTION.AUTH_API.rateMovieAsync, payload);
    } catch ({ message }) {
        yield put(ACTION.rateRecentlyWatchedMovieFailed({ message }));
    }
}

function* loginSaga(payload)  
{
    try {
        const { data, status } = yield call(LOGIN_API.loginAsync, payload);

        const { access_token, data: auth } = data;
        const {  profiles, ...user } = auth;

        yield call(SecureStoreInstance.storeAccessToken, access_token);
        yield put(ACTION.loginSuccess({ auth: user, profiles })); 
    } catch ({ message }) {
        yield put(ACTION.loginFailed({ message }));    
    }
}

function* logoutSaga()  
{
    try {
        const { status } = yield call(LOGIN_API.logoutAsync);
        
        if (status === 'success') {
            yield call(SecureStoreInstance.removeAccessToken);
            yield put(ACTION.logoutSuccess());
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
    } catch ({ message }) {
        yield put(ACTION.downloadVideoFailed({ message }));
        console.log(message);
    }
}

function* removeToMyDownloadsSaga(payload)  
{
    try {
        yield put(ACTION.removeToMyDownloadsSuccess({ showID: payload }));
    } catch ({ message }) {
        yield put(ACTION.removeToMyDownloadsFailed({ message }));
    }
}

function* removeToRecentWatchesSaga(payload)  
{
    try {
        yield put(ACTION.removeToRecentWatchesSuccess({ showID: payload }));
    } catch ({ message }) {
        yield put(ACTION.removeToRecentWatchesFailed({ message }));
    }
}

function* selectProfileSaga(payload)  
{
    try {
        yield put(ACTION.selectProfileSuccess(payload));
        
        RootNavigation.navigate('Home');
    } catch ({ message }) {
        yield put(ACTION.selectProfileFailed({ message }));
    }
}

/**
 * Todo: Test API Request to Server
 * !Problem: Duplication of id with Movies and Coming Soon Movies
 */
function* toggleAddToMyListSaga(payload)
{
    try {
        yield put(ACTION.toggleAddToMyListSuccess({ show: payload }));
        // yield call(AUTH_API.toggleMyListAsync, payload);
    } catch ({ message }) {
        yield put(ACTION.toggleAddToMyListFailed({ message }));
    }
}

/**
 * Todo: Test API Request to Server
 */
function* toggleRemindMeOfComingShowSaga(payload)
{
    try {
        const { user_profile_id, show } = payload;
        yield call(AUTH_API.toggleRemindMeAsync, { user_profile_id, coming_soon_movie_id: show.id });
        yield put(ACTION.toggleRemindMeOfComingShowSuccess({ show }));
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
        createProfileWatcher(),
        deleteProfileWatcher(),
        downloadVideoWatcher(),
        loginWatcher(),
        logoutWatcher(),
        rateShowWatcher(),
        rateRecentlyWatchedMovieWatcher(),
        removeToMyDownloadsWatcher(),
        removeToRecentWatchesWatcher(),
        selectProfileWatcher(),
        toggleAddToMyListWatcher(),
        toggleRemindMeOfComingShowWatcher(),
        updateAuthenticatedProfileWatcher(),
        viewDownloadsWatcher()
    ]);
}

