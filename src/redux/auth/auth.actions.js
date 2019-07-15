import * as types from './auth.types';

export const authSignIn = userName => ({
  type: types.AUTH_SIGN_IN,
  payload: userName
});

export const authSignUp = (dispatch, apiService) => () => {
  dispatch(authFetchRequest());

  apiService.getResource('users/count')
    .then(data => {
      const newUsersCount = data + 1;
      const username = newUsersCount;

      localStorage.setItem('username', username);

      dispatch({
        type: types.AUTH_SIGN_UP,
        payload: username
      });

      return newUsersCount;
    })
    .then(newUsersCount => apiService.updateUsersCount(newUsersCount))
    .catch(err => dispatch(authFetchFailure(err)));
}

const authFetchRequest = () => ({
  type: types.AUTH_FETCH_REQUEST
});

const authFetchFailure = err => ({
  type: types.AUTH_FETCH_FAILURE,
  payload: err
});