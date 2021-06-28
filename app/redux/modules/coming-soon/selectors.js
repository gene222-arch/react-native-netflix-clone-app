import { createSelector } from 'reselect';

const getComingSoon = state => state.comingSoon; 

export const comingSoonSelector = createSelector(getComingSoon, comingSoon => comingSoon );