import { all } from 'redux-saga/effects';

/** Sagas */
import authSaga from './modules/auth/sagas'
import comingSoonMovieSaga from './modules/coming-soon/sagas'
import movieSaga from './modules/movie/sagas'
import userSaga from './modules/user/sagas'
import navigationSaga from './modules/navigation/sagas'

export default function* ()
{
    yield all([
        authSaga(),
        comingSoonMovieSaga(),
        movieSaga(),
        userSaga(),
        navigationSaga()
    ]);
}