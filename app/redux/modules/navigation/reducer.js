import ACTION_TYPES from './action.types';

const {
   TOGGLE_TAB_BAR_START,
   TOGGLE_TAB_BAR_SUCCESS,
   TOGGLE_TAB_BAR_FAILED
} = ACTION_TYPES;

const initialState = {
    tabBarVisible: true,
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const {
        tabBarVisible
    } = state;

    const isLoading = false;
    const errors = [];

    switch (type) 
    {
        case TOGGLE_TAB_BAR_START:
            return { 
                ...state, 
                isLoading: true
            }

        case TOGGLE_TAB_BAR_SUCCESS:
            return { 
                ...state, 
                tabBarVisible: !tabBarVisible,
                isLoading,
                errors
            }

        case TOGGLE_TAB_BAR_FAILED:
            return { 
                ...state, 
                isLoading,
                errors: payload.message
            }

        default:
            return state
    }
}
