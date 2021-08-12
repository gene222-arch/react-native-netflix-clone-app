import { all, take, put, call } from 'redux-saga/effects'
import ACTION_TYPES from './action.types'
import * as API from './../../../services/movie/coming.soon.movies'
import { 
    getComingSoonMoviesSuccess, 
    getComingSoonMoviesFailed,
    incrementComingSoonMovieViewsSuccess,
    incrementComingSoonMovieViewsFailed
} from './actions'

const {
    GET_COMING_SOON_MOVIES_START,
    INCREMENT_COMING_SOON_MOVIE_VIEWS_START
} = ACTION_TYPES;


/** Sagas */
function* getComingSoonMoviesSaga(payload)  
{
    try {
        // const { data: comingSoonMovies } = yield call(API.fetchAllAsync);
        yield put(getComingSoonMoviesSuccess({ comingSoonMovies: payload }));
    } catch ({ message }) {
        yield put(getComingSoonMoviesFailed({ message }));
    }
}

function* incrementComingSoonMovieViewsSaga()  
{
    try {
        yield call(API.incrementViewsAsync);
        yield put(incrementComingSoonMovieViewsSuccess());
    } catch ({ message }) {
        yield put(incrementComingSoonMovieViewsFailed({ message }));
    }
}


/** Watchers or Observers */
function* getComingSoonMoviesWatcher()
{
    while (true) {
        const { payload } = yield take(GET_COMING_SOON_MOVIES_START);
        yield call(getComingSoonMoviesSaga, payload);
    }
}

function* incrementComingSoonMovieViewsWatcher()
{
    while (true) {
        yield take(INCREMENT_COMING_SOON_MOVIE_VIEWS_START);
        yield call(incrementComingSoonMovieViewsSaga);
    }
}


export default function* ()
{
    yield all([
        getComingSoonMoviesWatcher(),
        incrementComingSoonMovieViewsWatcher()
    ]);
}

