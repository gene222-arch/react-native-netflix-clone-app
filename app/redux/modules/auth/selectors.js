import { createSelector } from 'reselect';

const getAuth = state => state.auth; 
const getErrorMessages = state => state.auth.errors;
const getRatedShows = state => state.auth.ratedShows;
const getMyList = state => state.auth.myList;

const getAuthProfile = state => {
    const { auth: { profiles, profile } } = state;
    return profiles.find(({ id }) => id === profile.id);
}

export const authProfileSelector = createSelector(getAuthProfile, authProfile => authProfile);

export const authSelector = createSelector(getAuth, auth => auth);

export const ratedShowsSelector = createSelector(getRatedShows, ratedShows => ratedShows);

export const myListSelector = createSelector(getMyList, myList => myList);

export const selectAuthErrorMessages = createSelector(getErrorMessages, errors => errors);  

export const selectAuthHasErrorMessages = createSelector(selectAuthErrorMessages, errors => 
{
    let hasErrorMessages = {};

    for (const key in errors) {
        return {
            ...hasErrorMessages,
            [key]: Boolean(errors[key])
        };
    }

    return hasErrorMessages;
});  

