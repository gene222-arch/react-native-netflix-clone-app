import { all } from 'redux-saga/effects';

/** Sagas */
import authSaga from './modules/auth/sagas'
import comingSoonSaga from './modules/coming-soon/sagas'
import movieSaga from './modules/movie/sagas'
import userSaga from './modules/user/sagas'

export default function* ()
{
    yield all([
        authSaga(),
        comingSoonSaga(),
        movieSaga(),
        userSaga(),
    ]);
}