import authReducer from './modules/auth/reducer'
import { persistCombineReducers } from 'redux-persist';
import comingSoonMoviesReducer from './modules/coming-soon/reducer'
import movieReducer from './modules/movie/reducer'
import userReducer from './modules/user/reducer'
import navigationReducer from './modules/navigation/reducer'
import toastReducer from './modules/toast/reducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: [''],  // array list to persists
    blacklist: ['navigation', 'toast'], // array list not to persits
    debug: true, //to get useful logging
};

const rootReducers = {
    auth: authReducer,
    comingSoonMovies: comingSoonMoviesReducer,
    movie: movieReducer,
    user: userReducer,
    navigation: navigationReducer,
    toast: toastReducer
};

const appReducer = persistCombineReducers(config, rootReducers);

const clearStorage = async () => await AsyncStorage.removeItem('persist:root');

const rootReducer = (state, action) => 
{
    if (action.type === 'LOGOUT_SUCCESS') {
        clearStorage();
        return appReducer(undefined, action);
    }
    
    return appReducer(state, action);
}

export default rootReducer