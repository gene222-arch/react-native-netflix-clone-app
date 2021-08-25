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
    getTopSearchedMoviesSuccess,
    getTopSearchedMoviesFailed,
    incrementMovieViewsSuccess,
    incrementMovieViewsFailed
} from './actions'

const {
    GET_CATEGORIZED_MOVIES_START,
    GET_MOVIES_START,
    GET_LATEST_TWENTY_MOVIES_START,
    GET_TOP_SEARCHED_MOVIES_START,
    INCREMENT_MOVIE_VIEWS_START
} = ACTION_TYPES;


/** Sagas */

function* getCategorizedMoviesSaga(payload)  
{
    try {
        const { data: categorizedMovies } = yield call(API.fetchCategorizedMoviesAsync, payload);
        yield put(getCategorizedMoviesSuccess({ categorizedMovies }));
    } catch ({ message }) {
        yield put(getCategorizedMoviesFailed({ message }));
    }
}

function* getMoviesSaga(payload)  
{
    try {
        const { data: movies } = yield call(API.fetchAllAsync, payload);
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

function* getTopSearchedMoviesSaga(payload)  
{
    try {
        const { data: movies } = yield call(API.fetchTopSearchesAsync, payload);
        yield put(getTopSearchedMoviesSuccess({ movies }));
    } catch ({ message }) {
        yield put(getTopSearchedMoviesFailed({ message }));
    }
}

function* incrementMovieViewsSaga(payload)  
{
    try {
        yield call(API.incrementViewsAsync, payload.movieId);
        yield put(incrementMovieViewsSuccess());
    } catch ({ message }) {
        yield put(incrementMovieViewsFailed({ message }));
    }
}

/** Watchers or Observers */

function* getCategorizedMoviesWatcher()
{
    while (true) {
        const { payload } = yield take(GET_CATEGORIZED_MOVIES_START);
        yield call(getCategorizedMoviesSaga, payload);
    }
}

function* getMoviesWatcher()
{
    while (true) {
        const { payload } = yield take(GET_MOVIES_START);
        yield call(getMoviesSaga, payload);
    }
}

function* getLatestTwentyMoviesWatcher()
{
    while (true) {
        yield take(GET_LATEST_TWENTY_MOVIES_START);
        yield call(getLatestTwentyMoviesSaga);
    }
}

function* getTopSearchedMoviesWatcher()
{
    while (true) {
        const { payload } = yield take(GET_TOP_SEARCHED_MOVIES_START);
        yield call(getTopSearchedMoviesSaga, payload);
    }
}

function* incrementMovieViewsWatcher()
{
    while (true) {
        const { payload } = yield take(INCREMENT_MOVIE_VIEWS_START);
        yield call(incrementMovieViewsSaga, payload);
    }
}

export default function* ()
{
    yield all([
        getCategorizedMoviesWatcher(),
        getMoviesWatcher(),
        getLatestTwentyMoviesWatcher(),
        getTopSearchedMoviesWatcher(),
        incrementMovieViewsWatcher(),
    ]);
}

