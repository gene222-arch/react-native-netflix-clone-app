import authReducer from './modules/auth/reducer'
import comingSoonMoviesReducer from './modules/coming-soon/reducer'
import movieReducer from './modules/movie/reducer'
import userReducer from './modules/user/reducer'
import navigationReducer from './modules/navigation/reducer'

const rootReducers = {
    auth: authReducer,
    comingSoonMovies: comingSoonMoviesReducer,
    movie: movieReducer,
    user: userReducer,
    navigation: navigationReducer,
};

export default rootReducers