import { all } from 'redux-saga/effects';

/** Sagas */
import authSaga from './modules/auth/sagas'
import userSaga from './modules/user/sagas'

export default function* ()
{
    yield all([
        authSaga(),
        userSaga()
    ]);
}