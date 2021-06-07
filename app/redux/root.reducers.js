import userReducer from './modules/user/reducer'
import authReducer from './modules/auth/reducer'
import movieReducer from './modules/movie/reducer'

const rootReducers = {
    auth: authReducer,
    user: userReducer,
    movie: movieReducer
};

export default rootReducers