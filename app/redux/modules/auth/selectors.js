import { createSelector } from 'reselect';

const getAuth = state => state.auth; 

export const authSelector = createSelector([ getAuth ], auth => auth);