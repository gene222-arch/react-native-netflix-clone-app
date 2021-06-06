import { all, take, put, call } from 'redux-saga/effects'
import * as API from './../../../services/User'
import ACTION_TYPES from './action.types'
import { getUsersSuccess, getUsersFailed } from './actions'

const {
    GET_USERS_START
} = ACTION_TYPES;


/** Sagas */

function* getUsersSaga()  
{
    try {
        const data = yield call(API.index);
        yield put(getUsersSuccess({ users: data }));

    } catch ({ message }) {
        yield put(getUsersFailed({ message }));
    }
}

/** Watchers or Observers */

function* getUsersWatcher()
{
    while (true) {
        yield take(GET_USERS_START);
        yield call(getUsersSaga);
    }
}


export default function* ()
{
    yield all([
        getUsersWatcher()
    ]);
}

