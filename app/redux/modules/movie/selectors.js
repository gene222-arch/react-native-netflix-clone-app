import { createSelector } from 'reselect';

const getMovie = state => state.movie; 

export const movieSelector = createSelector(getMovie, movie => movie );