import { createSelector } from 'reselect';

const getAuth = state => state.auth; 
const getAuthProfile = state => {
    return state.auth.profiles.find(({ id }) => id === state.auth.profile.id) || state.auth.profile;
}
const getErrorMessages = state => state.auth.errors;

export const authProfileSelector = createSelector(getAuthProfile, authProfile => authProfile);

export const authSelector = createSelector(getAuth, auth => auth);

export const selectAuthErrorMessages = createSelector(getErrorMessages, errors => errors);  

export const selectAuthHasErrorMessages = createSelector(getErrorMessages, errors => 
{
    let hasErrorMessages = {};

    for (const key in errors) {
        hasErrorMessages = {
            ...hasErrorMessages,
            [key]: Boolean(errors[key])
        };
    }

    return hasErrorMessages;
});  

