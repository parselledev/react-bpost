import {createSelector} from 'reselect';

const selectMails = state => state.mails;

export const selectMailsData = createSelector(
  [selectMails],
  mails => mails.data
);

export const selectMailsFilterSocial = createSelector(
  [selectMails],
  mails => mails.filter.social
);

export const selectMailsFilterCategory = createSelector(
  [selectMails],
  mails => mails.filter.category
);

export const selectMailsSearch = createSelector(
  [selectMails],
  mails => mails.search
);

export const selectMailsFetching = createSelector(
  [selectMails],
  mails => mails.fetching
);

export const selectMailsErr = createSelector(
  [selectMails],
  mails => mails.err
);