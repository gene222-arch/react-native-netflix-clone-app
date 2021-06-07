import { all, take, put, call } from 'redux-saga/effects'
import ACTION_TYPES from './action.types'
import { getMoviesSuccess, getMoviesFailed  } from './actions'
import AsyncStorage  from '@react-native-async-storage/async-storage';

const {
    GET_MOVIES_START
} = ACTION_TYPES;


/** Sagas */

function* getMoviesSaga()  
{
    try {
        // const data = yield call(API.index);
        yield put(getMoviesSuccess());
    } catch ({ message }) {
        yield put(getMoviesFailed({ message }));
    }
}

/** Watchers or Observers */

function* getMoviesWatcher()
{
    while (true) {
        yield take(GET_MOVIES_START);
        yield call(getMoviesSaga);
    }
}


export default function* ()
{
    yield all([
        getMoviesWatcher(),
    ]);
}

