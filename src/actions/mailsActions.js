import * as types from '../constants/actionTypes';

export const fetchResetExecution = (dispatch, apiService) => () => {
  dispatch(resetExecution());
  dispatch(fetchMailsRequest());
  apiService.getMails()
    .then(data => {
      const mails = {...data};

      Object.keys(mails).map(key => {
        const mail = mails[key];
        if (
          mail.startTimestamp.length == 0 ||
          Math.floor(new Date() / 1000) - mail.startTimestamp > 10
          ) {
          mails[key] = {
            ...mail,
            inProgress: false,
            postman: "",
            startTimestamp: ""
          };
        }
      });

      apiService.putMails(mails)
        .catch(err => dispatch(fetchMailsFailure(err)));
    })
    .catch(err => dispatch(fetchMailsFailure(err)));
}
const resetExecution = () => ({
  type: types.RESET_EXECUTION
});

export const fetchMails = (dispatch, apiService) => () => {
  dispatch(fetchMailsRequest());
  apiService.getMails()
    .then(data => {
      dispatch(fetchMailsSuccess(data))
    })
    .catch(err => dispatch(fetchMailsFailure(err)));
}
const fetchMailsRequest = () => ({
  type: types.FETCH_MAILS_REQUEST
});
const fetchMailsSuccess = data => ({
  type: types.FETCH_MAILS_SUCCESS,
  payload: data
});
const fetchMailsFailure = err => ({
  type: types.FETCH_MAILS_FAILURE,
  payload: err
});

export const fetchAddMail = (dispatch, apiService, userName, social, target, text) => () => {
  const newMail = {
    completed: false,
    inProgress: false,
    owner: userName,
    postman: '',
    screenshot: '',
    social,
    startTimestamp: '',
    target,
    text
  };
  dispatch(fetchMailsRequest());
  apiService.addMail(newMail)
    .then(key => {
      dispatch(addMail({
        [key]: {
          ...newMail
        }
      }));
    })
    .catch(err => fetchMailsFailure(err))
}
const addMail = mail => ({
  type: types.ADD_MAIL,
  mail
});

export const fetchStartMail = (dispatch, apiService, id, userName, startTimestamp, mail) => () => {
  dispatch(startMail(id, userName));
  dispatch(fetchMailsRequest());
  apiService.updateMail(id, {...mail, inProgress: true, postman: userName, startTimestamp: startTimestamp})
    .catch(err => fetchMailsFailure(err));
}
const startMail = (id, userName, startTimestamp) => ({
  type: types.START_MAIL,
  id,
  userName,
  startTimestamp
});

export const fetchCancelMail = (dispatch, apiService, id, mail) => () => {
  dispatch(cancelMail(id));
  dispatch(fetchMailsRequest());
  apiService.updateMail(id, {
    ...mail,
    completed: false,
    inProgress: false,
    postman: "",
    screenshot: "",
    startTimestamp: ""})
    .catch(err => fetchMailsFailure(err));
}
const cancelMail = id => ({
  type: types.CANCEL_MAIL,
  id
});

export const fetchCompleteMail = (dispatch, apiService, id, screenshot, mail) => () => {
  dispatch(fetchMailsRequest());

  apiService.uploadFile('screenshots', screenshot)
    .then(url => {
      dispatch(completeMail(id, url))
      apiService.updateMail(id, {...mail, completed: true, inProgress: false, screenshot: url})
        .catch(err => fetchMailsFailure(err));
    })
    .catch(err => fetchMailsFailure(err));
}
const completeMail = (id, screenshot) => ({
  type: types.COMPLETE_MAIL,
  id,
  screenshot
});

export const fetchDeleteMail = (dispatch, apiService, id) => () => {
  dispatch(deleteMail(id));
  dispatch(fetchMailsRequest());
  apiService.deleteMail(id)
    .catch(err => fetchMailsFailure(err));
}
const deleteMail = id => ({
  type: types.DELETE_MAIL,
  id
});

export const searchMails = query => ({
  type: types.SEARCH_MAILS,
  payload: query
});

export const filterMails = query => ({
  type: types.FITLER_MAILS,
  payload: query
});

export const categoryMails = query => ({
  type: types.CATEGORY_MAILS,
  payload: query
})