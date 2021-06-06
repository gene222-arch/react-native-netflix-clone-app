import { createSelector } from 'reselect';

export const getAuth = state => state.auth; 

export const authSelector = createSelector([ getAuth, auth => auth  ]);