import { all, take, put, call } from 'redux-saga/effects'
import * as API from './../../../services/User'
import ACTION_TYPES from './action.types'
import { 
    loginSuccess, 
    loginFailed, 
    logoutSuccess, 
    logoutFailed, 
    toggleAddToMyListSuccess,
    toggleAddToMyListFailed,
    toggleRemindMeOfComingShowSuccess, 
    toggleRemindMeOfComingShowFailed,
} from './actions'
import * as AsyncStorage from './../../../utils/asyncStorage'

const {
    LOGIN_START,
    LOGOUT_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_ADD_TO_MY_LIST_START
} = ACTION_TYPES;


/** Sagas */

function* loginSaga(payload)  
{
    try {
        // const data = yield call(API.index);   
        yield put(loginSuccess({ credentials: payload }));

        yield call(AsyncStorage.setItem, '@access_token', 'token');
    } catch ({ message }) {
        yield put(loginFailed({ message }));
    }
}

function* logoutSaga()  
{
    try {
        // const data = yield call(API.index);
        yield put(logoutSuccess());

    } catch ({ message }) {
        yield put(logoutFailed({ message }));
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
        loginWatcher(),
        logoutWatcher(),
        toggleAddToMyListWatcher(),
        toggleRemindMeOfComingShowWatcher()
    ]);
}

