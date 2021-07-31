import { createSelector } from 'reselect';

const getComingSoonMovies = state => state.comingSoonMovies; 

export const comingSoonMoviesSelector = createSelector(
    getComingSoonMovies, 
    comingSoonMovies => comingSoonMovies 
);