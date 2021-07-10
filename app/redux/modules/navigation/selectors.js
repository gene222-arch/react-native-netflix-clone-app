import { createSelector } from 'reselect';

const getNavigation = state => state.navigation; 

export const navigationSelector = createSelector(getNavigation, navigation => navigation);