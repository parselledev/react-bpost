import * as types from '../constants/actionTypes';

export const loginOldUser = userName => ({
  type: types.LOGIN_OLD_USER,
  payload: userName
});

export const loginNewUser = (dispatch, apiService) => () => {
  dispatch(fetchUsersRequest());

  apiService.getResource('usersCount')
    .then(data => {
      const newUsersCount = data + 1;
      const newUserName = newUsersCount;
      localStorage.setItem('userName', newUserName);
      dispatch(loginOldUser(newUserName));
      return newUsersCount;
    })
    .then(newUsersCount => apiService.updateUsersCount(newUsersCount))
    .catch(err => dispatch(fetchUsersFailure(err)));
}

const fetchUsersRequest = () => ({
  type: types.FETCH_USERS_REQUEST
});

const fetchUsersFailure = err => ({
  type: types.FETCH_USERS_FAILURE,
  payload: err
});