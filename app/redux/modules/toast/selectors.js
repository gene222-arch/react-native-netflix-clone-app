import { createSelector } from 'reselect';

const getToast = state => state.toast; 

export const toastSelector = createSelector(getToast, toast => toast);