import { all, take, put, call } from 'redux-saga/effects'
import ACTION_TYPES from './action.types'
import * as API from './../../../services/movie/coming.soon.movies'
import { 
    getComingSoonMoviesSuccess, 
    getComingSoonMoviesFailed
} from './actions'

const {
    GET_COMING_SOON_MOVIES_START
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


/** Watchers or Observers */
function* getComingSoonMoviesWatcher()
{
    while (true) {
        const { payload } = yield take(GET_COMING_SOON_MOVIES_START);
        yield call(getComingSoonMoviesSaga, payload);
    }
}


export default function* ()
{
    yield all([
        getComingSoonMoviesWatcher()
    ]);
}

