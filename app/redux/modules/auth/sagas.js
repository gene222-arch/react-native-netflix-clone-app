import { all, take, put, call } from 'redux-saga/effects'
import * as API from './../../../services/User'
import ACTION_TYPES from './action.types'
import * as RootNavigation from './../../../navigation/RootNavigation'
import { 
    loginSuccess, 
    loginFailed, 
    logoutSuccess, 
    logoutFailed, 
    downloadVideoSuccess,
    downloadVideoFailed,
    selectProfileFailed,
    selectProfileSuccess,
    toggleAddToMyListSuccess,
    toggleAddToMyListFailed,
    toggleRemindMeOfComingShowSuccess, 
    toggleRemindMeOfComingShowFailed,
    toggleLikeShowSuccess,
    toggleLikeShowFailed
} from './actions'
import * as AsyncStorage from './../../../utils/asyncStorage'
import { getDownloadedVideo, getExtension, getDownloadedVideoFileInfo } from './../../../utils/file';
const {
    LOGIN_START,
    LOGOUT_START,
    DOWNLOAD_VIDEO_START,
    SELECT_PROFILE_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_ADD_TO_MY_LIST_START,
    TOGGLE_LIKE_SHOW_START
} = ACTION_TYPES;


/** Sagas */

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
    } catch ({ message }) {
        yield put(downloadVideoFailed({ message }));
        console.log(message);
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

function* toggleLikeShowSaga(payload)
{
    try {
        yield put(toggleLikeShowSuccess({ show: payload }));

    } catch ({ message }) {
        yield put(toggleLikeShowFailed({ message }));
    }
}

/** Watchers or Observers */

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

function* toggleLikeShowWatcher()
{
    while (true) {
        const { payload } = yield take(TOGGLE_LIKE_SHOW_START);
        yield call(toggleLikeShowSaga, payload);
    }
}

export default function* ()
{
    yield all([
        loginWatcher(),
        logoutWatcher(),
        downloadVideoWatcher(),
        selectProfileWatcher(),
        toggleAddToMyListWatcher(),
        toggleRemindMeOfComingShowWatcher(),
        toggleLikeShowWatcher()
    ]);
}

