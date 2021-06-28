import authReducer from './modules/auth/reducer'
import comingSoonReducer from './modules/coming-soon/reducer'
import movieReducer from './modules/movie/reducer'
import userReducer from './modules/user/reducer'

const rootReducers = {
    auth: authReducer,
    comingSoon: comingSoonReducer,
    movie: movieReducer,
    user: userReducer,
};

export default rootReducers