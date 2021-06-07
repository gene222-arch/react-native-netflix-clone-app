import { createSelector } from 'reselect';

export const getMovie = state => state.movie; 

export const movieSelector = createSelector([getMovie], movie => movie );