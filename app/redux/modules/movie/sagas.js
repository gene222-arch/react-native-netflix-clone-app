import { all, take, put, call } from 'redux-saga/effects'
import ACTION_TYPES from './action.types'
import * as API from './../../../services/movie/movie'
import * as MOVIE_NOTIFICATION_API from './../../../services/movie/movie.notification'
import { 
    incrementMovieViewsSuccess,
    incrementMovieViewsFailed,
    incrementMovieSearchCountSuccess,
    incrementMovieSearchCountFailed,
    getCategorizedMoviesSuccess,
    getCategorizedMoviesFailed,
    getMoviesSuccess, 
    getMoviesFailed, 
    getMovieNotificationsSuccess,
    getMovieNotificationsFailed,
    getLatestTwentyMoviesSuccess, 
    getLatestTwentyMoviesFailed,
    getTopSearchedMoviesSuccess,
    getTopSearchedMoviesFailed,
    getMostLikedMoviesSuccess,
    getMostLikedMoviesFailed
} from './actions'

const {
    INCREMENT_MOVIE_VIEWS_START,
    INCREMENT_MOVIE_SEARCH_COUNT_START,
    GET_CATEGORIZED_MOVIES_START,
    GET_MOVIES_START,
    GET_MOVIE_NOTIFICATIONS_START,
    GET_LATEST_TWENTY_MOVIES_START,
    GET_TOP_SEARCHED_MOVIES_START,
    GET_MOST_LIKED_MOVIES_START
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

function* getMovieNotificationsSaga()  
{
    try {
        const { data: movieNotifications } = yield call(MOVIE_NOTIFICATION_API.fetchAllAsync);
        yield put(getMovieNotificationsSuccess({ movieNotifications }));
    } catch ({ message }) {
        yield put(getMovieNotificationsFailed({ message }));
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

function* getMostLikedMoviesSaga()  
{
    try {
        const { data: movies } = yield call(API.fetchMostLikedMoviesAsync);
        yield put(getMostLikedMoviesSuccess({ movies }));
    } catch ({ message }) {
        yield put(getMostLikedMoviesFailed({ message }));
    }
}

function* incrementMovieSearchCountSaga(payload)  
{
    try {
        yield put(incrementMovieSearchCountSuccess());
        yield call(API.incrementSearchCountAsync, payload.movieId);
    } catch ({ message }) {
        yield put(incrementMovieSearchCountFailed({ message }));
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

function* incrementMovieSearchCountWatcher()
{
    while (true) {
        const { payload } = yield take(INCREMENT_MOVIE_SEARCH_COUNT_START);
        yield call(incrementMovieSearchCountSaga, payload);
    }
}

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

function* getMovieNotificationsWatcher()
{
    while (true) {
        yield take(GET_MOVIE_NOTIFICATIONS_START);
        yield call(getMovieNotificationsSaga);
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

function* getMostLikedMoviesWatcher()
{
    while (true) {
        yield take(GET_MOST_LIKED_MOVIES_START);
        yield call(getMostLikedMoviesSaga);
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
        incrementMovieSearchCountWatcher(),
        incrementMovieViewsWatcher(),
        getCategorizedMoviesWatcher(),
        getMoviesWatcher(),
        getMovieNotificationsWatcher(),
        getLatestTwentyMoviesWatcher(),
        getTopSearchedMoviesWatcher(),
        getMostLikedMoviesWatcher()
    ]);
}

