import { all, take, put, call } from 'redux-saga/effects'
import ACTION_TYPES from './action.types'
import { toggleTabBarSuccess, toggleTabBarFailed } from './actions'

const {
    TOGGLE_TAB_BAR_START
} = ACTION_TYPES;


/** Sagas */

function* toggleTabBarSaga()  
{
    try {
        yield put(toggleTabBarSuccess({ users: data }));
    } catch ({ message }) {
        yield put(toggleTabBarFailed({ message }));
    }
}

/** Watchers or Observers */

function* toggleTabBarWatcher()
{
    while (true) {
        yield take(TOGGLE_TAB_BAR_START);
        yield call(toggleTabBarSaga);
    }
}


export default function* ()
{
    yield all([
        toggleTabBarWatcher()
    ]);
}

