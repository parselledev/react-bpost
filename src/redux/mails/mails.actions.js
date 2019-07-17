import * as types from './mails.types';

const mailsFetchRequest = () => ({
  type: types.MAILS_FETCH_REQUEST
});

const mailsFetchSuccess = () => ({
  type: types.MAILS_FETCH_SUCCESS,
});

const mailsFetchFailure = err => ({
  type: types.MAILS_FETCH_FAILURE,
  payload: err
});

export const mailsResetNonCompleted = (dispatch, apiService, mails) => () => {
  if(!mails) return;

  dispatch({
    type: types.MAILS_RESET_NON_COMPLETED,
  });

  Object.keys(mails).map(key => {
    const mail = mails[key];
    if (
      mail.inProgress &&
      mail.startTimestamp.length != 0 &&
      Date.now() - mail.startTimestamp > 300000
    ) {

      dispatch(mailsCancel(dispatch, apiService, key));

    }
  });
}

export const mailsDeleteOld = (dispatch, apiService, mails) => () => {
  if(!mails) return;

  dispatch({
    type: types.MAILS_DELETE_OLD
  });

  Object.keys(mails).map(key => {
    const mail = mails[key];
    if(
      mail.completed &&
      Date.now() - mail.endTimestamp > 1.8e+7
    ) {

      dispatch(mailsDelete(dispatch, apiService, key, mail.screenshotName))

    }
  });
}

export const mailsGet = (dispatch, apiService) => () => {
  dispatch(mailsFetchRequest());
  apiService.getMails()
    .then(data => {
      dispatch(mailsFetchSuccess())
      dispatch({
        type: types.MAILS_GET,
        payload: data
      })
    })
    .catch(err => dispatch(mailsFetchFailure(err)));
}

export const mailsAdd = (dispatch, apiService, username, social, target, text) => () => {
  const mail = {
    completed: false,
    endTimestamp: '',
    inProgress: false,
    owner: username,
    postman: '',
    screenshot: '',
    screenshotName: '',
    social,
    startTimestamp: '',
    target,
    text
  };

  dispatch(mailsFetchRequest());
  
  apiService.addMail(mail)
    .then(key => {
      dispatch(mailsFetchSuccess());
      dispatch({
        type: types.MAILS_ADD,
        payload: {
          [key]: {...mail}
        }
      })
    })
    .catch(err => mailsFetchFailure(err))
}

export const mailsStart = (dispatch, apiService, id, userName, startTimestamp) => () => {
  dispatch({
    type: types.MAILS_START,
    id,
    userName,
    startTimestamp
  });

  dispatch(mailsFetchRequest());
  
  apiService.updateMail(id, {inProgress: true, postman: userName, startTimestamp: startTimestamp})
    .then(() => dispatch(mailsFetchSuccess()))
    .catch(err => mailsFetchFailure(err));
}

export const mailsCancel = (dispatch, apiService, id) => () => {
  dispatch({
    type: types.MAILS_CANCEL,
    payload: id
  });

  dispatch(mailsFetchRequest());

  apiService.updateMail(id, {
    endTimestamp: "",
    completed: false,
    inProgress: false,
    postman: "",
    screenshot: "",
    screenshotName: "",
    startTimestamp: ""})
    .then(() => dispatch(mailsFetchSuccess()))
    .catch(err => mailsfetchFailure(err));
}

export const mailsComplete = (dispatch, apiService, id, screenshot, endTimestamp) => () => {
  dispatch(mailsFetchRequest());

  apiService.uploadFile('screenshots', screenshot, endTimestamp)
    .then(url => {
      dispatch({
        type: types.MAILS_COMPLETE,
        id,
        endTimestamp: endTimestamp,
        screenshot: url,
        screenshotName: endTimestamp,
      })
      apiService.updateMail(id, {
        endTimestamp: endTimestamp,
        completed: true,
        inProgress: false,
        screenshot: url,
        screenshotName: endTimestamp})
        .then(() => dispatch(mailsFetchSuccess()))
        .catch(err => mailsFetchFailure(err));
    })
    .then(() => dispatch(mailsFetchSuccess()))
    .catch(err => mailsFetchFailure(err));
}

export const mailsDelete = (dispatch, apiService, id, screenshotName='') => () => {
  dispatch({
    type: types.MAILS_DELETE,
    payload: id
  });

  dispatch(mailsFetchRequest());

  apiService.deleteMail(id)
    .then(() => dispatch(mailsFetchSuccess()))
    .catch(err => mailsFetchFailure(err));

  if(screenshotName) {
    apiService.deleteFile('screenshots', screenshotName)
      .then(() => dispatch(mailsFetchSuccess()))
      .catch(err => mailsFetchFailure(err));
  }
}

export const mailsSearch = query => ({
  type: types.MAILS_SEARCH,
  payload: query
});

export const mailsFilterSocial = query => ({
  type: types.MAILS_FILTER_SOCIAL,
  payload: query
});

export const mailsFilterCategory = query => ({
  type: types.MAILS_FILTER_CATEGORY,
  payload: query
})