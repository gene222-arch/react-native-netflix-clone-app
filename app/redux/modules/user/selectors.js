import { createSelector } from 'reselect';

const getUser = state => state.user; 

export const userSelector = createSelector(getUser, user => user);