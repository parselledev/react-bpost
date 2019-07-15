import * as types from './news.types';

export default fetchNews = (apiService, dispatch) => () => {
  dispatch(fetchNewsRequest);
  apiService.getNews()
    .then((data) => dispatch(fetchNewsSuccess(data)))
    .catch((err) => dispatch(fetchNewsFailure(err)));
}

const fetchNewsRequest = () => ({
  type: types.FETCH_NEWS_REQUEST
});

const fetchNewsSuccess = data => ({
  type: types.FETCH_NEWS_SUCCESS,
  payload: data
});

const fetchNewsFailure = err => ({
  type: types.FETCH_NEWS_FAILURE,
  payload: err
});