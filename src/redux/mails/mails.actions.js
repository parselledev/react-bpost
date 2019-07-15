import * as types from './mails.types';

// export const fetchResetExecution = (dispatch, apiService) => () => {
//   dispatch(resetExecution());
//   dispatch(fetchMailsRequest());
//   apiService.getMails()
//     .then(data => {
//       const mails = {...data};

//       Object.keys(mails).map(key => {
//         const mail = mails[key];
//         if (
//           mail.startTimestamp.length == 0 ||
//           Math.floor(new Date() / 1000) - mail.startTimestamp > 10
//           ) {
//           mails[key] = {
//             ...mail,
//             inProgress: false,
//             postman: "",
//             startTimestamp: ""
//           };
//         }
//       });

//       apiService.putMails(mails)
//         .catch(err => dispatch(fetchMailsFailure(err)));
//     })
//     .catch(err => dispatch(fetchMailsFailure(err)));
// }
// const resetExecution = () => ({
//   type: types.RESET_EXECUTION
// });

const mailsFetchRequest = () => ({
  type: types.MAILS_FETCH_REQUEST
});

const mailsFetchSuccess = data => ({
  type: types.MAILS_FETCH_SUCCESS,
  payload: data
});

const mailsFetchFailure = err => ({
  type: types.MAILS_FETCH_FAILURE,
  payload: err
});

export const mailsGet = (dispatch, apiService) => () => {
  dispatch(mailsFetchRequest());
  apiService.getMails()
    .then(data => dispatch(mailsFetchSuccess(data)))
    .catch(err => dispatch(mailsFetchFailure(err)));
}

export const mailsAdd = (dispatch, apiService, username, social, target, text) => () => {
  const mail = {
    completed: false,
    inProgress: false,
    owner: username,
    postman: '',
    screenshot: '',
    social,
    startTimestamp: '',
    target,
    text
  };

  dispatch(fetchMailsRequest());
  
  apiService.addMail(mail)
    .then(key => dispatch({
      type: types.MAILS_ADD,
      payload: {
        [key]: {...mail}
      }
    }))
    .catch(err => fetchMailsFailure(err))
}

export const mailsStart = (dispatch, apiService, id, userName, startTimestamp, mail) => () => {
  dispatch({
    type: types.MAILS_START,
    id,
    userName,
    startTimestamp
  });

  dispatch(mailsFetchRequest());
  
  apiService.updateMail(id, {...mail, inProgress: true, postman: userName, startTimestamp: startTimestamp})
    .catch(err => mailsFetchFailure(err));
}

export const mailsCancel = (dispatch, apiService, id, mail) => () => {
  dispatch({
    type: types.MAILS_CANCEL,
    payload: id
  });

  dispatch(mailsFetchRequest());

  apiService.updateMail(id, {
    ...mail,
    completed: false,
    inProgress: false,
    postman: "",
    screenshot: "",
    startTimestamp: ""})
    .catch(err => mailsfetchFailure(err));
}

export const mailsComplete = (dispatch, apiService, id, screenshot, mail) => () => {
  dispatch(mailsFetchRequest());

  apiService.uploadFile('screenshots', screenshot)
    .then(url => {
      dispatch({
        type: types.MAILS_COMPLETE,
        id,
        screenshot
      })
      apiService.updateMail(id, {...mail, completed: true, inProgress: false, screenshot: url})
        .catch(err => mailsFetchFailure(err));
    })
    .catch(err => mailsFetchFailure(err));
}

export const mailsDelete = (dispatch, apiService, id) => () => {
  dispatch({
    type: types.MAILS_DELETE,
    patload: id
  });

  dispatch(mailsFetchRequest());

  apiService.deleteMail(id)
    .catch(err => mailsFetchFailure(err));
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