import { all, take, put, call } from 'redux-saga/effects'
import ACTION_TYPES from './action.types'
import * as API from './../../../services/movie/movie'
import { 
    getCategorizedMoviesSuccess,
    getCategorizedMoviesFailed,
    getMoviesSuccess, 
    getMoviesFailed, 
    getLatestTwentyMoviesSuccess, 
    getLatestTwentyMoviesFailed,
} from './actions'

const {
    GET_CATEGORIZED_MOVIES_START,
    GET_MOVIES_START,
    GET_LATEST_TWENTY_MOVIES_START
} = ACTION_TYPES;


/** Sagas */

function* getCategorizedMoviesSaga()  
{
    try {
        const { data: categorizedMovies } = yield call(API.fetchCategorizedMoviesAsync);
        yield put(getCategorizedMoviesSuccess({ categorizedMovies }));
    } catch ({ message }) {
        yield put(getCategorizedMoviesFailed({ message }));
    }
}

function* getMoviesSaga()  
{
    try {
        const { data: movies } = yield call(API.fetchAllAsync);
        yield put(getMoviesSuccess({ movies }));
    } catch ({ message }) {
        yield put(getMoviesFailed({ message }));
    }
}

function* getLatestTwentyMoviesSaga()  
{
    try {
        const { data: movies } = yield call(API.fetchLatestTwentyAsync);
        yield put(getLatestTwentyMoviesSuccess({ movies }));
    } catch ({ message }) {
        yield put(getLatestTwentyMoviesFailed({ message }));
    }
}

/** Watchers or Observers */

function* getCategorizedMoviesWatcher()
{
    while (true) {
        yield take(GET_CATEGORIZED_MOVIES_START);
        yield call(getCategorizedMoviesSaga);
    }
}

function* getMoviesWatcher()
{
    while (true) {
        yield take(GET_MOVIES_START);
        yield call(getMoviesSaga);
    }
}

function* getLatestTwentyMoviesWatcher()
{
    while (true) {
        yield take(GET_LATEST_TWENTY_MOVIES_START);
        yield call(getLatestTwentyMoviesSaga);
    }
}


export default function* ()
{
    yield all([
        getCategorizedMoviesWatcher(),
        getMoviesWatcher(),
        getLatestTwentyMoviesWatcher(),
    ]);
}

