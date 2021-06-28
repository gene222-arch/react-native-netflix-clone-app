import { createSelector } from 'reselect';

const getAuth = state => state.auth; 
const getRatedShows = state => state.auth.ratedShows;
const getMyList = state => state.auth.myList;
const getAuthProfile = state => {
    return state.auth.profiles.find(({ id }) => id === state.auth.profile.id);
}

export const authProfileSelector = createSelector(getAuthProfile, profile => profile);

export const authSelector = createSelector(getAuth, auth => auth);

export const ratedShowsSelector = createSelector(getRatedShows, ratedShows => ratedShows);

export const myListSelector = createSelector(getMyList, myList => myList);

