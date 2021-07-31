import { all, take, put, call } from 'redux-saga/effects'
import ACTION_TYPES from './action.types'
import ENV from './../../../../env';
import * as RootNavigation from './../../../navigation/RootNavigation'
import * as LOGIN_API from './../../../services/auth/login'
import * as AUTH_API from './../../../services/auth/auth'
import * as AsyncStorageInstance from './../../../utils/AsyncStorageInstance'
import { 
    addToRecentWatchesSuccess,
    addToRecentWatchesFailed,
    createProfileSuccess,
    createProfileFailed,
    deleteProfileSuccess,
    deleteProfileFailed,
    rateShowSuccess,
    rateShowFailed,
    loginSuccess, 
    loginFailed, 
    logoutSuccess, 
    logoutFailed, 
    downloadVideoSuccess,
    downloadVideoFailed,
    removeToMyDownloadsSuccess,
    removeToMyDownloadsFailed,
    removeToRecentWatchesSuccess,
    removeToRecentWatchesFailed,
    selectProfileFailed,
    selectProfileSuccess,
    toggleAddToMyListSuccess,
    toggleAddToMyListFailed,
    toggleRemindMeOfComingShowSuccess, 
    toggleRemindMeOfComingShowFailed,
    updateAuthenticatedProfileSuccess,
    updateAuthenticatedProfileFailed,
    viewDownloadsSuccess,
    viewDownloadsFailed
} from './actions'
const {
    ADD_TO_RECENT_WATCHES_START,
    CREATE_PROFILE_START,
    DELETE_PROFILE_START,
    RATE_SHOW_START,
    LOGIN_START,
    LOGOUT_START,
    DOWNLOAD_VIDEO_START,
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
        yield put(addToRecentWatchesSuccess({ show: payload }));
    } catch ({ message }) {
        yield put(addToRecentWatchesFailed({ message }));
    }
}

/**
 * Todo: Test API
 */
function* createProfileSaga(payload)  
{
    try {
        yield put(createProfileSuccess({ profile: payload }));
        yield call(AUTH_API.createProfileAsync, payload);
        RootNavigation.navigate('SelectProfile');
    } catch ({ message }) {
        yield put(createProfileFailed({ message }));
    }
}

/**
 * Todo: Test API
 */
function* deleteProfileSaga(payload)  
{
    try {
        yield put(deleteProfileSuccess({ profileID: payload }));
        yield call(AUTH_API.deleteProfileByIdAsync, payload);

        RootNavigation.navigate('SelectProfile');
    } catch ({ message }) {
        yield put(deleteProfileFailed({ message }));
    }
}

/**
 * Todo: Test API
 */
function* rateShowSaga(payload)  
{
    try {
        yield put(rateShowSuccess(payload));
        yield put(AUTH_API.rateMovieAsync, payload);
    } catch ({ message }) {
        yield put(rateShowFailed({ message }));
    }
}

function* loginSaga(payload)  
{
    try {
        const { data } = yield call(LOGIN_API.loginAsync, payload);

        const { access_token, data: auth } = data;
        const {  profiles, ...user } = auth;
        yield call(AsyncStorageInstance.storeAccessToken, access_token);
        yield put(loginSuccess({ auth: user, profiles }));      
    } catch ({ message }) {
        yield put(loginFailed({ message }));    
    }
}

/**
 * Todo: Error still occurs
 */
function* logoutSaga()  
{
    try {
        const { status } = yield call(LOGIN_API.logoutAsync);
        
        if (status === 'success') {
            yield call(AsyncStorageInstance.removeAccessToken);
            yield put(logoutSuccess());
        }
    } catch ({ message }) {
        console.log(message)
        yield put(logoutFailed({ message }));
    }
}

function* downloadVideoSaga(payload)  
{
    try {
        yield put(downloadVideoSuccess(payload));
    } catch ({ message }) {
        yield put(downloadVideoFailed({ message }));
        console.log(message);
    }
}

function* removeToMyDownloadsSaga(payload)  
{
    try {
        yield put(removeToMyDownloadsSuccess({ showID: payload }));
    } catch ({ message }) {
        yield put(removeToMyDownloadsFailed({ message }));
    }
}

function* removeToRecentWatchesSaga(payload)  
{
    try {
        yield put(removeToRecentWatchesSuccess({ showID: payload }));
    } catch ({ message }) {
        yield put(removeToRecentWatchesFailed({ message }));
    }
}

function* selectProfileSaga(payload)  
{
    try {
        yield put(selectProfileSuccess(payload));
        
        RootNavigation.navigate('Home');
    } catch ({ message }) {
        yield put(selectProfileFailed({ message }));
    }
}

/**
 * Todo: Test API
 */
function* toggleAddToMyListSaga(payload)
{
    try {
        yield put(toggleAddToMyListSuccess({ show: payload }));
        yield call(AUTH_API.toggleMyListAsync, payload);
    } catch ({ message }) {
        yield put(toggleAddToMyListFailed({ message }));
    }
}

/**
 * Todo: Test API
 */
function* toggleRemindMeOfComingShowSaga(payload)
{
    try {
        yield put(toggleRemindMeOfComingShowSuccess({ show: payload }));
        yield call(AUTH_API.toggleRemindMeAsync, payload);
    } catch ({ message }) {
        yield put(toggleRemindMeOfComingShowFailed({ message }));
    }
}

/**
 * Todo: Test API
 */
function* updateAuthenticatedProfileSaga(payload)
{
    try {
        yield put(updateAuthenticatedProfileSuccess({ profile: payload }));
        yield call(AUTH_API.updateProfileAsync, payload);
        RootNavigation.navigate('SelectProfile');
    } catch ({ message }) {
        yield put(updateAuthenticatedProfileFailed({ message }));
    }
}

function* viewDownloadsSaga()
{
    try {
        yield put(viewDownloadsSuccess());
    } catch ({ message }) {
        yield put(viewDownloadsFailed({ message }));
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

function* rateShowWatcher()
{
    while (true) {
        const { payload } = yield take(RATE_SHOW_START);
        yield call(rateShowSaga, payload);
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

function* downloadVideoWatcher()
{
    while (true) {
        const { payload } = yield take(DOWNLOAD_VIDEO_START);
        yield call(downloadVideoSaga, payload);
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
        rateShowWatcher(),
        loginWatcher(),
        logoutWatcher(),
        downloadVideoWatcher(),
        removeToMyDownloadsWatcher(),
        removeToRecentWatchesWatcher(),
        selectProfileWatcher(),
        toggleAddToMyListWatcher(),
        toggleRemindMeOfComingShowWatcher(),
        updateAuthenticatedProfileWatcher(),
        viewDownloadsWatcher()
    ]);
}

