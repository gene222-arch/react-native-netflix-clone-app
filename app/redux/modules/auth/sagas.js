import { all, take, put, call } from 'redux-saga/effects'
import * as API from './../../../services/User'
import ACTION_TYPES from './action.types'
import * as RootNavigation from './../../../navigation/RootNavigation'
import { 
    addToRecentWatchesSuccess,
    addToRecentWatchesFailed,
    rateShowSuccess,
    rateShowFailed,
    loginSuccess, 
    loginFailed, 
    logoutSuccess, 
    logoutFailed, 
    downloadVideoSuccess,
    downloadVideoFailed,
    removeToRecentWatchesSuccess,
    removeToRecentWatchesFailed,
    selectProfileFailed,
    selectProfileSuccess,
    toggleAddToMyListSuccess,
    toggleAddToMyListFailed,
    toggleRemindMeOfComingShowSuccess, 
    toggleRemindMeOfComingShowFailed
} from './actions'
import * as AsyncStorage from './../../../utils/asyncStorage'
import { getDownloadedVideo, getExtension, getDownloadedVideoFileInfo } from './../../../utils/file';
const {
    ADD_TO_RECENT_WATCHES_START,
    RATE_SHOW_START,
    LOGIN_START,
    LOGOUT_START,
    DOWNLOAD_VIDEO_START,
    REMOVE_TO_RECENT_WATCHES_START,
    SELECT_PROFILE_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_ADD_TO_MY_LIST_START
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

function* rateShowSaga(payload)  
{
    try {
        yield put(rateShowSuccess(payload));
    } catch ({ message }) {
        yield put(rateShowFailed({ message }));
    }
}

function* loginSaga(payload)  
{
    try {
        yield put(loginSuccess({ credentials: payload }));
        yield call(AsyncStorage.setItem, '@access_token', 'token');
    } catch ({ message }) {
        yield put(loginFailed({ message }));
    }
}

function* logoutSaga()  
{
    try {
        yield put(logoutSuccess());
    } catch ({ message }) {
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

function* toggleAddToMyListSaga(payload)
{
    try {
        yield put(toggleAddToMyListSuccess({ show: payload }));
    } catch ({ message }) {
        yield put(toggleAddToMyListFailed({ message }));
    }
}

function* toggleRemindMeOfComingShowSaga({ comingSoonShowID })
{
    try {
        yield put(toggleRemindMeOfComingShowSuccess({ comingSoonShowID }));

    } catch ({ message }) {
        yield put(toggleRemindMeOfComingShowFailed({ message }));
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

export default function* ()
{
    yield all([
        addToRecentWatchesWatcher(),
        rateShowWatcher(),
        loginWatcher(),
        logoutWatcher(),
        downloadVideoWatcher(),
        removeToRecentWatchesWatcher(),
        selectProfileWatcher(),
        toggleAddToMyListWatcher(),
        toggleRemindMeOfComingShowWatcher()
    ]);
}

