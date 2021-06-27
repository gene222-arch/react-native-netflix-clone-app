import { createSelector } from 'reselect';

const getAuth = state => state.auth; 
const getRatedShows = state => state.auth.ratedShows;
const getMyList = state => state.auth.myList;

export const authSelector = createSelector(getAuth, auth => auth);

export const ratedShowsSelector = createSelector(getRatedShows, ratedShows => ratedShows);

export const myListSelector = createSelector(getMyList, myList => myList);