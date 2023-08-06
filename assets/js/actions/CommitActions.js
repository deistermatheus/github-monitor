import { reset } from 'redux-form';
import * as types from './ActionTypes';

const omitUndefined = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => typeof v !== 'undefined'));

export const createRepositorySuccess = (response) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: { response },
});

export const getCommitsSuccess = (commitsResponse) => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: commitsResponse,
});

export const getRepositoriesSuccess = (repositories) => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  payload: repositories,
});

export const updateCommitQuery = (payload) => ({
  type: types.UPDATE_COMMIT_QUERY,
  payload: {
    ...omitUndefined(payload),
  },
});

export const updateLoadingState = (state = false) => ({
  type: types.SET_LOADING_STATE,
  payload: {
    isLoading: state,
  },
});

export const setSuccessMessage = (state = false) => ({
  type: types.SET_SUCCESS_MESSAGE,
  payload: {
    successMessage: state,
  },
});

export const setErrorMessage = (message) => ({
  type: types.SET_ERROR_MESSAGE,
  payload: {
    errorMessage: message,
  },
});

export function setTemporaryState(key, payload) {
  return (dispatch) => {
    if (key === 'successMessage') {
      dispatch(setSuccessMessage(true));

      setTimeout(() => {
        dispatch(setSuccessMessage(false));
      }, 2000);
    }

    if (key === 'errorMessage') {
      dispatch(setErrorMessage(payload));
      setTimeout(() => {
        dispatch(setErrorMessage(null));
      }, 2000);
    }
  };
}

export function syncQueryToBrowserSearch() {
  return (dispatch, getState) => {
    const currentState = getState();
    const { query: commitQuery } = currentState.commitState.fetchCommitState;
    const { pathname } = window.location;
    // returns path: '/app/books'
    const searchParams = new URLSearchParams(window.location.search);
    // returns the existing query string: '?type=fiction&author=fahid'

    // eslint-disable-next-line no-restricted-syntax
    for (const key of searchParams.keys()) {
      searchParams.delete(key);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(commitQuery)) {
      searchParams.append(key, value);
    }

    window.history.pushState({}, 'test', `${pathname}?${searchParams.toString()}`);
  };
}

export function refreshAppData(config = {}) {
  const { isFirstRender } = config;
  return (dispatch, getState, { axios }) => {
    const currentState = getState();
    const { query: commitQuery } = currentState.commitState.fetchCommitState;

    axios.get('/api/repositories/').then((response) => {
      dispatch(getRepositoriesSuccess({ ...response.data.results }));
    });

    const timeout = isFirstRender ? 0 : 1500;

    setTimeout(() => {
      axios.get('/api/commits/', { params: commitQuery })
        .then((response) => {
          dispatch(getCommitsSuccess({ ...response.data }));
        });
    }, timeout);
  };
}

export function updateAppQuery(payload) {
  return (dispatch) => {
    dispatch(updateLoadingState(true));
    dispatch(updateCommitQuery(payload));
    dispatch(syncQueryToBrowserSearch());
    dispatch(refreshAppData({ isFirstRender: false }));
    dispatch(updateLoadingState(false));
  };
}

export function createRepository(formData, requestHeaders, formDispatch) {
  return (dispatch, getState, { axios }) => {
    axios.post('/api/repositories/', formData, { headers: requestHeaders })
      .then((response) => {
        dispatch(createRepositorySuccess(response.data, true));
        dispatch(setTemporaryState('successMessage', true));
        formDispatch(reset('repoCreate'));
        return Promise.resolve(response.data.name);
      }).then((name) => {
        dispatch(updateAppQuery({ repository: name }));
        return Promise.resolve();
      }).catch((error) => {
        dispatch(setTemporaryState('errorMessage', error.response.data));
      });
  };
}
