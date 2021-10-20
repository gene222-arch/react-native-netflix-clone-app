import { createSelector } from 'reselect';

const getAuth = state => state.auth; 
const getUser = state => state.auth.auth.user; 
const getAuthProfile = state => {

    const { auth: { profiles, profile } } = state;

    if (! profiles.length) {
        return profiles;
    }

    return profiles.find(prof => prof?.id === profile.id) || profile;
}
const getErrorMessages = state => state.auth.errors;
const getProfiles = state => state.auth.profiles;

export const authProfileSelector = createSelector(getAuthProfile, authProfile => authProfile);

export const authSelector = createSelector(getAuth, auth => auth);

export const userSelector = createSelector(getUser, user => user);

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

export const selectOrderedProfiles = createSelector([getProfiles, authProfileSelector], (profiles, authProfile) => 
{
    if (authProfile.id) {
        const middleIndex = Math.floor(profiles.length / 2);
        const currentProfileIndex = profiles.findIndex(profile => profile.id === authProfile.id);
        
        const getCenteredProfile = profiles[middleIndex];

        profiles.splice(middleIndex, 1, authProfile);
        profiles.splice(currentProfileIndex, 1, getCenteredProfile);
    }

    return profiles;
});
