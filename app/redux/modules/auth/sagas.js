import { all, take, put, call } from 'redux-saga/effects'
import * as API from './../../../services/User'
import ACTION_TYPES from './action.types'
import { loginSuccess, loginFailed, logoutSuccess, logoutFailed } from './actions'
import * as AsyncStorage from './../../../utils/asyncStorage'

const {
    LOGIN_START,
    LOGOUT_START
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

export default function* ()
{
    yield all([
        loginWatcher(),
        logoutWatcher()
    ]);
}

