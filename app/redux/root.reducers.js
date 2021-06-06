import userReducer from './modules/user/reducer'
import authReducer from './modules/auth/reducer'

const rootReducers = {
    auth: authReducer,
    user: userReducer 
};

export default rootReducers