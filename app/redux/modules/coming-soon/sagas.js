import { all, take, put, call } from 'redux-saga/effects'
import ACTION_TYPES from './action.types'
import * as NOTIFICATION_UTIL from './../../../utils/notification'
import * as API from './../../../services/movie/coming.soon.movies'
import { 
    getComingSoonMoviesSuccess, 
    getComingSoonMoviesFailed,
    incrementComingSoonMovieViewsSuccess,
    incrementComingSoonMovieViewsFailed,
    notifyMovieReleaseSuccess,
    notifyMovieReleaseFailed
} from './actions'

const {
    GET_COMING_SOON_MOVIES_START,
    NOTIFY_MOVIE_RELEASE_START,
    INCREMENT_COMING_SOON_MOVIE_VIEWS_START
} = ACTION_TYPES;


/** Sagas */
function* getComingSoonMoviesSaga(payload)  
{
    try {
        const { data: comingSoonMovies } = yield call(API.fetchAllAsync, payload);
        yield put(getComingSoonMoviesSuccess({ comingSoonMovies }));
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

function* notifyMovieReleaseSaga(payload)  
{
    try {
        const { title, isReminded } = payload;

        if (isReminded) {
            yield call(NOTIFICATION_UTIL.remindedMovieReleaseNotification, title);
        }

        if (! isReminded) {
            yield call(NOTIFICATION_UTIL.movieReleaseNotification, title);
        }

        yield put(notifyMovieReleaseSuccess());
    } catch ({ message }) {
        yield put(notifyMovieReleaseFailed({ message }));
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

function* notifyMovieReleaseWatcher()
{
    while (true) {
        const { payload } = yield take(NOTIFY_MOVIE_RELEASE_START);
        yield call(notifyMovieReleaseSaga, payload);
    }
}


export default function* ()
{
    yield all([
        getComingSoonMoviesWatcher(),
        incrementComingSoonMovieViewsWatcher(),
        notifyMovieReleaseWatcher()
    ]);
}

