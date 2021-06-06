import { all, take, put, call } from 'redux-saga/effects'
import * as API from './../../../services/User'
import ACTION_TYPES from './action.types'
import { loginSuccess, loginFailed, logoutSuccess, logoutFailed } from './actions'
import AsyncStorage  from '@react-native-async-storage/async-storage';

const {
    LOGIN_START,
    LOGOUT_START
} = ACTION_TYPES;


/** Sagas */

function* loginSaga()  
{
    try {
        // const data = yield call(API.index);
        yield put(loginSuccess());

        AsyncStorage.setItem('@access_token', 'token');
    } catch ({ message }) {
        yield put(loginFailed({ message }));
    }
}

function* logoutSaga()  
{
    try {
        // const data = yield call(API.index);
        yield put(logoutSuccess());

        AsyncStorage.removeItem('@access_token');
    } catch ({ message }) {
        yield put(logoutFailed({ message }));
    }
}

/** Watchers or Observers */

function* loginWatcher()
{
    while (true) {
        yield take(LOGIN_START);
        yield call(loginSaga);
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

