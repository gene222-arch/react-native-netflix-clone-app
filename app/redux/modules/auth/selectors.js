import { createSelector } from 'reselect';

const getAuth = state => state.auth; 
const getAuthProfile = state => {

    const { auth: { profiles, profile } } = state;

    if (! profiles.length) {
        return profiles;
    }

    return profiles.find(prof => prof?.id === profile.id) || profile;
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

