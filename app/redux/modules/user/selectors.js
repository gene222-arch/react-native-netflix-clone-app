import { createSelector } from 'reselect';

export const getUser = state => state.user; 

export const userSelector = createSelector([ getUser ], user => user);