import { createSelector } from 'reselect';

const getAuth = state => state.auth; 
const getLikedShows = state => state.auth.likedShows;
const getMyList = state => state.auth.myList;

export const authSelector = createSelector(getAuth, auth => auth);

export const likedShowsSelector = createSelector(getLikedShows, likedShows => likedShows);

export const myListSelector = createSelector(getMyList, myList => myList);