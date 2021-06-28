import { all, take, put, call } from 'redux-saga/effects'
import ACTION_TYPES from './action.types'
import { getComingSoonShowsSuccess, getComingSoonShowsFailed  } from './actions'
import AsyncStorage  from '@react-native-async-storage/async-storage';

const {
    GET_COMING_SOON_SHOWS_START
} = ACTION_TYPES;


/** Sagas */
function* getComingSoonShowsSaga(payload)  
{
    try {
        yield put(getComingSoonShowsSuccess({ comingSoonShows: payload }));
    } catch ({ message }) {
        yield put(getComingSoonShowsFailed({ message }));
    }
}


/** Watchers or Observers */
function* getComingSoonShowsWatcher()
{
    while (true) {
        const { payload } = yield take(GET_COMING_SOON_SHOWS_START);
        yield call(getComingSoonShowsSaga, payload);
    }
}


export default function* ()
{
    yield all([
        getComingSoonShowsWatcher(),
    ]);
}

