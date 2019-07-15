import {createSelector} from 'reselect';

const selectAuth = state => state.auth;

export const selectAuthUsername = createSelector(
  [selectAuth],
  auth => auth.username
);

export const selectAuthFetching = createSelector(
  [selectAuth],
  auth => auth.fetching
);

export const selectAuthErr = createSelector(
  [selectAuth],
  auth => auth.err
);